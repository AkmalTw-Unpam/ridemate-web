import { ROUTES } from '../router/useRoute'
import { Ponsel } from '../components/Ponsel'
import { Bagian, JudulBagian, Kartu, TombolUnduh, AngkaNaik } from '../components/Ui'
import { Medali } from '../components/Medali'
import {
  IkonPeta, IkonRute, IkonOrang, IkonLencana, IkonPanah, IkonPerisai, IkonGrafik,
} from '../components/Icons'

/**
 * Nilainya angka, bukan teks.
 *
 * Pemisah ribuan dibentuk toLocaleString('id-ID') saat ditampilkan, jadi
 * "10.000" tidak pernah ditulis tangan di sini. Angka yang ditulis sebagai
 * teks tidak bisa dihitung naik, dan yang ditulis tangan dengan titik
 * cepat atau lambat akan salah format di satu tempat.
 */
const ANGKA = [
  { nilai: 13, label: 'lencana untuk dikejar' },
  { nilai: 6, label: 'bentuk motor penanda' },
  { nilai: 5, label: 'gaya peta, termasuk 3D' },
  { nilai: 10000, label: 'km menuju platina' },
]

export function Home() {
  return (
    <>
      {/* ============ Hero ============ */}
      <section className="hero">
        <div className="hero__latar" aria-hidden="true">
          <img src="./hero-touring.webp" alt="" />
          <div className="hero__tirai" />
        </div>

        <div className="wrap hero__isi">
          <div className="hero__teks reveal">
            <p className="eyebrow">Your Journey, Your Story</p>
            <h1>
              Jalanmu panjang.<br />
              Catatannya <span className="sorot">jangan hilang</span>.
            </h1>
            <p className="lede" style={{ color: 'rgba(250,244,232,0.84)' }}>
              RideMate menemani touring dari rencana sampai pulang: navigasi khusus
              motor, posisi rombongan di satu peta, dan tiap kilometer yang kamu
              tempuh tercatat jadi pencapaian.
            </p>
            <div className="btn-row" style={{ marginTop: 26 }}>
              <a className="btn btn--primary" href={`#${ROUTES.features}`}>
                Jelajahi Fitur <IkonPanah size={18} />
              </a>
              <TombolUnduh gaya="ghost" />
            </div>
          </div>

          <div className="hero__ponsel reveal reveal--2">
            <Ponsel />
          </div>
        </div>
      </section>

      {/* ============ Angka ============ */}
      <Bagian nada="dalam" rapat>
        <div className="grid grid--4">
          {ANGKA.map((a) => (
            <div key={a.label} className="angka">
              <strong><AngkaNaik nilai={a.nilai} /></strong>
              <span>{a.label}</span>
            </div>
          ))}
        </div>
      </Bagian>

      {/* ============ Kenapa RideMate ============ */}
      <Bagian>
        <JudulBagian
          atas="Kenapa RideMate"
          judul="Dibuat untuk motor, bukan disesuaikan dari mobil"
          lede="Aplikasi peta biasa menghitung rute untuk empat roda, dan rombongan motor tidak punya tempat di dalamnya. RideMate mulai dari kebalikannya."
        />
        <div className="grid grid--3">
          <Kartu
            ikon={<IkonPeta />}
            judul="Rute roda dua"
            isi="Perhitungannya memakai mode kendaraan roda dua dan menghindari jalan tol, jadi yang keluar memang jalan yang boleh kamu lewati."
          />
          <Kartu
            ikon={<IkonOrang />}
            judul="Rombongan di satu peta"
            isi="Tiap anggota tampil sebagai motor dengan bentuk dan warna pilihannya sendiri. Yang tertinggal langsung kelihatan, tanpa perlu saling telepon."
          />
          <Kartu
            ikon={<IkonLencana />}
            judul="Kilometer yang berarti"
            isi="Jarak yang kamu tempuh terkumpul jadi lencana — dari 100 km pertama sampai platina di 10.000 km. Dihitung dari perjalanan nyata, bukan diisi sendiri."
          />
        </div>
      </Bagian>

      {/* ============ Lencana ============ */}
      <Bagian nada="gelap">
        <div className="pamer">
          <div>
            <JudulBagian
              atas="Reward &amp; Achievements"
              judul="Yang bisa kamu pamerkan"
              lede="Tiga belas lencana, dari perunggu sampai platina. Dihitung ulang dari seluruh riwayat perjalananmu, jadi yang sudah kamu tempuh tidak pernah hangus."
            />
            <div className="btn-row">
              <a className="btn btn--primary" href={`#${ROUTES.rewards}`}>
                Lihat semua lencana <IkonPanah size={18} />
              </a>
            </div>
          </div>
          <div className="pamer__medali">
            <Medali tingkat="Perunggu" angka="100" satuan="KM" ukuran={96} />
            <Medali tingkat="Perak" angka="1.000" satuan="KM" ukuran={110} />
            <Medali tingkat="Emas" angka="5.000" satuan="KM" ukuran={110} />
            <Medali tingkat="Platina" angka="10.000" satuan="KM" ukuran={96} />
          </div>
        </div>
      </Bagian>

      {/* ============ Fitur lain ============ */}
      <Bagian nada="dalam">
        <JudulBagian
          atas="Dan lagi"
          judul="Hal-hal kecil yang terasa waktu di jalan"
          tengah
        />
        <div className="grid grid--3">
          <Kartu
            ikon={<IkonRute />}
            judul="Rute alternatif"
            isi="Sampai tiga pilihan jalan untuk tujuan yang sama, lengkap dengan jarak masing-masing. Pilih yang paling enak dibawa santai."
          />
          <Kartu
            ikon={<IkonGrafik />}
            judul="Riwayat dan statistik"
            isi="Perjalanan yang sudah lewat tersimpan beserta jarak, tanggal, dan siapa saja yang ikut."
          />
          <Kartu
            ikon={<IkonPerisai />}
            judul="Rem yang jelas"
            isi="Setiap rider bisa diblokir dan dilaporkan. Yang diblokir tidak bisa lagi menghubungimu, dan tidak diberi tahu."
          />
        </div>
      </Bagian>

      {/* ============ Ajakan ============ */}
      <Bagian nada="malam">
        <div className="ajakan center">
          <h2>Siap untuk perjalanan berikutnya?</h2>
          <p className="lede" style={{ marginInline: 'auto' }}>
            RideMate sedang dalam pengujian tertutup sebelum terbit di Google Play.
            Tombol di bawah akan aktif sendiri begitu tautannya tersedia.
          </p>
          <div className="btn-row" style={{ justifyContent: 'center', marginTop: 24 }}>
            <TombolUnduh gaya="primary" />
            <a className="btn btn--ghost" href={`#${ROUTES.contact}`}>Hubungi kami</a>
          </div>
        </div>
      </Bagian>
    </>
  )
}
