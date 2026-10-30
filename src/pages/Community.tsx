import { useEffect, useState } from 'react'
import { Bagian, JudulBagian, CatatanDemo, SedangMemuat, Gagal, Kosong, TombolUnduh } from '../components/Ui'
import { muatTouring, type Sumber } from '../services/api'
import type { KartuTouring } from '../data/demo'
import { IkonRute, IkonOrang, IkonLencana } from '../components/Icons'

export function Community() {
  const [data, setData] = useState<KartuTouring[] | null>(null)
  const [sumber, setSumber] = useState<Sumber>('demo')
  const [galat, setGalat] = useState<string | null>(null)
  const [tik, setTik] = useState(0)

  useEffect(() => {
    let batal = false
    setData(null)
    setGalat(null)
    muatTouring()
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
          atas="Komunitas"
          judul="Touring jarang sendirian"
          lede="RideMate dibuat untuk rombongan: membuat rencana, mengumpulkan rider, berangkat bersama, lalu saling menilai sesudahnya. Yang kamu bangun bukan cuma jarak, tapi juga catatan siapa yang enak diajak jalan."
          tengah
        />
      </Bagian>

      <Bagian>
        <JudulBagian atas="Cara kerjanya" judul="Dari rencana sampai penilaian" />
        <div className="grid grid--3">
          <article className="card">
            <div className="card__icon"><IkonRute /></div>
            <h3>1. Buat rencana</h3>
            <p>Tentukan titik berangkat, tujuan, tanggal, dan berapa rider yang boleh ikut. Jarak rutenya dihitung otomatis.</p>
          </article>
          <article className="card">
            <div className="card__icon"><IkonOrang /></div>
            <h3>2. Kumpulkan rombongan</h3>
            <p>Rider lain mengajukan diri, dan kamu yang memutuskan. Rekomendasi rider yang cocok dihitung dari kendaraan, jarak domisili, dan pengalamannya.</p>
          </article>
          <article className="card">
            <div className="card__icon"><IkonLencana /></div>
            <h3>3. Berangkat dan nilai</h3>
            <p>Mode perjalanan menyala, posisi rombongan tampil di satu peta. Sesudah pulang, kalian saling memberi penilaian.</p>
          </article>
        </div>
      </Bagian>

      <Bagian nada="dalam">
        <JudulBagian
          atas="Cerita perjalanan"
          judul="Yang sudah ditempuh rider lain"
          lede="Bagian ini akan menampilkan perjalanan yang benar-benar dibagikan pengguna begitu situs tersambung ke backend."
        />

        {sumber === 'demo' && (
          <div style={{ marginBottom: 24 }}>
            <CatatanDemo anak="Tiga kartu di bawah adalah CONTOH BUATAN, bukan perjalanan sungguhan. Nama ridernya karangan dan tidak merujuk siapa pun." />
          </div>
        )}

        {galat && <Gagal pesan={galat} onUlang={() => setTik((t) => t + 1)} />}
        {!galat && data === null && <SedangMemuat pesan="Memuat perjalanan…" />}
        {!galat && data !== null && data.length === 0 && (
          <Kosong
            judul="Belum ada perjalanan dibagikan"
            isi="Begitu rider mulai membagikan perjalanannya, yang terbaru akan muncul di sini."
          />
        )}

        {!galat && data !== null && data.length > 0 && (
          <div className="grid grid--3">
            {data.map((t) => (
              <article key={t.id} className="card card--hover trip">
                <div className="trip__kepala">
                  <span className="pill pill--sunset">{t.jarakKm} km</span>
                  <span className="trip__tanggal">{t.tanggal}</span>
                </div>
                <h3>{t.judul}</h3>
                <p className="trip__anggota">{t.rider} · {t.anggota}</p>
                <p>{t.cerita}</p>
              </article>
            ))}
          </div>
        )}
      </Bagian>

      <Bagian nada="gelap">
        <div className="ajakan center">
          <h2>Rombonganmu berikutnya ada di sini</h2>
          <p className="lede" style={{ marginInline: 'auto' }}>
            Buat rencana, atau ikut rencana orang lain. Keduanya gratis.
          </p>
          <div className="btn-row" style={{ justifyContent: 'center', marginTop: 22 }}>
            <TombolUnduh gaya="primary" />
          </div>
        </div>
      </Bagian>
    </>
  )
}
