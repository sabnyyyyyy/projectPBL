import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    height: 64,
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
    minHeight: "92vh",
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
    fontSize: "clamp(40px, 5.5vw, 72px)",
    fontWeight: 900,
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
    fontSize: 28,
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
    borderRadius: 24,
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
    fontWeight: 900,
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
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginTop: 40,
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
    height: 220,
    background: "linear-gradient(180deg, #e9faf3 0%, #c5ebd8 100%)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    fontSize: 72,
    paddingBottom: 4,
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
    gap: 14,
    maxWidth: 420,
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    border: "1.5px solid #e8e8e8",
    borderRadius: 10,
    fontSize: 14,
    outline: "none",
    transition: "border-color .2s",
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: "#fff",
  },
  inputRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  mapPlaceholder: {
    width: "100%",
    height: 340,
    borderRadius: 20,
    background: "linear-gradient(135deg, #edf5f0 0%, #d5ece1 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    fontSize: 48,
  },
  mapAddress: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    fontWeight: 600,
  },

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
};

// ─── DATA ───────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    title: "Basic Dental Care",
    icon: "🦷",
    subs: ["Scaling", "Tambal Gigi", "Cabut Gigi"],
    featured: true,
  },
  {
    title: "Aesthetic Care",
    icon: "✨",
    subs: ["Dental Whitening", "Veneer"],
    featured: true,
  },
  { title: "Orthodonti", icon: "📐", subs: [] },
  { title: "Prosthodonti", icon: "🔬", subs: [] },
  { title: "Dental Implan", icon: "🔩", subs: [] },
  { title: "Pedodonti", icon: "👶", subs: [] },
  { title: "Endodonti", icon: "💉", subs: [] },
  { title: "Minor Surgery", icon: "🩺", subs: [] },
];

const DOCTORS = [
  { name: "Dr. Olivia Lim, M.Ort.", role: "Orthodontist", emoji: "👩‍⚕️" },
  { name: "Dr. Ryan Chen, Sp.KG", role: "General Dentist", emoji: "👨‍⚕️" },
  { name: "Dr. Kevin Park, Sp.BM", role: "Oral Surgeon", emoji: "👨‍⚕️" },
  { name: "Dr. Sophia Mills, Sp.Pros", role: "Prosthodontist", emoji: "👩‍⚕️" },
];

// ─── KEYFRAMES injected once ─────────────────────────────────────────────────
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
    .dh-input:focus { border-color: #1db469 !important; }
    .dh-footer-link:hover { color: #1db469 !important; }
  `;
  document.head.appendChild(style);
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    injectKeyframes();
  }, []);

  const handleBook = () => {
    if (!formData.name || !formData.email) {
      alert("Mohon isi nama dan email terlebih dahulu.");
      return;
    }
    navigate("/register");
  };

  return (
    <div style={S.root}>
      {/* ── NAV ── */}
      <nav style={S.nav}>
        <span style={S.navLogo}>😁 Happy</span>
        <ul style={S.navLinks}>
          {["Home", "About", "Our Services", "Our Clinics", "Location"].map(
            (l) => (
              <li
                key={l}
                style={S.navLink}
                className="dh-nav-link"
                onClick={() => {
                  const id = l.toLowerCase().replace(/\s+/g, "-");
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {l}
              </li>
            )
          )}
        </ul>
        <button
          style={S.navBtn}
          className="dh-btn-primary"
          onClick={() => navigate("/register")}
        >
          📅 Book Online
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={S.hero}>
        {/* Left */}
        <div className="dh-fade" style={{ animationDelay: "0s" }}>
          <div style={S.heroBadge}>
            <span style={S.dot} /> We're Open Clinic · 8 AM – 5 PM
          </div>
          <h1 style={S.heroTitle}>
            Exceptional
            <br />
            <span style={S.heroAccent}>Dental</span> Care
          </h1>
          <p style={S.heroSub}>
            With our team of experienced dentists and state-of-the-art
            technology, we deliver comprehensive treatments in a comfortable and
            welcoming environment.
          </p>
          <div style={S.heroBtns}>
            <button
              style={S.btnPrimary}
              className="dh-btn-primary"
              onClick={() =>
                document
                  .getElementById("book-online")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book Now →
            </button>
            <button
              style={S.btnSecondary}
              className="dh-btn-secondary"
              onClick={() =>
                document
                  .getElementById("our-services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Our Services
            </button>
          </div>
          <div style={S.heroStats}>
            <div>
              <div style={S.statNum}>13+</div>
              <div style={S.statLabel}>Range of Services</div>
            </div>
            <div>
              <div style={S.statNum}>852+</div>
              <div style={S.statLabel}>Patients Treated</div>
            </div>
            <div>
              <div style={S.statNum}>8+</div>
              <div style={S.statLabel}>Expert Dentists</div>
            </div>
          </div>
        </div>

        {/* Right — hero image placeholder */}
        <div
          style={S.heroImgWrap}
          className="dh-fade"
          style={{ animationDelay: "0.2s" }}
        >
          <div style={S.heroImgPlaceholder}>
            🦷
            {/* Float cards */}
            <div
              style={{
                ...S.floatCard,
                bottom: 32,
                left: -20,
                animationDelay: "0.4s",
              }}
            >
              ✅ &nbsp; Next slot: <strong>Today 2 PM</strong>
            </div>
            <div
              style={{
                ...S.floatCard,
                top: 32,
                right: -16,
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              <span style={{ color: "#1db469", fontSize: 11 }}>
                ★★★★★ 4.9
              </span>
              <span>1,200+ Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={S.about}>
        <div>
          <p style={S.sectionTag}>Our Mission</p>
          <p style={S.missionText}>
            Help you achieve a{" "}
            <span style={S.heroAccent}>healthy, confident smile</span> that
            lasts a lifetime
          </p>
          <div style={S.aboutFeatures}>
            {["Skilled Dentists", "Comfortable Environment", "Latest Tech"].map(
              (f) => (
                <div key={f} style={S.featureItem}>
                  <span style={S.featureArrow}>↗</span>
                  <span style={S.featureLabel}>{f}</span>
                </div>
              )
            )}
          </div>
        </div>
        <div style={S.imgPlaceholder}>🩺</div>
      </section>

      {/* ── SERVICES ── */}
      <section id="our-services" style={S.services}>
        <p style={S.sectionTag}>What We Offer</p>
        <h2 style={S.sectionTitle}>Our Service</h2>
        <div style={S.servicesGrid}>
          {SERVICES.map((sv) => (
            <div
              key={sv.title}
              style={{
                ...S.serviceCard,
                gridColumn: sv.featured ? "span 1" : "span 1",
                background: sv.featured ? "#fff" : "#fafafa",
              }}
              className="dh-service-card"
              onClick={() => navigate("/register")}
            >
              <span style={{ fontSize: 28 }}>{sv.icon}</span>
              <div style={S.serviceCardTitle}>{sv.title}</div>
              {sv.subs.length > 0 && (
                <div style={S.serviceCardSubs}>
                  {sv.subs.map((s) => (
                    <div key={s}>• {s}</div>
                  ))}
                </div>
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
            <button style={S.navCircle} className="dh-nav-circle">
              ←
            </button>
            <button style={S.navCircle} className="dh-nav-circle">
              →
            </button>
          </div>
        </div>
        <div style={S.doctorsGrid}>
          {DOCTORS.map((d) => (
            <div
              key={d.name}
              style={S.doctorCard}
              className="dh-doctor-card"
              onClick={() => navigate("/register")}
            >
              <div style={S.doctorImgWrap}>{d.emoji}</div>
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
          <h2 style={{ ...S.sectionTitle, marginBottom: 8 }}>
            Book Online{" "}
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#1db469",
                marginLeft: 4,
              }}
            />
            Now.
          </h2>
          <p style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>
            Pick your dentist, choose a time, and we'll confirm instantly.
          </p>
          <div style={S.bookingForm}>
            <input
              style={S.input}
              className="dh-input"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              style={S.input}
              className="dh-input"
              placeholder="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <div style={S.inputRow}>
              <input
                style={S.input}
                className="dh-input"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <input
                style={S.input}
                className="dh-input"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
            </div>
            <button
              style={{ ...S.btnPrimary, padding: "15px 32px", fontSize: 15 }}
              className="dh-btn-primary"
              onClick={handleBook}
            >
              Book Now →
            </button>
          </div>
        </div>

        {/* Map placeholder */}
        <div>
          <div style={S.mapPlaceholder}>
            🗺️
            <div style={S.mapAddress}>
              <strong>OUR LOCATION</strong>
              <br />
              Jl. Soekarno Hatta No.1
              <br />
              Malang, Jawa Timur 65141
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={S.marqueeWrap}>
        <div style={S.marqueeInner}>
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <span key={i}>
                Confident Smiles ✦ &nbsp; Dental Harmony ✦ &nbsp; Healthy You ✦
                &nbsp;
              </span>
            ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer id="location">
        <div style={S.footer}>
          {/* Brand */}
          <div>
            <div style={S.footerBrand}>😁 Happy</div>
            <div style={S.footerSub}>
              We are dedicated to providing exceptional dental care with a focus
              on patient comfort and satisfaction.
            </div>
            <div style={S.footerHours}>
              <strong>CLINIC HOURS</strong>
              <br />
              Monday–Friday: 8:00 AM – 3:00 PM
              <br />
              Saturday: 8:00 AM – 1:00 PM
              <br />
              Sunday: Closed
            </div>
          </div>
          {/* Col 2 */}
          <div>
            <div style={S.footerColTitle}>ABOUT US</div>
            {["Our Services", "Our Clinics", "Privacy Policy", "Dentists"].map(
              (l) => (
                <span
                  key={l}
                  style={S.footerLink}
                  className="dh-footer-link"
                  onClick={() => navigate("/register")}
                >
                  {l}
                </span>
              )
            )}
          </div>
          {/* Col 3 */}
          <div>
            <div style={S.footerColTitle}>LOCATION</div>
            {["Career", "Privacy Policy", "Terms of Service"].map((l) => (
              <span key={l} style={S.footerLink} className="dh-footer-link">
                {l}
              </span>
            ))}
            <div style={{ marginTop: 20 }}>
              <div style={S.footerColTitle}>PHONE NUMBER</div>
              <span style={{ fontSize: 13, color: "#666" }}>(808) 555-0111</span>
            </div>
          </div>
          {/* Col 4 */}
          <div>
            <div style={S.footerColTitle}>SOCIALS</div>
            {["Instagram", "Twitter", "Threads", "TikTok"].map((l) => (
              <span key={l} style={S.footerLink} className="dh-footer-link">
                {l}
              </span>
            ))}
            <div style={{ marginTop: 20 }}>
              <div style={S.footerColTitle}>EMAIL</div>
              <span style={{ fontSize: 13, color: "#666" }}>
                info@dentalhappy.co
              </span>
            </div>
          </div>
        </div>
        <div style={S.footerBottom}>
          <span>Copyright © 2025 Dental Happy. All rights reserved.</span>
          <span>Made with ❤️</span>
        </div>
      </footer>

      {/* ── BIG FOOTER TEXT ── */}
      <div style={S.bigFooter}>DENTAL HAPPY</div>
    </div>
  );
}