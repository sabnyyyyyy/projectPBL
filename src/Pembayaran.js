import { useEffect, useState } from "react";
import "./Pembayaran.css";

function Pembayaran() {
  const [janji, setJanji] = useState([]);
  const [selected, setSelected] = useState(null);
  const [metode, setMetode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [antrian, setAntrian] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("janji")) || [];
    setJanji(data);
  }, []);

  const pendingList = janji
    .map((item, index) => ({ ...item, originalIndex: index }))
    .filter(j => j.status === "Pending");

  const handleBayar = () => {
    if (!metode) return;

    setLoading(true);

    setTimeout(() => {
      const updated = [...janji];
      updated[selected].status = "Proses";

      // 🔥 generate nomor antrian
      const nomor = Math.floor(Math.random() * 1000) + 1;
      setAntrian(nomor);

      localStorage.setItem("janji", JSON.stringify(updated));
      setJanji(updated);

      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="pembayaran-container">

      <h2>Pembayaran</h2>

      {/* LIST */}
      <div className="payment-list">
        {pendingList.length > 0 ? (
          pendingList.map((item, i) => (
            <div className="pembayaran-card" key={i}>

              <div className="left">
                <h4>{item.nama}</h4>
                <p>{item.dokter}</p>
                <p>{item.waktu}</p>
              </div>

              <div className="right">
                <h3>Rp 50.000</h3>
                <span className="status pending">Pending</span>

                <button
                  className="btn-bayar"
                  onClick={() => setSelected(item.originalIndex)}
                >
                  Bayar Sekarang
                </button>
              </div>

            </div>
          ))
        ) : (
          <p>Tidak ada pembayaran pending</p>
        )}
      </div>

      {/* MODAL */}
      {selected !== null && !success && (
        <div className="modal">
          <div className="modal-content">

            <h3>Pilih Metode Pembayaran</h3>

            <div className="payment-method">
              <button
                className={metode === "qris" ? "active" : ""}
                onClick={() => setMetode("qris")}
              >
                QRIS
              </button>

              <button
                className={metode === "ewallet" ? "active" : ""}
                onClick={() => setMetode("ewallet")}
              >
                E-Wallet
              </button>
            </div>

            {metode === "qris" && (
              <div className="qris-box">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYMENT"
                  alt="QRIS"
                />
              </div>
            )}

            {metode === "ewallet" && (
              <div className="ewallet-box">
                <button>OVO</button>
                <button>DANA</button>
                <button>GoPay</button>
              </div>
            )}

            <button
              className="btn-primary"
              onClick={handleBayar}
              disabled={loading}
            >
              {loading ? "Memproses..." : "Konfirmasi Bayar"}
            </button>

            <button
              className="btn-secondary"
              onClick={() => setSelected(null)}
            >
              Batal
            </button>

          </div>
        </div>
      )}

      {/* SUCCESS + INVOICE */}
      {success && (
        <div className="modal">
          <div className="modal-content success">

            <h2>✅ Pembayaran Berhasil</h2>
            <p>Nomor Antrian:</p>
            <h1>#{antrian}</h1>

            <div className="invoice">
              <p>Nama: {janji[selected]?.nama}</p>
              <p>Dokter: {janji[selected]?.dokter}</p>
              <p>Tanggal: {janji[selected]?.waktu}</p>
              <p>Total: Rp 50.000</p>
            </div>

            <button className="btn-primary" onClick={() => window.print()}>
              Cetak Invoice
            </button>

            <button
              className="btn-secondary"
              onClick={() => {
                setSuccess(false);
                setSelected(null);
                setMetode("");
              }}
            >
              Tutup
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Pembayaran;