import { LitElement, html, css, type TemplateResult, type PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import type { Application as PixiApplication } from 'pixi.js';
import type { Live2DModel as PixiLive2DModel } from 'pixi-live2d-display';
import { MicVAD } from '@ricky0123/vad-web';
import {
  // type LocalAudioTrack,
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
import { Live2DModel } from 'pixi-live2d-display';
import * as PIXI from 'pixi.js';
import { MotionSync } from "live2d-motionsync/stream";

dayjs.extend(duration);
const DEMO_TIMEOUT = 300;
const LIVE2D_MODEL_URL = '/haru_greeter/haru_greeter_t05.model3.json';

declare global {
  interface Window {
    PIXI?: typeof import('pixi.js');
  }
}

window.PIXI ??= PIXI;

type Status = 'idle' | 'loading' | 'running';

@customElement('live-chat-demo')
export class LiveChatDemo extends LitElement {
  @query('#visualizer-container')
  private _visualizerContainer?: HTMLDivElement;

  @state()
  private _vad?: MicVAD;

  // @state()
  // private _isSpeaking = false;

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
  private _status: Status = 'idle';

  // @state()
  // private _localTrack?: LocalAudioTrack;

  @state()
  private _remoteTrack?: RemoteAudioTrack;

  @state()
  private _countdown = 300;

  @state()
  private _countdownInterval?: NodeJS.Timeout;

  private _live2dApp?: PixiApplication;
  private _live2dModel?: PixiLive2DModel;
  @state()
  private _live2dMotionSync?: MotionSync;
  private _live2dCanvas?: HTMLCanvasElement;
  private _live2dResizeObserver?: ResizeObserver;

  private _language = '';

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
    #visualizer-container {
      position: relative;
      width: min(100%, 640px);
      height: 360px;
      margin: 0 auto;
    }
    #visualizer-container canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
    #countdown {
      margin-top: 16px;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      color: var(--aw-color-primary);
      text-shadow: 0 0 8px rgba(1, 97, 239, 0.25);
    }
  `;

  constructor() {
    super();
    const match = /\/(?<lang>[a-z]{2})\/products/.exec(window.location.pathname);
    this._language = match?.groups?.['lang'] ?? '';
    this._room
      .on(RoomEvent.Connected, this._handleConnected)
      .on(RoomEvent.TrackSubscribed, this._handleTrackSubscribed)
      .on(RoomEvent.TrackUnsubscribed, this._handleTrackUnsubscribed)
      .on(RoomEvent.Disconnected, this._handleDisconnect)
      .on(RoomEvent.LocalTrackPublished, this._handleLocalTrackPublished)
      .on(RoomEvent.LocalTrackUnpublished, this._handleLocalTrackUnpublished);
  }

  protected override render(): TemplateResult {
    return html`${this._status !== 'running' ? this._renderButton() : this._renderSession()}`;
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

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('_status')) {
      const oldStatus = changedProperties.get('_status') as Status;
      const newStatus = this._status;

      if (oldStatus === 'running' && newStatus !== 'running') {
        this._disposeLive2D();
      }
      if (oldStatus !== 'running' && newStatus === 'running') {
        void this._setupLive2D();
      }
    }

    if (changedProperties.has('_remoteTrack') || changedProperties.has('_live2dMotionSync')) {
      if (this._remoteTrack && this._live2dMotionSync) {
        if (this._remoteTrack.mediaStream) {
          this._live2dMotionSync.play(this._remoteTrack.mediaStream);
        } else {
          console.error('Remote track has no media stream, cannot play motion sync');
        }
      }
    }

    if (changedProperties.has('_countdown')) {
      if (this._countdown <= 0) {
        void this._room.disconnect();
      }
    }
  }

  async _handleClick(): Promise<void> {
    this._status = 'loading';
    await this._connectToRoom();
  }

  private async _connectToRoom(): Promise<void> {
    const data = await fetch(`${import.meta.env.PUBLIC_DEMO_AGENT_API_URL}/guest_demo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json() as Promise<{ roomToken: string }>);

    await this._room.prepareConnection(import.meta.env.PUBLIC_LIVEKIT_URL, data.roomToken);
    await this._room.connect(import.meta.env.PUBLIC_LIVEKIT_URL, data.roomToken, {
      maxRetries: 10,
    });

    await this._room.localParticipant.setMicrophoneEnabled(true);
  }

  private _handleConnected = (): void => {
    console.info('connected to room');
    this._status = 'running';
    this._countdown = DEMO_TIMEOUT;
    this._countdownInterval = setInterval(() => {
      this._countdown--;
    }, 1000);
  };

  private _handleTrackSubscribed = (
    track: RemoteTrack,
    _publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ): void => {
    if (track.kind === Track.Kind.Audio && participant.identity === 'agent') {
      // attach it to a new HTMLVideoElement or HTMLAudioElement
      const element = track.attach();
      this.renderRoot.appendChild(element);
      this._remoteTrack = track as RemoteAudioTrack;
    }
  };

  private _handleTrackUnsubscribed = async (
    track: RemoteTrack,
    _publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ): Promise<void> => {
    // remove tracks from all attached elements
    if (this._live2dMotionSync && participant.identity === 'agent') {
      await this._live2dMotionSync.reset();
    }
    track.detach();
  };

  private _handleLocalTrackPublished = (_: LocalTrackPublication, participant: LocalParticipant): void => {
    // this._localTrack = publication.audioTrack;

    const handleSpeechStart = async (): Promise<void> => {
      console.debug('speech start');
      const signal = Uint8Array.from([0]);
      await participant.publishData(signal, {
        topic: 'vad',
        reliable: true,
      });
      // this._isSpeaking = true;
    };

    const handleSpeechEnd = async (): Promise<void> => {
      console.debug('speech end');
      const signal = Uint8Array.from([1]);
      await participant.publishData(signal, {
        topic: 'vad',
        reliable: true,
      });
      // this._isSpeaking = false;
    };

    const initVad = async (): Promise<void> => {
      const vad = await MicVAD.new({
        positiveSpeechThreshold: 0.6,
        redemptionFrames: 5,
        onSpeechStart: handleSpeechStart,
        onSpeechEnd: handleSpeechEnd,
        onVADMisfire: handleSpeechEnd,
        workletURL: '/_astro/vad.worklet.bundle.min.js',
        modelURL: '/_astro/silero_vad.onnx',
      });
      this._vad = vad;
      vad.start();
    };

    const setLanguage = async (): Promise<void> => {
      if (this._language) {
        console.debug(`set language to ${this._language}`);
        await participant.publishData(Buffer.from(this._language), {
          topic: 'lang',
          reliable: true,
        });
      }
    };

    void initVad();
    void setLanguage();
  };

  private _handleLocalTrackUnpublished = (
    publication: LocalTrackPublication,
    _participant: LocalParticipant,
  ): void => {
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

  private async _setupLive2D(): Promise<void> {
    const container = this._visualizerContainer;

    if (this._live2dApp || !container) {
      return;
    }
    container.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-label', 'Live2D character');
    container.appendChild(canvas);
    this._live2dCanvas = canvas;

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 360;

    const app = new PIXI.Application({
      view: canvas,
      backgroundAlpha: 0,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
      width,
      height,
    });
    this._live2dApp = app;

    try {
      const model = await Live2DModel.from(LIVE2D_MODEL_URL);

      model.anchor.set(0.5, 0.6);
      const scale = 0.7;
      model.scale.set(scale);

      this._live2dModel = model;

      const motionSync = new MotionSync(model.internalModel);
      await motionSync.loadDefaultMotionSync();
      this._live2dMotionSync = motionSync;
      app.stage.addChild(model);
    } catch (error) {
      console.error('Failed to load Live2D model', error);
    }

    this._live2dResizeObserver = new ResizeObserver(() => {
      this._handleLive2DResize();
    });
    this._live2dResizeObserver.observe(container);
  }

  private _calculateInitialScale(model: PixiLive2DModel, width: number, height: number): number {
    const baseWidth = model.width || 1;
    const baseHeight = model.height || 1;
    const scale = Math.min(width / baseWidth, height / baseHeight) * 1.2;
    return Number.isFinite(scale) && scale > 0 ? scale : 1;
  }

  private _handleLive2DResize(): void {
    const container = this._visualizerContainer;

    if (!container || !this._live2dApp || !this._live2dModel) {
      return;
    }

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 360;

    this._live2dApp.renderer.resize(width, height);

    const scale = this._calculateInitialScale(this._live2dModel, width, height);
    this._live2dModel.scale.set(scale);
    this._live2dModel.x = width / 2;
    this._live2dModel.y = height * 0.95;
  }

  private _disposeLive2D(): void {
    this._live2dResizeObserver?.disconnect();
    this._live2dResizeObserver = undefined;

    this._live2dModel = undefined;

    if (this._live2dApp) {
      this._live2dApp.destroy(true, {
        children: true,
        texture: true,
        baseTexture: true,
      });
      this._live2dApp = undefined;
    }

    if (this._live2dCanvas?.parentElement) {
      this._live2dCanvas.remove();
    }
    this._live2dCanvas = undefined;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'live-chat-demo': LiveChatDemo;
  }
}
