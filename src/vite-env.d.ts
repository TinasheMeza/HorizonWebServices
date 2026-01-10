/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE44_PROJECT_ID: string
  readonly VITE_BASE44_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
