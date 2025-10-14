// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="../vendor/integration/types.d.ts" />

interface ImportMetaEnv {
  PUBLIC_API_BASE_URL: string;
  PUBLIC_USER_API_BASE_URL: string;
  PUBLIC_LIVEKIT_URL: string;
  PUBLIC_DEMO_AGENT_API_URL: string;
  PUBLIC_GUEST_USER_JWT: string;
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
}
