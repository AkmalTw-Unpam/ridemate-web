/**
 * Data contoh.
 *
 * SELURUH ISI BERKAS INI KARANGAN, DAN ITU HARUS TERLIHAT DI LAYAR.
 *
 * Angka dan nama di sini tidak berasal dari pengguna RideMate mana pun. Tiap
 * bagian yang menampilkannya wajib memasang komponen CatatanDemo di dekatnya
 * selama [apiSiap] masih false. Statistik komunitas karangan yang tampil
 * tanpa keterangan adalah klaim palsu tentang besarnya aplikasi — dan itu
 * jenis kebohongan yang paling mudah terjadi tanpa sengaja.
 *
 * Nama orangnya sengaja dibuat jelas-jelas contoh, bukan nama yang terdengar
 * seperti pengguna asli.
 */

export type Lencana = {
  kode: string
  nama: string
  tingkat: 'Perunggu' | 'Perak' | 'Emas' | 'Platina'
  syarat: string
  cerita: string
}

/**
 * Ambangnya mengikuti keluarga JARAK di Lencana.kt pada aplikasi Android.
 * Kalau ambang di aplikasi berubah, ubah juga di sini — atau, lebih baik,
 * sajikan lewat API supaya keduanya mustahil berbeda.
 */
export const LENCANA: Lencana[] = [
  {
    kode: 'jarak_100',
    nama: 'Rookie Rider',
    tingkat: 'Perunggu',
    syarat: '100 km ditempuh',
    cerita: 'Perjalanan pertama yang tercatat. Jaraknya kecil, tapi inilah satu-satunya lencana yang tidak bisa diraih dua kali.',
  },
  {
    kode: 'jarak_500',
    nama: 'Road Explorer',
    tingkat: 'Perunggu',
    syarat: '500 km ditempuh',
    cerita: 'Jarak yang biasanya menandai rider sudah punya rute langganan sendiri, bukan sekadar ikut arah teman.',
  },
  {
    kode: 'jarak_1000',
    nama: 'Adventure Seeker',
    tingkat: 'Perak',
    syarat: '1.000 km ditempuh',
    cerita: 'Empat angka pertama. Sebagian besar rider berhenti sebelum sampai ke sini.',
  },
  {
    kode: 'jarak_2500',
    nama: 'Long Hauler',
    tingkat: 'Perak',
    syarat: '2.500 km ditempuh',
    cerita: 'Jarak lintas provinsi berulang kali. Motornya sudah kenal jalan lebih baik daripada pemiliknya.',
  },
  {
    kode: 'jarak_5000',
    nama: '5.000 KM Rider',
    tingkat: 'Emas',
    syarat: '5.000 km ditempuh',
    cerita: 'Bukan lagi soal tujuan. Yang dikejar jalannya sendiri.',
  },
  {
    kode: 'jarak_10000',
    nama: 'Legendary Touring',
    tingkat: 'Platina',
    syarat: '10.000 km ditempuh',
    cerita: 'Lencana paling mahal di RideMate. Tidak ada jalan pintas menujunya selain benar-benar menempuhnya.',
  },
]

export type KartuTouring = {
  id: string
  judul: string
  tanggal: string
  jarakKm: number
  rider: string
  anggota: string
  cerita: string
}

export const TOURING_CONTOH: KartuTouring[] = [
  {
    id: 'demo-1',
    judul: 'Jakarta → Bandung',
    tanggal: '22 Okt 2026',
    jarakKm: 165,
    rider: 'Rider Contoh A',
    anggota: '4 dari 5 rider',
    cerita: 'Lewat Puncak pagi buta supaya tidak kena macet. Berhenti dua kali, sampai sebelum tengah hari.',
  },
  {
    id: 'demo-2',
    judul: 'Jakarta Barat → Pelabuhan Ratu',
    tanggal: '14 Okt 2026',
    jarakKm: 170,
    rider: 'Rider Contoh B',
    anggota: '3 dari 5 rider',
    cerita: 'Jalur pesisir, jalannya sepi setelah Cibadak. Rombongan kecil, tempo santai.',
  },
  {
    id: 'demo-3',
    judul: 'Bandung → Garut',
    tanggal: '3 Okt 2026',
    jarakKm: 64,
    rider: 'Rider Contoh C',
    anggota: '5 dari 5 rider',
    cerita: 'Tanjakan Nagreg jadi tempat latihan buat yang baru pertama kali ikut touring jauh.',
  },
]

export type Tanya = { tanya: string; jawab: string }

export const FAQ: Tanya[] = [
  {
    tanya: 'Apakah RideMate sudah bisa diunduh?',
    jawab: 'Belum. Aplikasinya masih dalam tahap pengujian tertutup sebelum terbit di Google Play. Tombol unduh di situs ini akan aktif dengan sendirinya begitu tautannya tersedia.',
  },
  {
    tanya: 'Apakah RideMate gratis?',
    jawab: 'Ya. Seluruh fitur intinya gratis — navigasi, pencatatan jarak, rombongan, dan lencana. Paket langganan direncanakan untuk rombongan yang lebih besar dan penyimpanan jejak yang lebih lama, tapi belum dibuka.',
  },
  {
    tanya: 'Apakah lokasi saya terus dipantau?',
    jawab: 'Tidak. Lokasi hanya dibagikan selama mode perjalanan menyala dan hanya ke anggota rombongan yang sama. Jejaknya tersimpan sementara lalu terhapus sendiri, dan bisa kamu hapus kapan saja dari layar profil.',
  },
  {
    tanya: 'Apakah perlu internet selama touring?',
    jawab: 'Perlu, untuk peta dan posisi rombongan. Pencatatan jarak tetap berjalan saat sinyal putus-putus, lalu menyusul terkirim ketika sinyal kembali.',
  },
  {
    tanya: 'Siapa yang bisa melihat profil saya?',
    jawab: 'Rider lain melihat nama, kota, kendaraan, penilaian, dan lencanamu. Alamat email dan nomor telepon tidak pernah ditampilkan ke siapa pun.',
  },
  {
    tanya: 'Bagaimana kalau ada rider yang mengganggu?',
    jawab: 'Setiap rider bisa diblokir dan dilaporkan, baik dari layar obrolan maupun dari daftar teman. Yang diblokir tidak bisa lagi menghubungimu dan tidak diberi tahu bahwa dirinya diblokir.',
  },
]
