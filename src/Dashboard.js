import { useState, useEffect } from "react";

const COLORS = {
  primary: "#2B3EAA",
  primaryDark: "#1e2d7d",
  accent: "#4F6FFF",
  light: "#EEF2FF",
  lightest: "#F5F7FF",
  white: "#FFFFFF",
  text: "#1a1a2e",
  textLight: "#6b7280",
  border: "#e5e7eb",
};

const NAV_LINKS = ["Home", "About", "Services", "Doctors", "Blog", "Contact"];

const SERVICES = [
  {
    icon: "🦷",
    title: "General Dental Care",
    desc: "General dental care. We are excited to meet you and provide the best dental care for your family.",
    highlight: true,
  },
  {
    icon: "🔩",
    title: "Dental Implants",
    desc: "General dental care. We are excited to meet you and provide the best dental care for your family.",
    highlight: false,
  },
  {
    icon: "✨",
    title: "Cosmetic Dentistry",
    desc: "General dental care. We are excited to meet you and provide the best dental care for your family.",
    highlight: false,
  },
  {
    icon: "⚡",
    title: "Teeth Whitening",
    desc: "General dental care. We are excited to meet you and provide the best dental care for your family.",
    highlight: false,
  },
];

const STATS = [
  { value: "900+", label: "Successful Surgeries", sub: "Highly Skilled" },
  { value: "45000+", label: "Happy Customers", sub: "Highly Performance" },
  { value: "99.7%", label: "Positive Feedback", sub: "Customers Approved" },
];

const TESTIMONIALS = [
  {
    name: "Naufal Hidayat",
    role: "Student at Telkom University",
    text: "Dental Care is an website and mobile app for you to feel better or get medical help. We offer you a 24/7 doctor service with no appointment needed.",
    avatar: "NH",
  },
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    text: "The team at this dental clinic is absolutely amazing. They made me feel comfortable throughout my entire treatment. Highly recommend!",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    text: "Best dental experience I've ever had. The technology they use is state-of-the-art and the staff is incredibly professional and friendly.",
    avatar: "MC",
  },
];

export default function DentalWebsite() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "03/11/2024",
    location: "Stockholm",
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [animStats, setAnimStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimStats(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleEnquiry = (e) => {
    e.preventDefault();
    alert(
      `Enquiry sent!\nName: ${form.name}\nEmail: ${form.email}\nDate: ${form.date}\nLocation: ${form.location}`
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 3000);
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  const prevTestimonial = () =>
    setTestimonialIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextTestimonial = () =>
    setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[testimonialIndex];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: COLORS.lightest, minHeight: "100vh", color: COLORS.text }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: COLORS.white,
        boxShadow: "0 2px 12px rgba(43,62,170,0.08)",
        padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 28 }}>🦷</span>
          <span style={{ fontWeight: 800, fontSize: 20, color: COLORS.primary }}>DentalCare</span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => setActiveNav(link)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontWeight: activeNav === link ? 700 : 500,
                color: activeNav === link ? COLORS.primary : COLORS.textLight,
                fontSize: 15,
                borderBottom: activeNav === link ? `2px solid ${COLORS.primary}` : "2px solid transparent",
                paddingBottom: 2,
                transition: "all 0.2s",
              }}
            >{link}</button>
          ))}
        </div>
        <button
          onClick={() => alert("Contact Us clicked!")}
          style={{
            background: COLORS.primary, color: "#fff",
            border: "none", borderRadius: 24,
            padding: "10px 22px", fontWeight: 700, fontSize: 14,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 4px 12px rgba(43,62,170,0.25)",
            transition: "background 0.2s",
          }}
          onMouseOver={e => e.currentTarget.style.background = COLORS.primaryDark}
          onMouseOut={e => e.currentTarget.style.background = COLORS.primary}
        >
          Contact Us <span style={{
            background: "rgba(255,255,255,0.25)", borderRadius: "50%",
            width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
          }}>↗</span>
        </button>
      </nav>

      {/* ── HERO / ENQUIRY FORM ── */}
      <section style={{
        background: `linear-gradient(135deg, ${COLORS.light} 0%, #dce4ff 100%)`,
        padding: "60px 5% 40px",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 300, height: 300,
          background: "rgba(43,62,170,0.06)", borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: -40, left: -40,
          width: 200, height: 200,
          background: "rgba(79,111,255,0.08)", borderRadius: "50%",
        }} />
        <p style={{ color: COLORS.primary, fontWeight: 600, marginBottom: 8, letterSpacing: 2, fontSize: 13, textTransform: "uppercase" }}>Welcome to</p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, marginBottom: 16, lineHeight: 1.15 }}>
          Your <span style={{ color: COLORS.primary }}>Smile</span> is Our<br />
          Top Priority
        </h1>
        <p style={{ color: COLORS.textLight, maxWidth: 520, margin: "0 auto 32px", fontSize: 16, lineHeight: 1.6 }}>
          We believe in using the latest technology and techniques to ensure the best outcomes for our patients.
        </p>

        {/* Enquiry Form */}
        <form
          onSubmit={handleEnquiry}
          style={{
            background: COLORS.white,
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(43,62,170,0.12)",
            padding: "20px 24px",
            display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap",
            maxWidth: 780, margin: "0 auto",
          }}
        >
          {[
            { label: "Name", key: "name", placeholder: "Your Name" },
            { label: "Email", key: "email", placeholder: "Your Email" },
            { label: "Date", key: "date", placeholder: "03/11/2024" },
            { label: "Location", key: "location", placeholder: "Stockholm" },
          ].map(({ label, key, placeholder }) => (
            <div key={key} style={{ flex: "1 1 140px", textAlign: "left" }}>
              <label style={{ fontSize: 11, color: COLORS.textLight, fontWeight: 600, display: "block", marginBottom: 4 }}>{label}</label>
              <input
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                style={{
                  width: "100%", border: `1.5px solid ${COLORS.border}`,
                  borderRadius: 8, padding: "9px 12px", fontSize: 14,
                  outline: "none", color: COLORS.text, background: "#fafafa",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}
          <button
            type="submit"
            style={{
              background: COLORS.primary, color: "#fff",
              border: "none", borderRadius: 10,
              padding: "12px 24px", fontWeight: 700, fontSize: 14,
              cursor: "pointer", whiteSpace: "nowrap", marginTop: 16,
              boxShadow: "0 4px 12px rgba(43,62,170,0.25)",
              transition: "background 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.background = COLORS.primaryDark}
            onMouseOut={e => e.currentTarget.style.background = COLORS.primary}
          >
            {submitted ? "✓ Sent!" : "Send Enquiry"}
          </button>
        </form>
      </section>

      {/* ── ABOUT / OUR SERVICES ── */}
      <section style={{ padding: "64px 5%", display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap", background: COLORS.white }}>
        {/* Left image placeholder */}
        <div style={{
          flex: "1 1 300px", minHeight: 320, borderRadius: 20,
          background: `linear-gradient(135deg, #c7d2fe 0%, #a5b4fc 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 80, boxShadow: "0 8px 32px rgba(43,62,170,0.12)",
          position: "relative", overflow: "hidden",
        }}>
          <span>👩‍⚕️</span>
          <div style={{
            position: "absolute", bottom: 20, right: 20,
            background: COLORS.white, borderRadius: 12, padding: "10px 16px",
            fontSize: 12, fontWeight: 700, color: COLORS.primary,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}>
            🦷 Expert Team
          </div>
        </div>

        {/* Right content */}
        <div style={{ flex: "1 1 320px" }}>
          <p style={{ color: COLORS.primary, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Our Services</p>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
            High Quality Services for You.
          </h2>
          <p style={{ color: COLORS.textLight, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
            We believe in using the latest technology and techniques to ensure the best outcomes for our patients.
          </p>
          {[
            "Experienced Team",
            "State-Of-The-Art Technology",
            "Comprehensive Services",
            "Emergency Dental Services",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{
                background: COLORS.primary, color: "#fff",
                borderRadius: "50%", width: 20, height: 20,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0,
              }}>✓</span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{item}</span>
            </div>
          ))}
          <button
            onClick={() => alert("Read More about our services!")}
            style={{
              marginTop: 24,
              background: COLORS.primary, color: "#fff",
              border: "none", borderRadius: 24,
              padding: "12px 28px", fontWeight: 700, fontSize: 14,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
              boxShadow: "0 4px 12px rgba(43,62,170,0.25)",
              transition: "background 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.background = COLORS.primaryDark}
            onMouseOut={e => e.currentTarget.style.background = COLORS.primary}
          >
            Read More <span style={{
              background: "rgba(255,255,255,0.25)", borderRadius: "50%",
              width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
            }}>↗</span>
          </button>
        </div>

        {/* Tooth icon decoration */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 120, opacity: 0.07, position: "absolute", right: "5%",
        }}>🦷</div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section style={{ padding: "48px 5% 64px", background: COLORS.lightest }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {SERVICES.map((s, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 200px",
                background: s.highlight ? COLORS.primary : COLORS.white,
                borderRadius: 16, padding: "28px 22px",
                boxShadow: s.highlight
                  ? "0 8px 32px rgba(43,62,170,0.30)"
                  : "0 4px 16px rgba(43,62,170,0.08)",
                color: s.highlight ? "#fff" : COLORS.text,
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = s.highlight
                  ? "0 16px 40px rgba(43,62,170,0.4)"
                  : "0 8px 32px rgba(43,62,170,0.15)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = s.highlight
                  ? "0 8px 32px rgba(43,62,170,0.30)"
                  : "0 4px 16px rgba(43,62,170,0.08)";
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: s.highlight ? "rgba(255,255,255,0.18)" : COLORS.light,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, marginBottom: 16,
              }}>{s.icon}</div>
              <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 10 }}>{s.title}</h3>
              <p style={{
                fontSize: 13, lineHeight: 1.6,
                color: s.highlight ? "rgba(255,255,255,0.8)" : COLORS.textLight,
                marginBottom: 20,
              }}>{s.desc}</p>
              <button
                onClick={() => alert(`Learn more about ${s.title}`)}
                style={{
                  background: s.highlight ? "rgba(255,255,255,0.18)" : COLORS.light,
                  color: s.highlight ? "#fff" : COLORS.primary,
                  border: "none", borderRadius: 20,
                  padding: "8px 18px", fontWeight: 700, fontSize: 13,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                  transition: "background 0.2s",
                }}
                onMouseOver={e => e.currentTarget.style.background = s.highlight ? "rgba(255,255,255,0.28)" : "#dce4ff"}
                onMouseOut={e => e.currentTarget.style.background = s.highlight ? "rgba(255,255,255,0.18)" : COLORS.light}
              >
                Read More ↗
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "48px 5%", background: COLORS.white, textAlign: "center" }}>
        <p style={{ color: COLORS.primary, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Our Achievement</p>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, marginBottom: 40 }}>
          Welcome to<br />The Best Dental Clinic
        </h2>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 200px", maxWidth: 260,
                background: COLORS.lightest,
                borderRadius: 16, padding: "28px 20px",
                boxShadow: "0 2px 12px rgba(43,62,170,0.06)",
                transition: "transform 0.3s",
                transform: animStats ? "translateY(0)" : "translateY(20px)",
                opacity: animStats ? 1 : 0,
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              <div style={{ fontSize: "2.2rem", fontWeight: 900, color: COLORS.primary, marginBottom: 6 }}>{stat.value}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontSize: 12, color: COLORS.textLight }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        margin: "0 5% 0", padding: "0",
        background: COLORS.primary,
        borderRadius: 24,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        overflow: "hidden", flexWrap: "wrap",
        boxShadow: "0 12px 40px rgba(43,62,170,0.3)",
      }}>
        <div style={{ padding: "48px 48px", flex: "1 1 300px" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, marginBottom: 10 }}>
            Get A Free Consultation
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, marginBottom: 20 }}>
            Give us a Call. We are here to answer your questions 24/7
          </p>
          <a
            href="tel:+466985245"
            style={{
              color: "#fff", fontWeight: 900, fontSize: "1.6rem",
              textDecoration: "none", display: "flex", alignItems: "center", gap: 10,
            }}
            onClick={e => { e.preventDefault(); alert("Calling +(46) 698-5245..."); }}
          >
            📞 +(46) 698-5245
          </a>
          <button
            onClick={() => alert("Book free consultation!")}
            style={{
              marginTop: 24,
              background: "#fff", color: COLORS.primary,
              border: "none", borderRadius: 24,
              padding: "12px 28px", fontWeight: 700, fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Book Now →
          </button>
        </div>
        <div style={{
          fontSize: 140, padding: "0 40px",
          opacity: 0.18, userSelect: "none", flexShrink: 0,
        }}>👩‍⚕️</div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "72px 5%", background: COLORS.white }}>
        <p style={{ color: COLORS.primary, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 4 }}>Testimonial</p>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, textAlign: "center", marginBottom: 48 }}>
          What our Client Say
        </h2>
        <div style={{
          display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap",
          maxWidth: 800, margin: "0 auto",
        }}>
          {/* Avatar */}
          <div style={{
            width: 180, height: 220, borderRadius: 20, flexShrink: 0,
            background: `linear-gradient(135deg, #c7d2fe 0%, #a5b4fc 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 60, boxShadow: "0 8px 32px rgba(43,62,170,0.15)",
            transition: "all 0.3s",
          }}>😊</div>

          {/* Quote */}
          <div style={{ flex: "1 1 280px" }}>
            <div style={{ fontSize: 60, color: COLORS.primary, lineHeight: 0.8, marginBottom: 16, fontFamily: "Georgia, serif" }}>"</div>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: COLORS.text, marginBottom: 20, fontStyle: "italic" }}>
              "{t.text}"
            </p>
            <div style={{ fontWeight: 800, fontSize: 15, color: COLORS.primary }}>{t.name}</div>
            <div style={{ fontSize: 13, color: COLORS.textLight }}>{t.role}</div>

            {/* Navigation */}
            <div style={{ display: "flex", gap: 10, marginTop: 24, alignItems: "center" }}>
              <button
                onClick={prevTestimonial}
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: `2px solid ${COLORS.border}`, background: "#fff",
                  cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseOver={e => { e.currentTarget.style.background = COLORS.primary; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = COLORS.primary; }}
                onMouseOut={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = COLORS.border; }}
              >‹</button>
              <button
                onClick={nextTestimonial}
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: "none", background: COLORS.primary, color: "#fff",
                  cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseOver={e => e.currentTarget.style.background = COLORS.primaryDark}
                onMouseOut={e => e.currentTarget.style.background = COLORS.primary}
              >›</button>
              <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    style={{
                      width: i === testimonialIndex ? 24 : 8,
                      height: 8, borderRadius: 4, border: "none",
                      background: i === testimonialIndex ? COLORS.primary : COLORS.border,
                      cursor: "pointer", transition: "all 0.3s", padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT / MAP ── */}
      <section style={{
        padding: "64px 5%",
        background: `linear-gradient(135deg, ${COLORS.light} 0%, #dce4ff 100%)`,
        display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap",
      }}>
        {/* Contact Form */}
        <div style={{
          flex: "1 1 300px",
          background: COLORS.white, borderRadius: 20, padding: "36px 32px",
          boxShadow: "0 8px 32px rgba(43,62,170,0.12)",
        }}>
          <p style={{ color: COLORS.primary, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Contact Us</p>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 900, marginBottom: 24 }}>
            Get Free Professional<br />Consultation
          </h2>

          {[
            { label: "Full Name", key: "name", placeholder: "Your Name", type: "text" },
            { label: "Email Address", key: "email", placeholder: "Your Email", type: "email" },
            { label: "Phone Number", key: "phone", placeholder: "+(62) 123-456-789", type: "tel" },
          ].map(({ label, key, placeholder, type }) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.textLight, display: "block", marginBottom: 6 }}>{label}</label>
              <input
                type={type}
                value={contactForm[key]}
                onChange={e => setContactForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                style={{
                  width: "100%", border: `1.5px solid ${COLORS.border}`,
                  borderRadius: 10, padding: "11px 14px", fontSize: 14,
                  outline: "none", boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.border}
              />
            </div>
          ))}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.textLight, display: "block", marginBottom: 6 }}>Message</label>
            <textarea
              value={contactForm.message}
              onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Tell us about your concern..."
              rows={4}
              style={{
                width: "100%", border: `1.5px solid ${COLORS.border}`,
                borderRadius: 10, padding: "11px 14px", fontSize: 14,
                outline: "none", resize: "vertical", boxSizing: "border-box",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = COLORS.primary}
              onBlur={e => e.target.style.borderColor = COLORS.border}
            />
          </div>
          <button
            onClick={handleContactSubmit}
            style={{
              width: "100%",
              background: COLORS.primary, color: "#fff",
              border: "none", borderRadius: 12,
              padding: "14px", fontWeight: 700, fontSize: 15,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(43,62,170,0.25)",
              transition: "background 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.background = COLORS.primaryDark}
            onMouseOut={e => e.currentTarget.style.background = COLORS.primary}
          >
            {contactSubmitted ? "✓ Message Sent!" : "Send Message →"}
          </button>

          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "📍", text: "3211 Larens, Stockholm, Sweden" },
              { icon: "📞", text: "+(46) 698-5245" },
              { icon: "✉️", text: "hello@dentalcare.com" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: COLORS.textLight }}>
                <span style={{
                  width: 36, height: 36,
                  background: COLORS.light, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0,
                }}>{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div style={{
          flex: "2 1 400px", minHeight: 420, borderRadius: 20,
          background: "linear-gradient(135deg, #b0c4de 0%, #87CEEB 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          boxShadow: "0 8px 32px rgba(43,62,170,0.12)",
        }}>
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <div style={{ fontSize: 64, marginBottom: 12 }}>🗺️</div>
            <div style={{ fontWeight: 800, fontSize: 18, color: COLORS.primary }}>Stockholm, Sweden</div>
            <div style={{ fontSize: 14, color: COLORS.textLight, marginBottom: 20 }}>3211 Larens, Stockholm</div>
            <button
              onClick={() => window.open("https://maps.google.com/?q=Stockholm,Sweden", "_blank")}
              style={{
                background: COLORS.primary, color: "#fff",
                border: "none", borderRadius: 24,
                padding: "10px 24px", fontWeight: 700, fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(43,62,170,0.25)",
              }}
            >
              View on Google Maps ↗
            </button>
          </div>
          {/* Grid overlay */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(43,62,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(43,62,170,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: COLORS.primary,
        color: "#fff",
        padding: "48px 5% 28px",
      }}>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 40 }}>
          <div style={{ flex: "2 1 240px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 28 }}>🦷</span>
              <span style={{ fontWeight: 800, fontSize: 20 }}>DentalCare</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              We believe in using the latest technology and techniques to ensure the best outcomes for our patients.
            </p>
          </div>
          {[
            { title: "Services", links: ["General Dental Care", "Dental Implants", "Cosmetic Dentistry", "Teeth Whitening"] },
            { title: "Company", links: ["About Us", "Our Team", "Blog", "Careers"] },
            { title: "Support", links: ["FAQ", "Contact Us", "Privacy Policy", "Terms of Service"] },
          ].map(({ title, links }) => (
            <div key={title} style={{ flex: "1 1 140px" }}>
              <h4 style={{ fontWeight: 800, marginBottom: 16, fontSize: 15 }}>{title}</h4>
              {links.map(link => (
                <div key={link} style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => alert(`${link} clicked!`)}
                    style={{
                      background: "none", border: "none", color: "rgba(255,255,255,0.7)",
                      fontSize: 14, cursor: "pointer", padding: 0, textAlign: "left",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={e => e.currentTarget.style.color = "#fff"}
                    onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                  >{link}</button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.15)",
          paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>© 2024 DentalCare. All rights reserved.</p>
          <div style={{ display: "flex", gap: 12 }}>
            {["Facebook", "Instagram", "Twitter", "LinkedIn"].map(social => (
              <button
                key={social}
                onClick={() => alert(`${social} clicked!`)}
                style={{
                  background: "rgba(255,255,255,0.12)", color: "#fff",
                  border: "none", borderRadius: 8, padding: "7px 14px",
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
                onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
              >{social}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}