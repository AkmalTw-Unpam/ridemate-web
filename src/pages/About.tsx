import { Bagian, JudulBagian, TombolUnduh } from '../components/Ui'
import { ROUTES } from '../router/useRoute'
import { IkonPanah } from '../components/Icons'

const NILAI = [
  {
    judul: 'Jujur soal apa yang ada',
    isi: 'Tidak ada fitur yang dijanjikan di situs ini kalau belum jalan di aplikasinya. Data contoh selalu ditandai sebagai contoh, dan tombol unduh tidak pernah mengarah ke tautan palsu.',
  },
  {
    judul: 'Privasi bukan pengaturan tambahan',
    isi: 'Lokasi hanya dibagikan selama mode perjalanan menyala, hanya ke rombongan yang sama. Email dan nomor telepon tidak pernah terlihat rider lain. Jejak perjalanan bisa dihapus kapan saja.',
  },
  {
    judul: 'Komunitas yang bisa direm',
    isi: 'Setiap rider bisa diblokir dan dilaporkan. Blokirnya ditegakkan di sisi server — bukan sekadar menyembunyikan orangnya dari layar — dan yang diblokir tidak pernah diberi tahu.',
  },
]

export function About() {
  return (
    <>
      <Bagian nada="malam">
        <JudulBagian
          atas="Tentang"
          judul="Dibuat satu orang, untuk orang yang jalannya jauh"
          lede="RideMate lahir dari masalah yang sederhana: aplikasi peta menghitung rute untuk mobil, dan rombongan motor tidak punya tempat di dalamnya. Yang tersisa cuma grup chat dan saling menunggu di pom bensin."
          tengah
        />
      </Bagian>

      <Bagian>
        <div className="cerita">
          <div className="stack">
            <p className="eyebrow">Visi</p>
            <h2>Supaya perjalanan tidak berhenti jadi kenangan yang kabur</h2>
            <p className="lede">
              Orang yang touring mengingat jalannya, bukan angkanya. Tapi angka itulah
              yang membuat kenangannya bisa dipegang — berapa jauh, bersama siapa,
              lewat mana. RideMate mencatat semuanya sendiri supaya kamu tidak perlu
              memikirkannya selama di jalan.
            </p>
            <p className="lede">
              Lencana di dalamnya bukan hiasan. Ia cara membuat kilometer yang
              sudah ditempuh terasa berarti — dan alasan untuk berangkat lagi
              minggu depan.
            </p>
          </div>
          <aside className="cerita__kotak">
            <h3>Status saat ini</h3>
            <ul>
              <li>Aplikasi Android sudah berjalan dan dalam pengujian tertutup.</li>
              <li>Belum terbit di Google Play.</li>
              <li>Situs ini belum tersambung ke backend aplikasi.</li>
              <li>Dikembangkan sebagai proyek skripsi sekaligus produk nyata.</li>
            </ul>
          </aside>
        </div>
      </Bagian>

      <Bagian nada="dalam">
        <JudulBagian atas="Yang dipegang" judul="Tiga hal yang tidak ditawar" />
        <div className="grid grid--3">
          {NILAI.map((n) => (
            <article key={n.judul} className="card">
              <h3>{n.judul}</h3>
              <p>{n.isi}</p>
            </article>
          ))}
        </div>
      </Bagian>

      <Bagian nada="gelap">
        <div className="ajakan center">
          <h2>Ada pertanyaan?</h2>
          <p className="lede" style={{ marginInline: 'auto' }}>
            Halaman kontak memuat pertanyaan yang paling sering masuk, dan formulir
            kalau yang kamu cari tidak ada di sana.
          </p>
          <div className="btn-row" style={{ justifyContent: 'center', marginTop: 22 }}>
            <a className="btn btn--primary" href={`#${ROUTES.contact}`}>
              Kontak &amp; FAQ <IkonPanah size={18} />
            </a>
            <TombolUnduh gaya="ghost" />
          </div>
        </div>
      </Bagian>
    </>
  )
}
