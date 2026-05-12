import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 TAMBAH INI
import "./Dokter.css";

import d1 from "./dokter1.png";
import d2 from "./dokter2.png";
import d3 from "./dokter3.png";
import d4 from "./dokter4.png";
import d5 from "./dokter5.png";
import d6 from "./dokter6.png";

const doctors = [
  { name: "DR. TIRTA", img: d1 },
  { name: "DR. GIGI HADID", img: d2 },
  { name: "DR. ANWAR KOPLO", img: d3 },
  { name: "DR. BILLIE NGAWI", img: d4 },
  { name: "DR. WINDAH B.", img: d5 },
  { name: "DR. JENNY B.", img: d6 },
];

function Dokter() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [tanggal, setTanggal] = useState("");
  const [keluhan, setKeluhan] = useState("");
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [showPayOption, setShowPayOption] = useState(false); // 🔥 NEW

  const navigate = useNavigate(); // 🔥 NEW

  const resetForm = () => {
    setSelectedDoctor(null);
    setTanggal("");
    setKeluhan("");
  };

  const handleBooking = () => {
    if (!tanggal || !keluhan) {
      setToast({ message: "Isi tanggal & keluhan dulu!", type: "error" });

      setTimeout(() => {
        setToast({ message: "", type: "" });
      }, 3000);

      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newJanji = {
        waktu: tanggal,
        nama: JSON.parse(localStorage.getItem("user"))?.name || "User",
        telepon: "08xxxx",
        dokter: selectedDoctor,
        status: "Pending", // 🔥 FIX FLOW
      };

      const existing = JSON.parse(localStorage.getItem("janji")) || [];
      localStorage.setItem("janji", JSON.stringify([...existing, newJanji]));

      setToast({ message: "Janji berhasil dibuat!", type: "success" });

      setShowPayOption(true); // 🔥 munculin pilihan bayar

      resetForm();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="dokter-container">

      {/* GRID */}
      <div className="dokter-grid">
        {doctors.map((doc, i) => (
          <div className="dokter-card" key={i}>
            <img src={doc.img} alt={doc.name} />
            <p>{doc.name}</p>

            <button onClick={() => setSelectedDoctor(doc.name)}>
              Buat Janji
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedDoctor && (
        <div className="modal" onClick={() => !loading && resetForm()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <h3>{selectedDoctor}</h3>

            <label>Tanggal Janji</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />

            <label>Keluhan</label>
            <textarea
              placeholder="Contoh: sakit kepala..."
              value={keluhan}
              onChange={(e) => setKeluhan(e.target.value)}
            />

            <button
              className="btn-primary"
              onClick={handleBooking}
              disabled={loading || !tanggal || !keluhan}
            >
              {loading ? <div className="spinner"></div> : "Simpan"}
            </button>

            <button
              className="btn-secondary"
              onClick={resetForm}
              disabled={loading}
            >
              Batal
            </button>

          </div>
        </div>
      )}

      {/* TOAST */}
      {toast.message && (
        <div className={`toast ${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" ? "✔️" : "❌"}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* 🔥 PILIHAN BAYAR */}
      {showPayOption && (
        <div className="modal">
          <div className="modal-content">

            <h3>Janji Berhasil 🎉</h3>
            <p>Lanjut ke pembayaran sekarang?</p>

            <button
              className="btn-primary"
              onClick={() => navigate("/dashboard/pembayaran")}
            >
              Bayar Sekarang
            </button>

            <button
              className="btn-secondary"
              onClick={() => setShowPayOption(false)}
            >
              Nanti
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Dokter;