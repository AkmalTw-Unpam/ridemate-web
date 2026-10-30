import { useEffect, useState } from 'react'
import { Bagian, JudulBagian, CatatanDemo, SedangMemuat, Gagal, Kosong } from '../components/Ui'
import { Medali, pecahSyarat } from '../components/Medali'
import { muatLencana } from '../services/api'
import type { Lencana } from '../data/demo'
import type { Sumber } from '../services/api'

export function Rewards() {
  const [data, setData] = useState<Lencana[] | null>(null)
  const [sumber, setSumber] = useState<Sumber>('demo')
  const [galat, setGalat] = useState<string | null>(null)
  const [tik, setTik] = useState(0)

  useEffect(() => {
    let batal = false
    setData(null)
    setGalat(null)
    muatLencana()
      .then((h) => { if (!batal) { setData(h.data); setSumber(h.sumber) } })
      .catch((e: unknown) => {
        if (!batal) setGalat(e instanceof Error ? e.message : 'Terjadi kesalahan.')
      })
    return () => { batal = true }
  }, [tik])

  return (
    <>
      <Bagian nada="malam">
        <JudulBagian
          atas="Reward &amp; Achievements"
          judul="Tiap kilometer punya ujungnya"
          lede="Lencana RideMate tidak diberikan, tapi dikumpulkan. Semuanya dihitung dari perjalanan yang benar-benar tercatat — tidak ada yang bisa diisi sendiri, dan tidak ada yang hangus."
          tengah
        />
      </Bagian>

      <Bagian>
        {sumber === 'demo' && (
          <div style={{ marginBottom: 26 }}>
            <CatatanDemo anak="Daftar di bawah adalah contoh konsep. Ambang jaraknya mengikuti aplikasi, tapi belum ditarik langsung dari backend — jadi kalau ambangnya berubah di aplikasi, halaman ini belum ikut berubah sendiri." />
          </div>
        )}

        {galat && <Gagal pesan={galat} onUlang={() => setTik((t) => t + 1)} />}
        {!galat && data === null && <SedangMemuat pesan="Memuat daftar lencana…" />}
        {!galat && data !== null && data.length === 0 && (
          <Kosong judul="Belum ada lencana" isi="Daftar lencana belum tersedia dari server." />
        )}

        {!galat && data !== null && data.length > 0 && (
          <div className="grid grid--3">
            {data.map((l) => {
              const { angka, satuan } = pecahSyarat(l.syarat)
              return (
                <article key={l.kode} className="lencana card card--hover">
                  <div className="lencana__medali">
                    <Medali tingkat={l.tingkat} angka={angka} satuan={satuan} ukuran={104} />
                  </div>
                  <span className={`pill pill--${l.tingkat.toLowerCase()}`}>{l.tingkat}</span>
                  <h3>{l.nama}</h3>
                  <p className="lencana__syarat">{l.syarat}</p>
                  <p>{l.cerita}</p>
                </article>
              )
            })}
          </div>
        )}
      </Bagian>

      <Bagian nada="dalam">
        <JudulBagian
          atas="Cara kerjanya"
          judul="Dihitung, bukan disimpan"
          lede="Lencana tidak pernah ditulis ke database sebagai milikmu. Ia dihitung ulang dari angka perjalananmu setiap kali layarnya dibuka."
        />
        <div className="grid grid--3">
          <article className="card">
            <h3>Berlaku surut</h3>
            <p>Lencana baru yang ditambahkan nanti langsung terbuka kalau kamu sudah melewatinya — tanpa perlu mengulang perjalanan apa pun.</p>
          </article>
          <article className="card">
            <h3>Tidak bisa melenceng</h3>
            <p>Karena tidak disimpan, mustahil ada keadaan "lencana bilang 1.000 km tapi profil bilang 800 km". Keduanya membaca angka yang sama.</p>
          </article>
          <article className="card">
            <h3>Terlihat di profil rider lain</h3>
            <p>Lencana ikut tampil di profil orang lain tanpa satu pun kueri tambahan, karena angkanya memang sudah ikut terbawa.</p>
          </article>
        </div>
      </Bagian>
    </>
  )
}
