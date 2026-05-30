import { useState, useEffect } from "react";
import toothImg from "../gambardepan.jpg";
import axios from "axios";
import clinicImg from "../clinic.jpg";

// ─── INLINE STYLES (no extra CSS file needed) ───────────────────────────────
const S = {
  /* ── reset / base ── */
  root: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: "#111",
    background: "#fff",
    overflowX: "hidden",
  },

  /* ── NAV ── */
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5%",
    height: 78,
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #f0f0f0",
  },
  navLogo: { fontWeight: 800, fontSize: 18, letterSpacing: -0.5 },
  navLinks: {
    display: "flex",
    gap: 32,
    listStyle: "none",
    margin: 0,
    padding: 0,
    fontSize: 14,
  },
  navLink: {
    cursor: "pointer",
    color: "#333",
    transition: "color .2s",
  },
  navBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "9px 20px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background .2s",
  },

  /* ── HERO ── */
  hero: {
    position: "relative",
    minHeight: "78vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    padding: "60px 5% 40px",
    gap: 40,
    overflow: "hidden",
    background: "#fafafa",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "#e9faf3",
    color: "#1db469",
    borderRadius: 99,
    padding: "5px 14px",
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#1db469",
    animation: "pulse 1.5s infinite",
  },
  heroTitle: {
    fontSize: "clamp(34px, 4.5vw, 60px)",
    fontWeight: 700,
    lineHeight: 1.08,
    letterSpacing: -2,
    margin: "0 0 20px",
  },
  heroAccent: { color: "#1db469" },
  heroSub: {
    fontSize: 16,
    color: "#666",
    maxWidth: 420,
    lineHeight: 1.7,
    marginBottom: 36,
  },
  heroBtns: { display: "flex", gap: 12, alignItems: "center" },
  btnPrimary: {
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px 28px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform .15s, box-shadow .15s",
  },
  btnSecondary: {
    background: "transparent",
    color: "#111",
    border: "1.5px solid #ddd",
    borderRadius: 10,
    padding: "14px 28px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "border-color .2s",
  },
  heroStats: {
    display: "flex",
    gap: 40,
    marginTop: 48,
    paddingTop: 32,
    borderTop: "1px solid #eee",
  },
  statNum: {
    fontSize: 42,
    fontWeight: 900,
    letterSpacing: -1,
    color: "#111",
  },
  statLabel: { fontSize: 12, color: "#888", marginTop: 2 },
  heroImgWrap: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heroImgPlaceholder: {
    width: "100%",
    maxWidth: 520,
    height: 460,
    borderRadius: 40,
    boxShadow: "0 35px 80px rgba(0,0,0,0.18)",
    background: "linear-gradient(135deg, #e9faf3 0%, #d0f0e3 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 80,
    position: "relative",
    overflow: "hidden",
  },
  floatCard: {
    position: "absolute",
    background: "#fff",
    borderRadius: 14,
    padding: "12px 18px",
    boxShadow: "0 8px 32px rgba(0,0,0,.12)",
    fontSize: 12,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  /* ── SECTION SHARED ── */
  section: { padding: "80px 5%" },
  sectionTag: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#1db469",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: "clamp(28px, 3.5vw, 48px)",
    fontWeight: 700,
    letterSpacing: -1.5,
    margin: "0 0 16px",
    lineHeight: 1.1,
  },

  /* ── ABOUT ── */
  about: {
    padding: "80px 5%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    alignItems: "center",
    background: "#fff",
  },
  missionText: {
    fontSize: "clamp(22px, 2.5vw, 34px)",
    fontWeight: 800,
    lineHeight: 1.3,
    letterSpacing: -0.5,
  },
  aboutFeatures: {
    display: "flex",
    gap: 32,
    marginTop: 40,
  },
  featureItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  featureArrow: { fontSize: 22, fontWeight: 900, color: "#1db469" },
  featureLabel: { fontSize: 14, fontWeight: 700, marginTop: 6 },
  imgPlaceholder: {
    width: "100%",
    height: 340,
    borderRadius: 20,
    background: "linear-gradient(135deg, #f0f8f4 0%, #ddf3ea 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 60,
  },

  /* ── SERVICES ── */
  services: { padding: "80px 5%", background: "#fafafa" },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1.2fr 0.8fr",
    gap: 18,
    alignItems: "stretch",
  },
  serviceCard: {
    background: "#fff",
    border: "1.5px solid #f0f0f0",
    borderRadius: 16,
    padding: "28px 24px",
    cursor: "pointer",
    transition: "border-color .2s, transform .2s, box-shadow .2s",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    position: "relative",
    overflow: "hidden",
  },
  serviceCardTitle: { fontWeight: 800, fontSize: 15 },
  serviceCardSubs: { fontSize: 12, color: "#888", lineHeight: 1.8 },

  /* ── DOCTORS ── */
  doctors: { padding: "80px 5%", background: "#fff" },
  doctorsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 40,
  },
  doctorsNav: { display: "flex", gap: 8 },
  navCircle: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "1.5px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background .2s, border-color .2s",
  },
  doctorsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 20,
  },
  doctorCard: {
    borderRadius: 20,
    overflow: "hidden",
    background: "#f5f5f5",
    cursor: "pointer",
    transition: "transform .2s, box-shadow .2s",
  },
  doctorImgWrap: {
    height: 320,
    overflow: "hidden",
    background: "#f5f5f5",
    position: "relative",
  },
  doctorInfo: {
    padding: "14px 16px",
    background: "#fff",
    borderTop: "1px solid #f0f0f0",
  },
  doctorName: { fontWeight: 800, fontSize: 14 },
  doctorRole: { fontSize: 12, color: "#888", marginTop: 2 },
  doctorSocials: {
    display: "flex",
    gap: 8,
    marginTop: 10,
  },
  socialIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    cursor: "pointer",
    transition: "background .2s",
  },

  /* ── BOOKING ── */
  booking: {
    padding: "80px 5%",
    background: "#fafafa",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 60,
    alignItems: "center",
  },
  bookingForm: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #e7e7e7",
    borderRadius: 14,
    fontSize: 14,
    outline: "none",
    transition: "all .2s ease",
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: "#fcfcfc",
  },
  inputRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },

  /* ── MARQUEE ── */
  marqueeWrap: {
    background: "#111",
    color: "#fff",
    padding: "18px 0",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  marqueeInner: {
    display: "inline-flex",
    gap: 32,
    animation: "marquee 20s linear infinite",
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 0.3,
  },

  /* ── FOOTER ── */
  footer: {
    padding: "60px 5% 32px",
    background: "#fff",
    borderTop: "1px solid #f0f0f0",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: 40,
  },
  footerBrand: { fontWeight: 900, fontSize: 16, marginBottom: 12 },
  footerSub: { fontSize: 13, color: "#888", lineHeight: 1.7, maxWidth: 260 },
  footerHours: { fontSize: 12, color: "#666", marginTop: 16, lineHeight: 1.8 },
  footerColTitle: {
    fontWeight: 800,
    fontSize: 13,
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  footerLink: {
    display: "block",
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
    cursor: "pointer",
    transition: "color .2s",
  },
  footerBottom: {
    padding: "20px 5% 0",
    borderTop: "1px solid #f0f0f0",
    marginTop: 8,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 12,
    color: "#aaa",
  },
  bigFooter: {
    padding: "24px 5%",
    background: "#fafafa",
    borderTop: "1px solid #f0f0f0",
    textAlign: "center",
    fontSize: "clamp(36px, 8vw, 100px)",
    fontWeight: 900,
    letterSpacing: -4,
    color: "#111",
    lineHeight: 1,
  },

  /* ── MODALS ── */
  ticketOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
    padding: 20,
  },
  ticketCard: {
    width: 430,
    background: "#fff",
    borderRadius: 30,
    padding: 35,
    boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.25s ease",
  },
  ticketHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  clinicName: { margin: 0, fontSize: 24, fontWeight: 800, color: "#111" },
  clinicContact: { marginTop: 5, color: "#666", fontSize: 14 },
  logoCircle: {
    width: 58,
    height: 58,
    borderRadius: "50%",
    background: "#dcfce7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 42,
  },
  ticketSuccess: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 700,
    color: "#16a34a",
    marginBottom: 20,
  },
  queueSection: { textAlign: "center", marginBottom: 30 },
  queueLabel: { fontSize: 13, color: "#666", letterSpacing: 2 },
  queueNumber: { fontSize: 68, fontWeight: 900, color: "#16a34a", marginTop: 10 },
  ticketInfoBox: {
    background: "#f8fafc",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  ticketRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 14,
    fontSize: 15,
    color: "#333",
  },
  qrSection: { textAlign: "center", marginBottom: 30 },
  qrImage: { width: 120, height: 120 },
  qrText: { fontSize: 13, color: "#666", marginTop: 10 },
  ticketButtons: { display: "flex", gap: 12 },
  printBtn: {
    flex: 1,
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "16px",
    borderRadius: 16,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 15,
  },
  closeBtn: {
    flex: 1,
    background: "#f1f5f9",
    color: "#111",
    border: "none",
    padding: "16px",
    borderRadius: 16,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 15,
  },
  serviceModal: {
    width: 500,
    background: "#fff",
    borderRadius: 30,
    padding: 35,
    boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
  },
  serviceTitle: { fontSize: 34, fontWeight: 800, marginBottom: 10 },
  serviceDesc: { color: "#666", lineHeight: 1.7, marginBottom: 25 },
  serviceBox: {
    background: "#f8fafc",
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
  },
  serviceMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 30,
    fontWeight: 700,
  },
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const SERVICES = [
  { title: "General Dentistry", icon: "🦷", subs: ["Scaling", "Tambal Gigi", "Cabut Gigi"], featured: true },
  { title: "Cosmetic Dentistry", icon: "✨", subs: ["Dental Whitening", "Veneer"], featured: true },
  { title: "Orthodontics", subs: [] },
  { title: "Prosthodonti", subs: [] },
  { title: "Dental Implant", subs: [] },
  { title: "Endodontics", subs: [] },
];

const DOCTORS = [
  { name: "Dr. Olivia Lim, M.Ort.", role: "Orthodontist", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200" },
  { name: "Dr. Ryan Chen, Sp.KG", role: "General Dentist", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200" },
  { name: "Dr. Kevin Park, Sp.BM", role: "Oral Surgeon", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1200" },
  { name: "Dr. Sophia Mills, Sp.Pros", role: "Prosthodontist", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200" },
];

const serviceDetails = {
  "General Dentistry": { image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09", description: "Professional dental treatments for maintaining healthy teeth and gums.", facilities: ["Scaling", "Tambal Gigi", "Cabut Gigi"], duration: "30 - 60 minutes", price: "Rp150.000" },
  "Cosmetic Dentistry": { image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe", description: "Cosmetic dental treatments to improve your smile appearance.", facilities: ["Dental Whitening", "Veneer", "Smile Consultation"], duration: "60 - 90 minutes", price: "Rp500.000" },
  "Orthodontics": { image: "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg", description: "Alignment treatment for improving teeth structure and bite.", facilities: ["Braces", "Consultation", "Digital Scan"], duration: "45 - 90 minutes", price: "Rp750.000" },
  "Prosthodonti": { image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99", description: "Tooth restoration and replacement treatment.", facilities: ["Dental Crown", "Dental Bridge", "Denture"], duration: "60 - 120 minutes", price: "Rp900.000" },
  "Dental Implant": { image: "https://images.pexels.com/photos/6528908/pexels-photo-6528908.jpeg", description: "Permanent dental implant treatment.", facilities: ["Implant Consultation", "X-Ray", "Surgery"], duration: "90 - 180 minutes", price: "Rp3.500.000" },
  "Endodontics": { image: "https://images.pexels.com/photos/3779711/pexels-photo-3779711.jpeg", description: "Root canal treatment and tooth nerve care.", facilities: ["Root Canal", "Tooth Restoration", "Pain Treatment"], duration: "60 - 120 minutes", price: "Rp850.000" },
};

// ─── KEYFRAMES ────────────────────────────────────────────────────────────────
const injectKeyframes = () => {
  if (document.getElementById("dh-kf")) return;
  const style = document.createElement("style");
  style.id = "dh-kf";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800;900&display=swap');
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
    @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    .dh-fade { animation: fadeUp .5s ease both; }
    .dh-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.18); }
    .dh-btn-secondary:hover { border-color: #111; }
    .dh-nav-link:hover { color: #1db469 !important; }
    .dh-service-card:hover { border-color: #1db469 !important; transform: translateY(-3px); box-shadow: 0 8px 28px rgba(29,180,105,.12); }
    .dh-doctor-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.10); }
    .dh-social:hover { background: #e9faf3 !important; }
    .dh-nav-circle:hover { background: #111 !important; border-color: #111 !important; color: #fff; }
    .dh-input:focus { border-color: #22c55e !important; background: #fff !important; box-shadow: 0 0 0 4px rgba(34,197,94,0.08); }
    .dh-footer-link:hover { color: #1db469 !important; }
  `;
  document.head.appendChild(style);
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", dentist_id: "", date: "", time: "" });
  const [dentists, setDentists] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    injectKeyframes();
    fetchDentists();
  }, []);

 const fetchDentists = async () => {

  try {

    const response = await axios.get(
      "http://127.0.0.1:8000/api/dentists"
    );

    console.log("DENTISTS:", response.data);

    setDentists(response.data);

  } catch (error) {

    console.error(error);

  }
};

  const handleBook = async () => {
    if (!formData.name || !formData.email || !formData.dentist_id) {
      setNotification("Please complete the form.");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/appointments", {
        full_name: formData.name,
        email: formData.email,
        dentist_id: formData.dentist_id,
        appointment_date: formData.date,
        appointment_time: formData.time,
      });
      const booking = response.data.data;
      setTicket({
        queue: `A-${String(booking.id).padStart(3, "0")}`,
        date: booking.appointment_date,
        time: booking.appointment_time,
        patient: formData.name,
        dentist: dentists.find((d) => d.id == formData.dentist_id)?.name,
      });
      setFormData({ name: "", email: "", dentist_id: "", date: "", time: "" });
    } catch (error) {
      console.error(error);
      setNotification("Booking failed.");
    }
  };

  return (
    <div style={S.root}>
      {/* ── NAV ── */}
      <nav style={S.nav}>
        <span style={S.navLogo}>Dental Happy</span>
        <ul style={S.navLinks}>
          {["Home", "About", "Our Services", "Our Clinics", "Location"].map((l) => (
            <li key={l} style={S.navLink} className="dh-nav-link"
              onClick={() => document.getElementById(l.toLowerCase().replace(/\s+/g, "-"))?.scrollIntoView({ behavior: "smooth" })}>
              {l}
            </li>
          ))}
        </ul>
        <button style={S.navBtn} className="dh-btn-primary"
          onClick={() => document.getElementById("book-online")?.scrollIntoView({ behavior: "smooth" })}>
          Get Consultation
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={S.hero}>
        <div className="dh-fade">
          <div style={S.heroBadge}><span style={S.dot} /> We're Open Clinic · 8 AM – 5 PM</div>
          <h1 style={S.heroTitle}>Exceptional<br /><span style={S.heroAccent}>Dental</span> Care</h1>
          <p style={S.heroSub}>With our team of experienced dentists and state-of-the-art technology, we deliver comprehensive treatments in a comfortable and welcoming environment.</p>
          <div style={S.heroBtns}>
            <button style={S.btnPrimary} className="dh-btn-primary"
              onClick={() => document.getElementById("book-online")?.scrollIntoView({ behavior: "smooth" })}>
              Book Appointment →
            </button>
            <button style={S.btnSecondary} className="dh-btn-secondary"
              onClick={() => document.getElementById("our-services")?.scrollIntoView({ behavior: "smooth" })}>
              Our Services
            </button>
          </div>
          <div style={S.heroStats}>
            {[["13+", "Range of Services"], ["852+", "Patients Treated"], ["8+", "Expert Dentists"]].map(([n, l]) => (
              <div key={l}><div style={S.statNum}>{n}</div><div style={S.statLabel}>{l}</div></div>
            ))}
          </div>
        </div>
        <div style={S.heroImgWrap}>
          <div style={S.heroImgPlaceholder}>
            <img src={toothImg} alt="Dental" style={{ width: "82%", height: "82%", objectFit: "cover", borderRadius: "28px", boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }} />
            <div style={{ ...S.floatCard, bottom: 32, left: -20 }}>✅ Next slot: <strong>Today 2 PM</strong></div>
            <div style={{ ...S.floatCard, top: 32, right: -16, flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
              <span style={{ color: "#1db469", fontSize: 11 }}>★★★★★ 4.9</span>
              <span>1,200+ Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={S.about}>
        <div>
          <p style={S.sectionTag}>Our Mission</p>
          <p style={S.missionText}>Help you achieve a <span style={S.heroAccent}>healthy, confident smile</span> that lasts a lifetime</p>
          <div style={S.aboutFeatures}>
            {["Skilled Dentists", "Comfortable Environment", "Latest Tech"].map((f) => (
              <div key={f} style={S.featureItem}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", marginBottom: 10 }} />
                <span style={S.featureLabel}>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: "100%", height: 420, borderRadius: 28, overflow: "hidden", position: "relative" }}>
          <img src={clinicImg} alt="Clinic" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.12), rgba(0,0,0,0.02))" }} />
          <div style={{ position: "absolute", bottom: 20, left: 20, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(6px)", padding: "12px 16px", borderRadius: 16, boxShadow: "0 4px 18px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 700 }}>Since 2016</div>
            <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>Trusted by 1,200+ patients</div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="our-services" style={S.services}>
        <p style={S.sectionTag}>What We Offer</p>
        <h2 style={S.sectionTitle}>Our Service</h2>
        <div style={S.servicesGrid}>
          {SERVICES.map((sv) => (
            <div key={sv.title} style={{ ...S.serviceCard, background: sv.featured ? "#fff" : "#fafafa" }}
              className="dh-service-card" onClick={() => setSelectedService(sv.title)}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#16a34a", marginBottom: 18 }} />
              <div style={S.serviceCardTitle}>{sv.title}</div>
              {sv.subs.length > 0 && (
                <div style={S.serviceCardSubs}>{sv.subs.map((s) => <div key={s}>• {s}</div>)}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── MEET DENTISTS ── */}
      <section id="our-clinics" style={S.doctors}>
        <div style={S.doctorsHeader}>
          <div>
            <p style={S.sectionTag}>Our Team</p>
            <h2 style={{ ...S.sectionTitle, margin: 0 }}>Meet The Dentists</h2>
          </div>
          <div style={S.doctorsNav}>
            <button style={S.navCircle} className="dh-nav-circle">←</button>
            <button style={S.navCircle} className="dh-nav-circle">→</button>
          </div>
        </div>
        <div style={S.doctorsGrid}>
          {DOCTORS.map((d) => (
            <div key={d.name} style={S.doctorCard} className="dh-doctor-card"
              onClick={() => document.getElementById("book-online")?.scrollIntoView({ behavior: "smooth" })}>
              <div style={S.doctorImgWrap}>
                <img src={d.image} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.12), transparent)" }} />
              </div>
              <div style={S.doctorInfo}>
                <div style={S.doctorName}>{d.name}</div>
                <div style={S.doctorRole}>{d.role}</div>
                <div style={S.doctorSocials}>
                  {["ig", "tw", "in"].map((s) => (
                    <div key={s} style={S.socialIcon} className="dh-social">
                      {s === "ig" ? "📷" : s === "tw" ? "🐦" : "💼"}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOOK ONLINE ── */}
      <section id="book-online" style={S.booking}>
        <div>
          <p style={S.sectionTag}>Easy Appointment</p>
          <h2 style={{ ...S.sectionTitle, marginBottom: 8 }}>Book Online Now.</h2>
          <p style={{ fontSize: 15, color: "#666", marginBottom: 32, lineHeight: 1.7, maxWidth: 440 }}>
            Schedule your consultation in just a few steps. Our team will contact you to confirm your appointment.
          </p>
          <div style={{ background: "#fff", border: "1px solid #efefef", borderRadius: 28, padding: "34px 32px", boxShadow: "0 10px 30px rgba(0,0,0,0.04)", maxWidth: 520 }}>
            <div style={S.bookingForm}>
              <input style={S.input} className="dh-input" placeholder="Your Name" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input style={S.input} className="dh-input" placeholder="Email Address" type="email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <div style={{ position: "relative" }}>

  <select
    style={{
      ...S.input,
      cursor: "pointer",
      backgroundColor: "#fcfcfc",
      fontWeight: 500,
    }}
    className="dh-input"
    value={formData.dentist_id}
    onChange={(e) =>
      setFormData({
        ...formData,
        dentist_id: e.target.value,
      })
    }
  >

    <option value="">
      Select Dentist
    </option>

    {dentists.map((dentist) => (
      <option
        key={dentist.id}
        value={dentist.id}
      >
        {dentist.name} — {dentist.specialization}
      </option>
    ))}

  </select>

</div>
              <div style={S.inputRow}>
                <input style={S.input} className="dh-input" type="date" value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                <input style={S.input} className="dh-input" type="time" value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
              </div>
              <button style={{ ...S.btnPrimary, padding: "13px 24px", fontSize: 14, borderRadius: 14, marginTop: 6, width: 180, alignSelf: "flex-start" }}
                className="dh-btn-primary" onClick={handleBook}>
                Book Now →
              </button>
              <div style={{ display: "flex", gap: 18, marginTop: 18, fontSize: 12, color: "#666", flexWrap: "wrap" }}>
                <span>✓ Fast confirmation</span>
                <span>✓ Professional dentists</span>
                <span>✓ Comfortable clinic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div>
          <div style={{ width: "100%", height: 420, borderRadius: 28, overflow: "hidden", position: "relative", border: "1px solid #eee", background: "#f8f8f8" }}>
            <iframe title="Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.4051693710835!2d112.62272440000001!3d-7.9570135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629f864d9ea95%3A0x4e2237bd65cca6!2sXOAN%20LOUNGE%20MALANG!5e0!3m2!1sid!2sid!4v1779139287838!5m2!1sid!2sid"
              width="100%" height="100%" style={{ border: 0, filter: "grayscale(1) contrast(1.05)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <div style={{ position: "absolute", bottom: 20, left: 20, background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)", padding: "14px 18px", borderRadius: 18, boxShadow: "0 4px 18px rgba(0,0,0,0.08)" }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Dental Happy Clinic</div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>Jl. Soekarno Hatta No.1<br />Malang, Jawa Timur</div>
            </div>
          </div>
          <div style={{ marginTop: 14, fontSize: 13, color: "#666" }}>Free parking available • Emergency service available</div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={S.marqueeWrap}>
        <div style={S.marqueeInner}>
          {Array(10).fill(null).map((_, i) => (
            <span key={i}>Confident Smiles ✦ &nbsp; Dental Harmony ✦ &nbsp; Healthy You ✦ &nbsp;</span>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer id="location">
        <div style={S.footer}>
          <div>
            <div style={S.footerBrand}>😁 Happy</div>
            <div style={S.footerSub}>We are dedicated to providing exceptional dental care with a focus on patient comfort and satisfaction.</div>
            <div style={S.footerHours}>
              <strong>CLINIC HOURS</strong><br />
              Monday–Friday: 8:00 AM – 3:00 PM<br />
              Saturday: 8:00 AM – 1:00 PM<br />
              Sunday: Closed
            </div>
          </div>
          <div>
            <div style={S.footerColTitle}>ABOUT US</div>
            {["Our Services", "Our Clinics", "Privacy Policy", "Dentists"].map((l) => (
              <span key={l} style={S.footerLink} className="dh-footer-link"
                onClick={() => document.getElementById("book-online")?.scrollIntoView({ behavior: "smooth" })}>{l}</span>
            ))}
          </div>
          <div>
            <div style={S.footerColTitle}>LOCATION</div>
            {["Career", "Privacy Policy", "Terms of Service"].map((l) => (
              <span key={l} style={S.footerLink} className="dh-footer-link">{l}</span>
            ))}
            <div style={{ marginTop: 20 }}>
              <div style={S.footerColTitle}>PHONE NUMBER</div>
              <span style={{ fontSize: 13, color: "#666" }}>(808) 555-0111</span>
            </div>
          </div>
          <div>
            <div style={S.footerColTitle}>SOCIALS</div>
            {["Instagram", "Twitter", "Threads", "TikTok"].map((l) => (
              <span key={l} style={S.footerLink} className="dh-footer-link">{l}</span>
            ))}
            <div style={{ marginTop: 20 }}>
              <div style={S.footerColTitle}>EMAIL</div>
              <span style={{ fontSize: 13, color: "#666" }}>info@dentalhappy.co</span>
            </div>
          </div>
        </div>
        <div style={S.footerBottom}>
          <span>Copyright © 2025 Dental Happy. All rights reserved.</span>
          <span>Made with ❤️</span>
        </div>
      </footer>

      <div style={S.bigFooter}>DENTAL HAPPY</div>

      {/* ── MODALS ── */}
      {notification && (
        <div style={S.ticketOverlay}>
          <div style={{ width: 420, background: "#fff", borderRadius: 28, padding: 32, boxShadow: "0 25px 60px rgba(0,0,0,0.18)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 58, height: 58, borderRadius: "50%", background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#111" }} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: "#111" }}>Incomplete Form</h2>
                <p style={{ marginTop: 6, color: "#666", fontSize: 15 }}>Please complete all required fields</p>
              </div>
            </div>
            <div style={{ background: "#f8fafc", borderRadius: 18, padding: 20, marginBottom: 28, color: "#444", lineHeight: 1.6, fontSize: 15 }}>{notification}</div>
            <button style={{ width: "100%", background: "#111", color: "#fff", border: "none", padding: "16px", borderRadius: 18, fontWeight: 700, fontSize: 15, cursor: "pointer" }}
              onClick={() => setNotification(null)}>Got it</button>
          </div>
        </div>
      )}

      {selectedService && (
        <div style={S.ticketOverlay}>
          <div style={S.serviceModal}>
            <img src={serviceDetails[selectedService]?.image} alt="" style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 24, marginBottom: 25 }} />
            <h2 style={S.serviceTitle}>{selectedService}</h2>
            <p style={S.serviceDesc}>{serviceDetails[selectedService]?.description}</p>
            <div style={S.serviceBox}>
              <h4>Facilities</h4>
              {serviceDetails[selectedService]?.facilities.map((f) => <p key={f}>• {f}</p>)}
            </div>
            <div style={S.serviceMeta}>
              <span>Duration: {serviceDetails[selectedService]?.duration}</span>
              <span>Start From: {serviceDetails[selectedService]?.price}</span>
            </div>
            <div style={S.ticketButtons}>
              <button style={S.printBtn} onClick={() => { setSelectedService(null); document.getElementById("book-online")?.scrollIntoView({ behavior: "smooth" }); }}>Book Appointment</button>
              <button style={S.closeBtn} onClick={() => setSelectedService(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {ticket && (
        <div style={S.ticketOverlay}>
          <div style={S.ticketCard}>
            <div style={S.ticketHeader}>
              <div>
                <h2 style={S.clinicName}>Dental Happy Clinic</h2>
                <p style={S.clinicContact}>WA: 0812-3456-7890</p>
              </div>
              <div style={S.logoCircle}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#16a34a" }} />
              </div>
            </div>
            <div style={S.ticketSuccess}>Appointment Confirmed</div>
            <div style={S.queueSection}>
              <div style={S.queueLabel}>QUEUE NUMBER</div>
              <div style={S.queueNumber}>{ticket.queue}</div>
            </div>
            <div style={S.ticketInfoBox}>
              {[["Patient", ticket.patient], ["Date", ticket.date], ["Time", `${ticket.time} WIB`], ["Dentist", ticket.dentist], ["Treatment", "Dental Consultation"]].map(([k, v]) => (
                <div key={k} style={S.ticketRow}><span>{k}</span><strong>{v}</strong></div>
              ))}
            </div>
            <div style={S.qrSection}>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${ticket.queue}`} alt="QR" style={S.qrImage} />
              <p style={S.qrText}>Show this QR code at reception</p>
            </div>
            <div style={S.ticketButtons}>
              <button style={S.printBtn} onClick={() => window.print()}>🖨 Print Ticket</button>
              <button style={S.closeBtn} onClick={() => setTicket(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}