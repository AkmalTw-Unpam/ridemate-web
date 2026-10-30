/// <reference types="vite/client" />

/**
 * Tipe untuk variabel environment.
 *
 * Tanpa berkas ini, import.meta.env.VITE_APA_PUN bertipe any — artinya salah
 * ketik nama variabel tidak ketahuan sampai situsnya jalan dan nilainya
 * undefined. Didaftarkan di sini, TypeScript menolaknya saat dikompilasi.
 */
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_API_PUBLIC_KEY?: string
  readonly VITE_PLAY_STORE_URL?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_INSTAGRAM_URL?: string
  readonly VITE_YOUTUBE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
