/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface Window {
  openMsg: (id: string, name: string, type: string) => void;
  setStatus: (id: string, type: string, status: string) => Promise<void>;
}

interface ImportMetaEnv {
  readonly EXPO_PUBLIC_SUPABASE_URL: string;
  readonly EXPO_PUBLIC_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


