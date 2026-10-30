import { config, apiSiap } from './config'
import { LENCANA, TOURING_CONTOH, type Lencana, type KartuTouring } from '../data/demo'

/**
 * Lapisan service.
 *
 * SATU-SATUNYA TEMPAT SITUS INI BERBICARA DENGAN BACKEND.
 *
 * Tidak ada komponen yang memanggil fetch() sendiri. Begitu ada yang
 * melakukannya, mengganti backend berarti menyisir seluruh proyek — dan
 * biasanya ada satu yang terlewat lalu menembak ke alamat lama di produksi.
 *
 * Selama VITE_API_BASE_URL kosong, setiap fungsi mengembalikan data contoh
 * dari data/demo.ts dengan menandainya [sumber: 'demo']. Begitu alamatnya
 * diisi, fungsi yang sama memanggil REST API dan menandai [sumber: 'api'].
 * Tampilannya tidak perlu tahu mana yang sedang berlaku — ia cukup membaca
 * tanda itu untuk memutuskan menampilkan label "contoh" atau tidak.
 *
 * CATATAN TENTANG BASIS DATA
 *
 * Situs ini TIDAK berasumsi memakai database yang sama dengan aplikasi
 * Android. Kalau nanti keduanya memang satu Supabase, yang dipakai di sini
 * harus kunci ANON dengan RLS aktif — bukan service role. Rencana
 * integrasinya ada di README bagian "Integrasi API".
 */

export type Sumber = 'demo' | 'api'
export type Hasil<T> = { data: T; sumber: Sumber }

/** Jeda tiruan, supaya keadaan "sedang memuat" bisa diuji tanpa backend. */
const JEDA_DEMO_MS = 320

function demo<T>(data: T): Promise<Hasil<T>> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data, sumber: 'demo' }), JEDA_DEMO_MS)
  )
}

/**
 * Pembungkus fetch dengan batas waktu.
 *
 * fetch() bawaan tidak pernah menyerah sendiri. Tanpa batas waktu, backend
 * yang menggantung membuat spinner berputar selamanya dan pengunjung tidak
 * pernah tahu apakah harus menunggu atau menutup halaman.
 */
async function ambil<T>(jalur: string): Promise<T> {
  const kendali = new AbortController()
  const waktu = setTimeout(() => kendali.abort(), 10_000)
  try {
    const kepala: Record<string, string> = { Accept: 'application/json' }
    if (config.apiPublicKey) {
      kepala.apikey = config.apiPublicKey
      kepala.Authorization = `Bearer ${config.apiPublicKey}`
    }
    const jawaban = await fetch(`${config.apiBaseUrl}${jalur}`, {
      headers: kepala,
      signal: kendali.signal,
    })
    if (!jawaban.ok) throw new Error(`Server menjawab ${jawaban.status}`)
    return (await jawaban.json()) as T
  } finally {
    clearTimeout(waktu)
  }
}

/**
 * Daftar lencana beserta ambangnya.
 *
 * Kalau nanti disajikan API, ambangnya cukup diubah di satu tempat dan situs
 * ikut benar dengan sendirinya. Selama masih demo, angkanya disalin tangan
 * dari Lencana.kt — dan salinan tangan itulah yang cepat atau lambat basi.
 */
export async function muatLencana(): Promise<Hasil<Lencana[]>> {
  if (!apiSiap) return demo(LENCANA)
  const data = await ambil<Lencana[]>('/lencana')
  return { data, sumber: 'api' }
}

/** Perjalanan terbaru yang dibagikan komunitas. */
export async function muatTouring(): Promise<Hasil<KartuTouring[]>> {
  if (!apiSiap) return demo(TOURING_CONTOH)
  const data = await ambil<KartuTouring[]>('/touring?limit=6')
  return { data, sumber: 'api' }
}

/**
 * Mengirim pesan dari formulir kontak.
 *
 * Tanpa backend, pesannya TIDAK terkirim ke mana pun dan fungsi ini jujur
 * mengatakannya lewat [terkirim: false]. Formulir yang memunculkan "pesan
 * terkirim" padahal tidak ada yang menerimanya lebih buruk daripada tidak
 * punya formulir sama sekali — orang menunggu balasan yang tidak akan datang.
 */
export async function kirimPesan(isi: {
  nama: string
  email: string
  pesan: string
}): Promise<{ terkirim: boolean; catatan: string }> {
  if (!apiSiap) {
    await new Promise((r) => setTimeout(r, JEDA_DEMO_MS))
    return {
      terkirim: false,
      catatan:
        'Backend belum tersambung, jadi pesan ini belum terkirim ke mana pun. ' +
        (config.contactEmail
          ? `Untuk sekarang, kirim langsung ke ${config.contactEmail}.`
          : 'Isi VITE_API_BASE_URL atau VITE_CONTACT_EMAIL untuk mengaktifkannya.'),
    }
  }
  const kendali = new AbortController()
  const waktu = setTimeout(() => kendali.abort(), 10_000)
  try {
    const kepala: Record<string, string> = { 'Content-Type': 'application/json' }
    if (config.apiPublicKey) {
      kepala.apikey = config.apiPublicKey
      kepala.Authorization = `Bearer ${config.apiPublicKey}`
    }
    const jawaban = await fetch(`${config.apiBaseUrl}/pesan-kontak`, {
      method: 'POST',
      headers: kepala,
      body: JSON.stringify(isi),
      signal: kendali.signal,
    })
    if (!jawaban.ok) throw new Error(`Server menjawab ${jawaban.status}`)
    return { terkirim: true, catatan: 'Pesanmu terkirim. Kami balas lewat email.' }
  } finally {
    clearTimeout(waktu)
  }
}
