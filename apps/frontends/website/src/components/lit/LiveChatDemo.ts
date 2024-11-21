import { LitElement, html, css, type TemplateResult, type PropertyDeclarations, type PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import SiriWave from 'siriwave/src/index';
import { MicVAD } from '@ricky0123/vad-web';
import {
  type AudioAnalyserOptions,
  type AudioTrack,
  createAudioAnalyser,
  type LocalAudioTrack,
  type LocalParticipant,
  type LocalTrackPublication,
  type RemoteAudioTrack,
  type RemoteParticipant,
  type RemoteTrack,
  type RemoteTrackPublication,
  Room,
  RoomEvent,
  Track,
} from 'livekit-client';
import { jwtDecode } from 'jwt-decode';

@customElement('live-chat-demo')
export class LiveChatDemo extends LitElement {
  @query('#visualizer-container')
  private _visualizerContainer!: HTMLDivElement;

  @state()
  private _vad: MicVAD | null = null;

  @state()
  private _visualizer: SiriWave | null = null;

  @state()
  private _room: Room = new Room({
    dynacast: true,
    audioCaptureDefaults: {
      noiseSuppression: true,
      autoGainControl: true,
      echoCancellation: true,
    },
  });

  @state()
  private _status: 'idle' | 'loading' | 'ready' = 'idle';

  @state()
  private _localTrack?: LocalAudioTrack;

  @state()
  private _remoteTrack?: RemoteAudioTrack;

  @state()
  private _localCleanupCallback?: () => void;

  @state()
  private _remoteCleanupCallback?: () => void;

  // center icon in button
  static override readonly styles = css`
    .btn {
      background-color: var(--aw-color-primary);
      color: white;
      border-radius: 9999px;
      padding: 10px 10px;
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      border: 5px solid var(--aw-color-primary);
      transition: transform 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 10px 1px var(--aw-color-primary);
    }
    .btn:hover {
      transform: scale(1.1);
      transition: transform 0.3s ease;
    }
    .loading-spinner {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  protected override render(): TemplateResult {
    return this._status !== 'ready' ? this._renderButton() : this._renderSession();
  }

  private _renderSession(): TemplateResult {
    return html`<div id="visualizer-container"></div>`;
  }

  private _renderButton(): TemplateResult {
    const isLoading = this._status === 'loading';
    return html`
      <button class="btn ${isLoading ? 'loading' : ''}" @click=${this._handleClick}>
        ${isLoading ? this._renderLoadingIcon() : this._renderMicrophoneIcon()}
      </button>
    `;
  }

  private _renderMicrophoneIcon(): TemplateResult {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-microphone"
    >
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <path d="M12 19v4" />
    </svg>`;
  }

  private _renderLoadingIcon(): TemplateResult {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="loading-spinner"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>`;
  }

  protected override updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('_status')) {
      const oldStatus = _changedProperties.get('_status') as 'ready' | 'idle' | 'loading';
      const newStatus = this._status;

      if (oldStatus === 'ready' && newStatus !== 'ready') {
        this._visualizer?.dispose();
        this._visualizer = null;
      }
      if (oldStatus !== 'ready' && newStatus === 'ready') {
        this._visualizer = new SiriWave({
          container: this._visualizerContainer,
          color: '#0161ef',
          width: 640,
          height: 200,
          autostart: true,
        });
      }
    }

    if (_changedProperties.has('_localTrack')) {
      const oldLocalTrack = _changedProperties.get('_localTrack') as LocalAudioTrack | undefined;
      const newLocalTrack = this._localTrack;
      console.log('oldLocalTrack', oldLocalTrack);

      if (!oldLocalTrack?.attachedElements.length && newLocalTrack?.attachedElements.length) {
        this._updateVisualizer(newLocalTrack);
      }
      if (oldLocalTrack?.attachedElements.length && !newLocalTrack?.attachedElements.length) {
        this._visualizer?.dispose();
        this._localCleanupCallback?.();
      }
    }

    if (_changedProperties.has('_remoteTrack')) {
      const oldRemoteTrack = _changedProperties.get('_remoteTrack') as RemoteAudioTrack | undefined;
      const newRemoteTrack = this._remoteTrack;
      if (!oldRemoteTrack?.attachedElements.length && newRemoteTrack?.attachedElements.length) {
        // update visualizer
      }
      if (oldRemoteTrack?.attachedElements.length && !newRemoteTrack?.attachedElements.length) {
        // remove visualizer
      }
    }
  }

  async _handleClick(e: MouseEvent): Promise<void> {
    this._status = 'loading';
    await this._connectToRoom();
    this._status = 'ready';
  }

  private async _connectToRoom(): Promise<void> {
    const data = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/v1/room`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.PUBLIC_GUEST_USER_JWT}`,
      },
      body: JSON.stringify({
        agentId: import.meta.env.PUBLIC_DEMO_AGENT_ID,
      }),
    }).then((res) => res.json() as Promise<{ roomToken: string }>);

    // const data = {
    //   roomToken:
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjgwMDU5NTAsImlzcyI6IkFQSW1EVW50SDRpalNRUiIsIm5hbWUiOiJBdXN0aW4iLCJuYmYiOjE3MzIwMDU5NTAsInN1YiI6Ijk0ZTdhMjg5LTVmNDctNDVmMC04YTkwLTM0YThkMTE2NzFhZSIsInZpZGVvIjp7InJvb20iOiJ4V1lBVVNKbWpKeEYiLCJyb29tSm9pbiI6dHJ1ZX19.neEsxuiGXgzUIW3aQjdU5JB3OqDWHJEwT_zdMicRyYQ',
    // };

    const {
      video: { room: roomName },
    } = jwtDecode<{ video: { room: string } }>(data.roomToken);

    await this._room.prepareConnection(import.meta.env.PUBLIC_LIVEKIT_URL, data.roomToken);
    this._room
      .on(RoomEvent.Connected, this._handleConnected)
      .on(RoomEvent.TrackSubscribed, this._handleTrackSubscribed)
      .on(RoomEvent.TrackUnsubscribed, this._handleTrackUnsubscribed)
      .on(RoomEvent.Disconnected, this._handleDisconnect)
      .on(RoomEvent.LocalTrackPublished, this._handleLocalTrackPublished)
      .on(RoomEvent.LocalTrackUnpublished, this._handleLocalTrackUnpublished);
    await this._room.connect(import.meta.env.PUBLIC_LIVEKIT_URL, data.roomToken, {
      maxRetries: 10,
    });

    await this._room.localParticipant.setMicrophoneEnabled(true);
  }

  private _handleConnected(): void {
    console.log('connected to room');
  }

  private async _handleTrackSubscribed(
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ): Promise<void> {
    if (track.kind === Track.Kind.Audio) {
      // attach it to a new HTMLVideoElement or HTMLAudioElement
      const element = track.attach();
      const updateComplete = await this.updateComplete;

      if (updateComplete) {
        this.renderRoot.appendChild(element);
      }

      this._remoteTrack = track as RemoteAudioTrack;
    }
  }

  private _handleTrackUnsubscribed(
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ): void {
    // remove tracks from all attached elements
    track.detach();
  }

  private _handleLocalTrackPublished(publication: LocalTrackPublication, participant: LocalParticipant): void {
    this._localTrack = publication.audioTrack;

    const handleSpeechStart = async (): Promise<void> => {
      console.log('speech start');
      const signal = Uint8Array.from([0]);
      await participant.publishData(signal, {
        topic: 'vad',
        reliable: true,
      });
    };

    const handleSpeechEnd = async (): Promise<void> => {
      console.log('speech end');
      const signal = Uint8Array.from([1]);
      await participant.publishData(signal, {
        topic: 'vad',
        reliable: true,
      });
    };

    const initVad = async (): Promise<void> => {
      const vad = await MicVAD.new({
        positiveSpeechThreshold: 0.6,
        redemptionFrames: 5,
        onSpeechStart: handleSpeechStart,
        onSpeechEnd: handleSpeechEnd,
      });
      this._vad = vad;
      vad.start();
    };

    void initVad();
  }

  private _handleLocalTrackUnpublished(publication: LocalTrackPublication, participant: LocalParticipant): void {
    // when local tracks are ended, update UI to remove them from rendering
    publication.track?.detach();
  }

  private _handleDisconnect(): void {
    console.log('disconnected from room');

    this._vad?.destroy();
    this._status = 'idle';
  }

  private _updateVisualizer(
    track?: AudioTrack,
    options: AudioAnalyserOptions = { fftSize: 32, smoothingTimeConstant: 0 },
  ): () => void {
    if (!track?.mediaStream) {
      return () => void 0;
    }

    const { cleanup, analyser } = createAudioAnalyser(track, options);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateVolume = (): void => {
      analyser.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((acc, curr) => acc + curr * curr, 0);
      const volume = Math.sqrt(sum / dataArray.length) / 255;
      const amp = volume * 3;
      console.log('amp', amp);
      this._visualizer?.setAmplitude(amp);
    };

    const interval = setInterval(updateVolume, 1000 / 30);

    return () => {
      void cleanup();
      clearInterval(interval);
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'live-chat-demo': LiveChatDemo;
  }
}
