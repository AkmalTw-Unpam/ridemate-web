# RideMate Web

Situs resmi dan pendamping aplikasi Android **RideMate**.

Proyek ini **terpisah** dari aplikasi Android. Tidak ada satu baris pun kode
Android yang disentuh, dan situs ini tidak berasumsi memakai database yang
sama dengan aplikasinya.

---

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173
```

Perintah lain:

```bash
npm run build      # typecheck lalu build ke dist/
npm run preview    # melihat hasil build
npm run typecheck  # hanya memeriksa tipe
```

Node 18 ke atas.

---

## Konfigurasi

Salin `.env.example` jadi `.env`, lalu isi seperlunya. **Situs ini jalan
tanpa satu pun variabel diisi** — ia memakai data contoh dan menandainya
sebagai contoh di layar.

| Variabel | Gunanya kalau diisi |
|---|---|
| `VITE_API_BASE_URL` | Situs berhenti memakai data contoh dan menarik dari REST API |
| `VITE_API_PUBLIC_KEY` | Dikirim sebagai `apikey` dan `Authorization` ke API |
| `VITE_PLAY_STORE_URL` | Tombol "Segera hadir" berubah jadi tautan unduh sungguhan |
| `VITE_CONTACT_EMAIL` | Email muncul di kaki halaman dan halaman kontak |
| `VITE_INSTAGRAM_URL`, `VITE_YOUTUBE_URL` | Tautan sosial muncul di kaki halaman |

### Yang TIDAK boleh ditaruh di sini

Semua variabel berawalan `VITE_` **ditanamkan ke dalam bundel yang dikirim
ke browser**. Siapa pun yang membuka situsnya bisa membacanya lewat
devtools. Jadi:

- **Boleh**: kunci *anon* Supabase (memang dirancang publik, dijaga RLS).
- **Tidak boleh**: *service role key* Supabase, kunci akun layanan Firebase,
  kunci Google Maps tanpa pembatasan, password apa pun.

---

## Struktur

```
src/
  main.tsx              titik masuk
  App.tsx               rute, judul halaman, kerangka
  router/useRoute.ts    router hash sederhana
  components/           Navbar, Footer, Ikon, Medali, Ponsel, Ui
  pages/                Home, Features, Rewards, Community, About, Contact
  services/
    config.ts           SEMUA env var dibaca di sini, satu tempat
    api.ts              SATU-SATUNYA tempat situs bicara ke backend
  data/demo.ts          data contoh, seluruhnya karangan
  styles/theme.css      sistem desain
public/
  hero-touring.webp     foto hero
```

---

## Integrasi API

### Cara kerjanya sekarang

Setiap fungsi di `src/services/api.ts` mengembalikan
`{ data, sumber: 'demo' | 'api' }`.

Selama `VITE_API_BASE_URL` kosong, fungsinya memulangkan isi `data/demo.ts`
dengan `sumber: 'demo'`, dan halaman yang menampilkannya memasang label
"ini contoh". Begitu alamat API diisi, fungsi yang sama memanggil REST API
dan menandai `sumber: 'api'` — labelnya hilang sendiri. Tampilannya tidak
perlu diubah sama sekali.

### Titik akhir yang diharapkan

| Fungsi | Permintaan | Jawaban |
|---|---|---|
| `muatLencana()` | `GET {base}/lencana` | `Lencana[]` (lihat `data/demo.ts`) |
| `muatTouring()` | `GET {base}/touring?limit=6` | `KartuTouring[]` |
| `kirimPesan()` | `POST {base}/pesan-kontak` | status 2xx |

### Kalau backend-nya Supabase yang sama dengan aplikasi

`VITE_API_BASE_URL` = `https://<proyek>.supabase.co/rest/v1`
`VITE_API_PUBLIC_KEY` = kunci **anon**, bukan service role.

Lalu buat *view* khusus untuk publik. **Jangan arahkan situs ini langsung ke
tabel `users` atau `touring_plans`.** Tabel itu dijaga RLS yang menganggap
pembacanya sudah masuk; pengunjung situs tidak masuk sebagai siapa pun.
Yang benar: view terbatas yang hanya memuat kolom yang memang boleh dilihat
umum, dengan `GRANT SELECT ... TO anon` dan tanpa satu pun kolom pribadi.

Contoh kasarnya:

```sql
create view public.touring_publik as
select id, origin, destination, departure_date, distance_km
  from public.touring_plans
 where status = 'completed';

revoke all on public.touring_publik from authenticated;
grant select on public.touring_publik to anon;
```

### Autentikasi, profil, dan reward di masa depan

Belum ada login di situs ini, dan itu disengaja — situs pemasaran yang
meminta login sebelum menunjukkan apa pun kehilangan sebagian besar
pengunjungnya. Kalau nanti dibutuhkan:

- **Autentikasi** — `@supabase/supabase-js` dengan kunci anon. Sesi tersimpan
  di browser, terpisah dari sesi aplikasi Android. Satu akun, dua sesi.
- **Profil pengguna** — baca dari view `rider_profiles` yang sudah ada di
  aplikasi. View itu sudah menahan email, nomor telepon, dan peran, jadi
  batas privasinya sudah benar sejak awal.
- **Data perjalanan** — hanya perjalanan milik sendiri, lewat RLS. Jangan
  sekali-kali menyajikan jejak lokasi ke situs publik.
- **Reward** — lencana di aplikasi **dihitung, bukan disimpan**. Jadi jangan
  bikin tabel lencana untuk situs. Sajikan angka mentahnya (total km, jumlah
  perjalanan) lalu hitung lencananya dengan aturan yang sama.

---

## Keputusan yang sengaja diambil

**Tailwind tidak dipakai.** Lingkungan tempat situs ini dibangun tidak bisa
mengompilasi Tailwind, jadi kodenya akan dikirim tanpa pernah sekali pun
dijalankan. Gantinya sistem desain CSS di `styles/theme.css` dengan token
warna yang sama persis dengan `Theme.kt` di aplikasi Android. Kalau Tailwind
tetap diinginkan: `npm i -D tailwindcss @tailwindcss/vite`, tambahkan
plugin-nya di `vite.config.ts`, lalu salin blok `:root` dari `theme.css` jadi
token tema Tailwind.

**react-router tidak dipakai.** Enam halaman statis tanpa parameter. Router
hash di `router/useRoute.ts` tiga puluh baris dan berjalan dari subfolder
mana pun tanpa konfigurasi server — rute History API butuh server yang
mengembalikan `index.html` untuk tiap jalur, dan tanpa itu menyegarkan
halaman `/fitur` menghasilkan 404.

**lucide-react tidak dipakai.** Situs ini memakai sebelas ikon; semuanya
digambar tangan di `components/Icons.tsx` memakai `currentColor`.

**Tangkapan layar aplikasi tidak dipakai.** Mockup ponsel di
`components/Ponsel.tsx` digambar ulang sebagai SVG. Tangkapan layar asli
memuat nama dan rute rider sungguhan yang tidak pernah diminta izinnya untuk
tampil di situs.

---

## Catatan SEO

Metadata dasar ada di `index.html`, dan judul per halaman diperbarui
`App.tsx`. Karena ini aplikasi satu bundel tanpa render di server, perayap
yang tidak menjalankan JavaScript hanya melihat metadata di `index.html`.
Google menjalankan JavaScript, jadi untuk sebagian besar keperluan ini cukup.

Kalau nanti butuh metadata berbeda per halaman di hasil pencarian dan di
pratinjau tautan media sosial, jawabannya bukan pustaka meta melainkan
pra-render — `vite-plugin-ssg` atau sejenisnya.

---

## Menerbitkan ke ridemate.my.id

Situs ini terbit sendiri. Kamu tidak perlu memasang Node.js, dan tidak perlu
menjalankan `npm run build` sebelum mengunggah — cukup unggah kode sumbernya,
sisanya dikerjakan GitHub lewat `.github/workflows/deploy.yml`.

**Sekali saja, saat menyiapkan repo:**

1. Unggah seluruh isi folder ini ke repo (termasuk folder `.github` — Windows
   menyembunyikan folder berawalan titik, jadi periksa lagi folder itu ikut
   terunggah; tanpa itu situsnya tidak akan pernah terbangun).
2. **Settings → Pages → Build and deployment → Source** → pilih
   **GitHub Actions**, bukan "Deploy from a branch".
3. **Settings → Pages → Custom domain** → isi `ridemate.my.id` → Save.
4. Tunggu sertifikatnya terbit, lalu centang **Enforce HTTPS**.

**Setiap kali ada perubahan sesudah itu:** unggah berkasnya, tunggu dua menit.
Tab **Actions** memperlihatkan prosesnya — centang hijau berarti sudah tayang,
silang merah berarti build gagal dan situs lama masih utuh.

### Kenapa ada `public/CNAME`

Isinya satu baris: `ridemate.my.id`. Biasanya GitHub membuat berkas ini
sendiri saat kamu mengisi Custom domain, tapi itu hanya berlaku untuk situs
yang diterbitkan dari sebuah cabang. Situs ini diterbitkan dari hasil build,
yang dibuat ulang dari nol setiap kali — kalau `CNAME` tidak ikut di dalamnya,
GitHub bisa menganggap domainnya tidak lagi dipakai dan mengosongkan
setelannya. Berkas di `public/` selalu ikut tersalin ke hasil build, jadi di
situlah tempatnya.

Kalau suatu saat domainnya ganti, ubah berkas ini **dan** kolom Custom domain
di Settings. Mengubah salah satunya saja akan membuat keduanya bertengkar.

---

## Yang masih perlu kamu isi

Email dan media sosial diisi di **`src/services/config.ts`**, di blok
`BAWAAN` dekat bagian atas berkas. Bukan di `.env` — `.env` ada di
laptopmu dan tidak pernah ikut ke repo, jadi GitHub membangun situsnya
tanpa melihat isinya. Keempat nilai itu bukan rahasia, jadi menuliskannya
langsung di berkas aman.

- [ ] Foto hero — `public/hero-touring.webp` sekarang memakai foto touring
      milikmu. Pastikan ketentuan alat yang dipakai mengolahnya mengizinkan
      pemakaian komersial.
- [ ] `playStoreUrl` begitu aplikasi terbit. Selama kosong, tombolnya
      bertuliskan "Segera hadir" dan tidak bisa diklik — bukan tautan mati.
- [ ] `contactEmail`, `instagramUrl`, `youtubeUrl`.
- [ ] Halaman kebijakan privasi — **wajib** untuk Google Play, dan tautannya
      diminta saat mengisi formulir Data safety.
- [ ] Ganti data contoh di `data/demo.ts` dengan API sungguhan, atau biarkan
      beserta labelnya.
