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
import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';

dayjs.extend(duration);
const DEMO_TIMEOUT = 300;

@customElement('live-chat-demo')
export class LiveChatDemo extends LitElement {
  @query('#visualizer-container')
  private _visualizerContainer!: HTMLDivElement;

  @state()
  private _vad?: MicVAD;

  @state()
  private _isSpeaking = false;

  @state()
  private _visualizer?: SiriWave;

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

  @state()
  private _countdown = 300;

  @state()
  private _countdownInterval?: NodeJS.Timeout;

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
      animation: glow 1.5s infinite;
    }
    .btn:hover {
      transform: scale(1.1);
      transition: transform 0.3s ease;
    }
    .loading-spinner {
      animation: spin 1s linear infinite;
    }
    @keyframes glow {
      0% {
        box-shadow: 0 0 10px 1px var(--aw-color-primary);
      }
      50% {
        box-shadow: 0 0 20px 2px var(--aw-color-primary);
      }
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
    return html`${this._status !== 'ready' ? this._renderButton() : this._renderSession()}`;
  }

  private _renderSession(): TemplateResult {
    return html`
      <div id="visualizer-container"></div>
      <div id="countdown">${dayjs.duration(this._countdown, 'seconds').format('mm:ss')}</div>
    `;
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
        this._visualizer = undefined;
      }
      if (oldStatus !== 'ready' && newStatus === 'ready') {
        this._visualizer = new SiriWave({
          container: this._visualizerContainer,
          color: '#0161ef',
          width: 640,
          height: 200,
          autostart: true,
          amplitude: 0,
        });
      }
    }

    if (_changedProperties.has('_remoteTrack')) {
      const oldRemoteTrack = _changedProperties.get('_remoteTrack') as RemoteAudioTrack | undefined;
      const newRemoteTrack = this._remoteTrack;

      if (!oldRemoteTrack && newRemoteTrack) {
        this._remoteCleanupCallback = this._updateVisualizer(newRemoteTrack);
      }
    }

    if (_changedProperties.has('_isSpeaking')) {
      if (this._isSpeaking) {
        this._remoteCleanupCallback?.();
        this._localCleanupCallback = this._updateVisualizer(this._localTrack);
      } else {
        this._localCleanupCallback?.();
        this._remoteCleanupCallback = this._updateVisualizer(this._remoteTrack);
      }
    }

    if (_changedProperties.has('_countdown')) {
      if (this._countdown <= 0) {
        void this._room.disconnect();
      }
    }
  }

  async _handleClick(e: MouseEvent): Promise<void> {
    this._status = 'loading';
    await this._connectToRoom();
  }

  private async _connectToRoom(): Promise<void> {
    const data = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/v1/room/guest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.PUBLIC_GUEST_USER_JWT}`,
      },
      body: JSON.stringify({}),
    }).then((res) => res.json() as Promise<{ roomToken: string }>);

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

  private _handleConnected = (): void => {
    console.info('connected to room');
    this._status = 'ready';
    this._countdown = DEMO_TIMEOUT;
    this._countdownInterval = setInterval(() => {
      this._countdown--;
    }, 1000);
  };

  private _handleTrackSubscribed = (
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ): void => {
    if (track.kind === Track.Kind.Audio) {
      // attach it to a new HTMLVideoElement or HTMLAudioElement
      const element = track.attach();
      this.renderRoot.appendChild(element);
      this._remoteTrack = track as RemoteAudioTrack;
    }
  };

  private _handleTrackUnsubscribed = (
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ): void => {
    // remove tracks from all attached elements
    track.detach();
  };

  private _handleLocalTrackPublished = (publication: LocalTrackPublication, participant: LocalParticipant): void => {
    this._localTrack = publication.audioTrack;

    const handleSpeechStart = async (): Promise<void> => {
      console.debug('speech start');
      const signal = Uint8Array.from([0]);
      await participant.publishData(signal, {
        topic: 'vad',
        reliable: true,
      });
      this._isSpeaking = true;
    };

    const handleSpeechEnd = async (): Promise<void> => {
      console.debug('speech end');
      const signal = Uint8Array.from([1]);
      await participant.publishData(signal, {
        topic: 'vad',
        reliable: true,
      });
      this._isSpeaking = false;
    };

    const initVad = async (): Promise<void> => {
      const vad = await MicVAD.new({
        positiveSpeechThreshold: 0.6,
        redemptionFrames: 5,
        onSpeechStart: handleSpeechStart,
        onSpeechEnd: handleSpeechEnd,
        workletURL: '/_astro/vad.worklet.bundle.min.js',
        modelURL: '/_astro/silero_vad.onnx',
      });
      this._vad = vad;
      vad.start();
    };

    void initVad();
  };

  private _handleLocalTrackUnpublished = (publication: LocalTrackPublication, participant: LocalParticipant): void => {
    // when local tracks are ended, update UI to remove them from rendering
    publication.track?.detach();
  };

  private _handleDisconnect = (): void => {
    console.info('disconnected from room');
    this._vad?.destroy();
    this._vad = undefined;
    clearInterval(this._countdownInterval);
    this._status = 'idle';
  };

  private _updateVisualizer = (
    track?: AudioTrack,
    options: AudioAnalyserOptions = { fftSize: 32, smoothingTimeConstant: 0 },
  ): (() => void) => {
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
      const amp = volume * volume * 2;
      this._visualizer?.setAmplitude(amp);
    };

    const interval = setInterval(updateVolume, 1000 / 30);

    return () => {
      void cleanup();
      clearInterval(interval);
    };
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'live-chat-demo': LiveChatDemo;
  }
}
