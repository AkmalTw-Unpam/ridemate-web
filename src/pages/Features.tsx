import { Bagian, JudulBagian, Kartu, CatatanDemo, TombolUnduh } from '../components/Ui'
import { Ponsel } from '../components/Ponsel'
import {
  IkonPeta, IkonRute, IkonOrang, IkonLencana, IkonGrafik, IkonMotor, IkonPerisai, IkonPanah,
} from '../components/Icons'
import { ROUTES } from '../router/useRoute'
import { Tautan } from '../components/Tautan'

const UTAMA = [
  {
    ikon: <IkonPeta />,
    judul: 'Navigasi khusus motor',
    isi: 'Rute dihitung dengan mode kendaraan roda dua dan menghindari jalan tol. Pita rutenya digambar berlapis supaya tetap terbaca di atas peta terang maupun gelap, dan tersedia lima gaya peta — termasuk tampilan 3D kota dan satelit.',
  },
  {
    ikon: <IkonRute />,
    judul: 'Rute alternatif',
    isi: 'Sampai tiga pilihan jalan untuk tujuan yang sama, masing-masing dengan jaraknya. Yang tidak terpilih tetap digambar samar di peta, jadi kamu bisa membandingkannya sekilas sebelum berangkat.',
  },
  {
    ikon: <IkonOrang />,
    judul: 'Rombongan di satu peta',
    isi: 'Selama mode perjalanan menyala, seluruh anggota rombongan tampil di peta yang sama. Posisinya bergerak halus, bukan meloncat tiap kali data masuk.',
  },
  {
    ikon: <IkonMotor />,
    judul: 'Motor sebagai penanda',
    isi: 'Enam bentuk motor dan delapan pilihan warna. Penandamu sendiri bergaris tepi oranye supaya langsung ketemu di antara penanda lain, dan arah hadapnya mengikuti arah jalanmu.',
  },
  {
    ikon: <IkonGrafik />,
    judul: 'Catatan dan statistik',
    isi: 'Jarak tiap perjalanan tercatat sendiri dan terkumpul jadi total kilometer. Riwayatnya menyimpan tanggal, rute, dan siapa saja yang ikut.',
  },
  {
    ikon: <IkonLencana />,
    judul: 'Lencana pencapaian',
    isi: 'Tiga belas lencana dari empat keluarga: jarak tempuh, jumlah perjalanan, lama bergabung, dan penilaian rekan. Dihitung ulang dari seluruh riwayat, jadi tidak pernah hangus.',
  },
]

const SOSIAL = [
  {
    ikon: <IkonOrang />,
    judul: 'Profil dan avatar',
    isi: 'Nama, kota, kendaraan, penilaian rekan, dan lencana. Alamat email tidak pernah ditampilkan ke rider lain.',
  },
  {
    ikon: <IkonPerisai />,
    judul: 'Blokir dan lapor',
    isi: 'Dari layar obrolan maupun daftar teman. Yang diblokir tidak bisa lagi mengirim pesan — ditolak di sisi server, bukan sekadar disembunyikan — dan tidak diberi tahu.',
  },
  {
    ikon: <IkonLencana />,
    judul: 'Pamer pencapaian',
    isi: 'Tiap lencana bisa dijadikan gambar untuk dibagikan ke status atau media sosial, lengkap dengan nama dan total kilometermu.',
  },
]

export function Features() {
  return (
    <>
      <Bagian nada="malam">
        <div className="kepala-halaman">
          <div>
            <JudulBagian
              atas="Fitur"
              judul="Semua yang dipakai sejak rencana sampai pulang"
              lede="RideMate adalah aplikasi Android. Yang tertulis di halaman ini adalah fitur yang sudah berjalan di aplikasinya, bukan rencana."
            />
            <div className="btn-row">
              <TombolUnduh gaya="primary" />
              <Tautan className="btn btn--ghost" ke={ROUTES.rewards}>
                Lihat lencana <IkonPanah size={18} />
              </Tautan>
            </div>
          </div>
          <Ponsel miring={false} />
        </div>
      </Bagian>

      <Bagian>
        <JudulBagian atas="Di jalan" judul="Navigasi dan perjalanan" />
        <div className="grid grid--3">
          {UTAMA.map((f) => (
            <Kartu key={f.judul} ikon={f.ikon} judul={f.judul} isi={f.isi} />
          ))}
        </div>
      </Bagian>

      <Bagian nada="dalam">
        <JudulBagian atas="Bersama rider lain" judul="Komunitas dan profil" />
        <div className="grid grid--3">
          {SOSIAL.map((f) => (
            <Kartu key={f.judul} ikon={f.ikon} judul={f.judul} isi={f.isi} />
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <CatatanDemo anak="Situs ini belum tersambung ke aplikasi. Yang ditampilkan di sini adalah penjelasan fitur, bukan data dari akunmu — untuk memakainya, pasang aplikasi RideMate di Android." />
        </div>
      </Bagian>
    </>
  )
}
