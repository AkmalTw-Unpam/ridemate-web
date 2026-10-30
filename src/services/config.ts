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

/* ============================================================
   ISI DI SINI — INI SATU-SATUNYA TEMPAT YANG PERLU KAMU SENTUH
   ============================================================

   Kosongkan ("") yang belum ada. Yang kosong tidak ditampilkan sama
   sekali, bukan ditampilkan sebagai tautan mati.

   KENAPA DITULIS DI BERKAS INI, BUKAN DI .env

   Situs ini dibangun GitHub, bukan di laptopmu. Berkas .env ada di
   komputermu dan tidak pernah ikut terunggah ke repo — memang begitu
   seharusnya, karena .env biasanya berisi rahasia. Akibatnya apa pun
   yang kamu tulis di .env TIDAK akan ada saat GitHub membangun situsnya,
   dan hasilnya tetap bertuliskan "Email belum dikonfigurasi".

   Nilai di bawah tidak satu pun rahasia — alamat email dan tautan media
   sosial memang untuk dibaca umum. Jadi menuliskannya di sini aman, dan
   satu-satunya cara agar ia benar-benar sampai ke situs yang terbit.

   .env tetap berfungsi dan tetap menang kalau diisi. Itu berguna untuk
   mencoba nilai berbeda di laptop tanpa mengubah berkas ini.

   YANG TIDAK BOLEH DITULIS DI SINI
   Service role key Supabase, kunci Firebase, kunci Google Maps tanpa
   pembatasan. Seluruh isi berkas ini ikut terkirim ke peramban setiap
   pengunjung dan bisa dibaca siapa pun lewat devtools. */
const BAWAAN = {
  /** Contoh: 'halo@ridemate.my.id' */
  contactEmail: '',
  /** Contoh: 'https://instagram.com/ridemate.id' */
  instagramUrl: '',
  /** Contoh: 'https://youtube.com/@ridemate' */
  youtubeUrl: '',
  /** Diisi nanti, setelah aplikasinya terbit di Google Play. */
  playStoreUrl: '',
}

export const config = {
  apiBaseUrl: teks(env.VITE_API_BASE_URL),
  apiPublicKey: teks(env.VITE_API_PUBLIC_KEY),
  playStoreUrl: teks(env.VITE_PLAY_STORE_URL) || BAWAAN.playStoreUrl,
  contactEmail: teks(env.VITE_CONTACT_EMAIL) || BAWAAN.contactEmail,
  instagramUrl: teks(env.VITE_INSTAGRAM_URL) || BAWAAN.instagramUrl,
  youtubeUrl: teks(env.VITE_YOUTUBE_URL) || BAWAAN.youtubeUrl,
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
