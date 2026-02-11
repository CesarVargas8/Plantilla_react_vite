/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QUERY_MODE?: "render" | "router";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
