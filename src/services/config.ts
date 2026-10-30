/**
 * Seluruh nilai yang berasal dari environment, dikumpulkan di satu tempat.
 *
 * Dibaca sekali di sini, bukan lewat import.meta.env yang tersebar di
 * seluruh berkas. Begitu tersebar, menjawab "apa saja yang perlu
 * dikonfigurasi sebelum situs ini terbit" berarti menyisir seluruh proyek.
 *
 * TIDAK ADA RAHASIA DI BERKAS INI, DAN TIDAK BOLEH ADA.
 *
 * Vite menanamkan setiap variabel berawalan VITE_ ke dalam bundel yang
 * dikirim ke browser. Artinya siapa pun yang membuka situsnya bisa
 * membacanya lewat devtools. Kunci anon Supabase boleh — ia memang dirancang
 * publik dan yang menjaganya adalah RLS. Service role key, kunci Firebase,
 * dan kunci Google Maps tanpa pembatasan TIDAK BOLEH ada di sini.
 */

const env = import.meta.env

function teks(nilai: unknown): string {
  return typeof nilai === 'string' ? nilai.trim() : ''
}

export const config = {
  apiBaseUrl: teks(env.VITE_API_BASE_URL),
  apiPublicKey: teks(env.VITE_API_PUBLIC_KEY),
  playStoreUrl: teks(env.VITE_PLAY_STORE_URL),
  contactEmail: teks(env.VITE_CONTACT_EMAIL),
  instagramUrl: teks(env.VITE_INSTAGRAM_URL),
  youtubeUrl: teks(env.VITE_YOUTUBE_URL),
}

/**
 * Benar hanya kalau alamat API benar-benar diisi.
 *
 * Seluruh situs memakai satu tanda ini untuk memutuskan menampilkan data
 * sungguhan atau data contoh — dan untuk memutuskan apakah label "contoh"
 * perlu ditampilkan. Satu tanda, satu keputusan, tidak ada layar yang bisa
 * lupa memeriksanya.
 */
export const apiSiap = config.apiBaseUrl !== ''

/** Benar kalau aplikasinya sudah terbit dan tautannya sudah diisi. */
export const playStoreSiap = config.playStoreUrl !== ''
