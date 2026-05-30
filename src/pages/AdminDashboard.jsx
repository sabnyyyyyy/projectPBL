import React, { useState, useEffect } from "react";
import axios from "axios";

// ─── KEYFRAMES & GLOBAL STYLES ────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("da-styles")) return;
  const s = document.createElement("style");
  s.id = "da-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.x/dist/tabler-icons.min.css');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes spin { to { transform: rotate(360deg); } }
    .da-fade { animation: fadeUp .25s ease both; }
    .da-row:hover td { background: #f9fafb !important; }
    .da-nav:hover { background: #f3f4f6 !important; color: #111 !important; }
    .da-nav.active { background: #111 !important; color: #fff !important; }
    .da-nav.active .da-nav-icon { color: #22c55e !important; }
    .da-btn-primary:hover { opacity: .88 !important; }
    .da-btn-ghost:hover { background: #f3f4f6 !important; }
    .da-card:hover { border-color: #d1d5db !important; }
    .da-action:hover { background: #f3f4f6 !important; }
    .da-action-del:hover { background: #fee2e2 !important; color: #dc2626 !important; border-color: #fecaca !important; }
    .da-action-confirm:hover { background: #dcfce7 !important; color: #16a34a !important; border-color: #bbf7d0 !important; }
    .da-toggle:hover { opacity:.9; }
    .da-spinner { animation: spin .7s linear infinite; }
    .da-tab-btn { border-bottom: 2px solid transparent !important; }
    .da-tab-btn.active { border-bottom-color: #111 !important; color: #111 !important; font-weight: 600; }
    .da-tab-btn:hover { color: #111 !important; }
    .da-input:focus { outline: none !important; border-color: #6b7280 !important; box-shadow: 0 0 0 3px rgba(107,114,128,.12) !important; }
    .da-tr:hover { background: #f9fafb; }
    .sr-only { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0; }
  `;
  document.head.appendChild(s);
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const API = "http://127.0.0.1:8000/api";

const MOCK_REPORT = {
  monthly: [
    { month: "Feb", total: 28, confirmed: 22, revenue: 4200000 },
    { month: "Mar", total: 35, confirmed: 29, revenue: 5250000 },
    { month: "Apr", total: 31, confirmed: 25, revenue: 4650000 },
    { month: "May", total: 42, confirmed: 36, revenue: 6300000 },
    { month: "Jun", total: 38, confirmed: 31, revenue: 5700000 },
    { month: "Jul", total: 6, confirmed: 4, revenue: 900000 },
  ],
  treatments: [
    { name: "Scaling", count: 18, revenue: 2700000 },
    { name: "Braces Check", count: 12, revenue: 1800000 },
    { name: "Extraction", count: 15, revenue: 2250000 },
    { name: "Root Canal", count: 8, revenue: 2400000 },
    { name: "Crown Fitting", count: 6, revenue: 3000000 },
    { name: "Consultation", count: 21, revenue: 1050000 },
  ],
  topDentists: [
    { name: "Dr. Ryan Chen", patients: 34, revenue: 5100000 },
    { name: "Dr. Olivia Lim", patients: 28, revenue: 4200000 },
    { name: "Dr. Kevin Park", patients: 22, revenue: 5500000 },
    { name: "Dr. Sophia Mills", patients: 16, revenue: 4800000 },
  ],
};

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  // layout
  layout: { display: "flex", height: "100vh", fontFamily: "'Inter', sans-serif", background: "#f5f5f5", color: "#111", overflow: "hidden" },
  // sidebar
  sidebar: { width: 228, minWidth: 228, background: "#fff", borderRight: "1px solid #f0f0f0", display: "flex", flexDirection: "column", padding: "20px 12px", overflowY: "auto" },
  logo: { display: "flex", alignItems: "center", gap: 10, padding: "0 8px 18px", borderBottom: "1px solid #f0f0f0", marginBottom: 16 },
  logoMark: { width: 30, height: 30, borderRadius: 8, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  navLabel: { fontSize: 10, fontWeight: 500, color: "#9ca3af", letterSpacing: 1, padding: "0 10px", margin: "10px 0 4px", textTransform: "uppercase" },
  navItem: { display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#6b7280", marginBottom: 1, transition: "all .12s", userSelect: "none" },
  navSep: { height: 1, background: "#f0f0f0", margin: "12px 0" },
  // main
  main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  topbar: { height: 56, background: "#fff", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", padding: "0 24px", gap: 10, flexShrink: 0 },
  content: { flex: 1, overflowY: "auto", padding: "24px 28px" },
  // cards
  card: { background: "#fff", border: "1px solid #f0f0f0", borderRadius: 14, overflow: "hidden", marginBottom: 16 },
  cardHead: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid #f8f8f8" },
  cardTitle: { fontSize: 13, fontWeight: 600 },
  cardSub: { fontSize: 11, color: "#9ca3af", marginTop: 2 },
  // stats
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 },
  statCard: { background: "#fff", border: "1px solid #f0f0f0", borderRadius: 14, padding: "16px 18px" },
  statIcon: { width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, marginBottom: 10 },
  statNum: { fontSize: 22, fontWeight: 600, letterSpacing: -0.5 },
  statLabel: { fontSize: 11, color: "#9ca3af", marginTop: 2 },
  statTrend: { fontSize: 10, color: "#9ca3af", marginTop: 4 },
  // table
  th: { textAlign: "left", fontSize: 10, fontWeight: 500, color: "#9ca3af", letterSpacing: 0.5, padding: "9px 18px", textTransform: "uppercase", background: "#fafafa", borderBottom: "1px solid #f0f0f0" },
  td: { padding: "11px 18px", fontSize: 12, borderBottom: "1px solid #f8f8f8", verticalAlign: "middle", color: "#111" },
  // buttons
  btnPrimary: { display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: "none", background: "#111", color: "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" },
  btnGhost: { display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", color: "#555", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" },
  actionBtn: { padding: "4px 10px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", color: "#6b7280", fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" },
  // search
  searchWrap: { display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#fafafa" },
  searchInput: { border: "none", background: "transparent", fontSize: 12, outline: "none", color: "#111", fontFamily: "inherit", width: 200 },
  // avatar
  av: { width: 32, height: 32, borderRadius: "50%", background: "#f3f4f6", color: "#6b7280", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 },
  // modal
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 },
  modal: { background: "#fff", borderRadius: 18, padding: 28, width: 460, maxWidth: "100%", boxShadow: "0 20px 60px rgba(0,0,0,.16)" },
  label: { display: "block", fontSize: 10, fontWeight: 500, color: "#9ca3af", marginBottom: 5, letterSpacing: 0.4, textTransform: "uppercase" },
  input: { width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontFamily: "inherit", background: "#fafafa", color: "#111", transition: "all .15s" },
  select: { width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontFamily: "inherit", background: "#fafafa", color: "#111", cursor: "pointer", appearance: "none" },
  // tabs
  tabs: { display: "flex", padding: "0 18px", borderBottom: "1px solid #f0f0f0" },
  tab: { padding: "10px 14px", fontSize: 12, fontWeight: 500, color: "#9ca3af", cursor: "pointer", border: "none", background: "transparent", fontFamily: "inherit", borderBottom: "2px solid transparent", marginBottom: -1 },
  // settings
  settingRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #f8f8f8" },
  toggle: { width: 38, height: 22, borderRadius: 99, cursor: "pointer", position: "relative", border: "none", flexShrink: 0, transition: "background .15s" },
  toggleKnob: { position: "absolute", top: 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left .15s", boxShadow: "0 1px 3px rgba(0,0,0,.2)" },
  // badge/pill
  pill: { display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 500 },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const initials = (name = "") =>
  name.split(" ").filter(n => /[A-Za-z]/.test(n)).map(n => n[0]).slice(0, 2).join("").toUpperCase();

const formatRp = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

// ─── ATOMS ────────────────────────────────────────────────────────────────────
function Pill({ status }) {
  const map = {
    confirmed: { bg: "#dcfce7", color: "#15803d", dot: "#22c55e", label: "Confirmed" },
    pending:   { bg: "#fef9c3", color: "#a16207", dot: "#eab308", label: "Pending" },
    cancelled: { bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444", label: "Cancelled" },
    active:    { bg: "#dcfce7", color: "#15803d", dot: "#22c55e", label: "Active" },
    inactive:  { bg: "#f3f4f6", color: "#6b7280", dot: "#9ca3af", label: "Inactive" },
  };
  const s = map[status] || map.inactive;
  return (
    <span style={{ ...T.pill, background: s.bg, color: s.color }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
      {s.label}
    </span>
  );
}

function Avatar({ name, size = 32 }) {
  return (
    <div style={{ ...T.av, width: size, height: size, fontSize: size * 0.34, borderRadius: "50%" }}>
      {initials(name)}
    </div>
  );
}

function Spinner({ size = 16 }) {
  return (
    <div className="da-spinner" style={{ width: size, height: size, border: `2px solid #e5e7eb`, borderTopColor: "#374151", borderRadius: "50%" }} />
  );
}

function StatCard({ label, value, icon, iconBg, iconColor, trend }) {
  return (
    <div style={T.statCard} className="da-card">
      <div style={{ ...T.statIcon, background: iconBg, color: iconColor }}>
        <i className={`ti ${icon}`} aria-hidden="true" />
      </div>
      <div style={T.statNum}>{value}</div>
      <div style={T.statLabel}>{label}</div>
      {trend && <div style={T.statTrend}>{trend}</div>}
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button
      className="da-toggle"
      style={{ ...T.toggle, background: value ? "#111" : "#e5e7eb" }}
      onClick={() => onChange(!value)}
      role="switch"
      aria-checked={value}
    >
      <span style={{ ...T.toggleKnob, left: value ? 19 : 3 }} />
    </button>
  );
}

function SearchRow({ value, onChange, onAdd, addLabel, placeholder }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #f0f0f0" }}>
      <div style={{ ...T.searchWrap, flex: 1 }}>
        <i className="ti ti-search" aria-hidden="true" style={{ fontSize: 14, color: "#9ca3af" }} />
        <input
          style={T.searchInput}
          className="da-input"
          placeholder={placeholder || "Search..."}
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label="Search"
        />
      </div>
      {onAdd && (
        <button style={T.btnPrimary} className="da-btn-primary" onClick={onAdd}>
          <i className="ti ti-plus" aria-hidden="true" /> {addLabel || "Add"}
        </button>
      )}
    </div>
  );
}

// ─── PAGE: OVERVIEW ───────────────────────────────────────────────────────────
function Overview({ appointments, dentists, patients, setPage }) {
  const confirmed = appointments.filter(a => a.status === "confirmed").length;
  const pending   = appointments.filter(a => a.status === "pending").length;

  const stats = [
    { label: "Total appointments", value: appointments.length, icon: "ti-calendar", iconBg: "#dbeafe", iconColor: "#2563eb", trend: `↑ +5 today` },
    { label: "Dentists on staff",  value: dentists.length,     icon: "ti-stethoscope", iconBg: "#dcfce7", iconColor: "#16a34a", trend: `${dentists.filter(d=>d.is_active).length} active` },
    { label: "Total patients",     value: patients.length,     icon: "ti-users", iconBg: "#fef3c7", iconColor: "#d97706", trend: `↑ +${patients.length} registered` },
    { label: "Pending approvals",  value: pending,             icon: "ti-clock", iconBg: "#fee2e2", iconColor: "#dc2626", trend: `Needs action` },
  ];

  const bars = [
    { label: "Confirmed", val: confirmed, max: appointments.length, color: "#16a34a" },
    { label: "Pending",   val: pending,   max: appointments.length, color: "#d97706" },
    { label: "Cancelled", val: appointments.filter(a => a.status === "cancelled").length, max: appointments.length, color: "#dc2626" },
  ];

  return (
    <div className="da-fade">
      <div style={T.statsGrid}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        {/* Recent appointments */}
        <div style={T.card}>
          <div style={T.cardHead}>
            <div>
              <div style={T.cardTitle}>Recent appointments</div>
              <div style={T.cardSub}>Latest bookings</div>
            </div>
            <button style={T.btnGhost} className="da-btn-ghost" onClick={() => setPage("appointments")}>
              View all <i className="ti ti-arrow-right" aria-hidden="true" style={{ fontSize: 12 }} />
            </button>
          </div>
          {appointments.slice(0, 5).map(a => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderBottom: "1px solid #f8f8f8" }}>
              <Avatar name={a.full_name} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{a.full_name}</div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>{a.dentist}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <Pill status={a.status} />
                <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 3 }}>{a.appointment_date}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Breakdown chart */}
          <div style={T.card}>
            <div style={T.cardHead}>
              <div style={T.cardTitle}>Appointment breakdown</div>
            </div>
            <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
              {bars.map(b => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, color: "#9ca3af", width: 62, textAlign: "right", flexShrink: 0 }}>{b.label}</span>
                  <div style={{ flex: 1, height: 7, background: "#f3f4f6", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${b.max ? Math.round(b.val / b.max * 100) : 0}%`, background: b.color, borderRadius: 99, transition: "width .4s" }} />
                  </div>
                  <span style={{ fontSize: 11, color: "#9ca3af", width: 18, flexShrink: 0 }}>{b.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div style={T.card}>
            <div style={T.cardHead}><div style={T.cardTitle}>Quick actions</div></div>
            <div style={{ padding: "12px" }}>
              {[
                { label: "View patient records", icon: "ti-users", page: "patients" },
                { label: "View appointments",   icon: "ti-calendar", page: "appointments" },
                { label: "View reports",        icon: "ti-chart-bar", page: "reports" },
                { label: "System settings",     icon: "ti-settings", page: "settings" },
              ].map(q => (
                <button
                  key={q.label}
                  style={{ ...T.btnGhost, width: "100%", justifyContent: "flex-start", padding: "9px 12px", marginBottom: 6 }}
                  className="da-btn-ghost"
                  onClick={() => setPage(q.page)}
                >
                  <i className={`ti ${q.icon}`} aria-hidden="true" style={{ fontSize: 15, color: "#9ca3af" }} />
                  <span style={{ fontWeight: 500 }}>{q.label}</span>
                  <i className="ti ti-chevron-right" aria-hidden="true" style={{ marginLeft: "auto", fontSize: 12, color: "#d1d5db" }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: DENTIST MANAGEMENT ─────────────────────────────────────────────────
function DentistManagement({ dentists, loading, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const filtered = dentists.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email?.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="da-fade">
      <div style={T.statsGrid}>
        {[
          { label: "Total dentists",  value: dentists.length, icon: "ti-stethoscope", iconBg: "#dcfce7", iconColor: "#16a34a" },
          { label: "Active",          value: dentists.filter(d => d.is_active).length, icon: "ti-circle-check", iconBg: "#dbeafe", iconColor: "#2563eb" },
          { label: "Inactive",        value: dentists.filter(d => !d.is_active).length, icon: "ti-circle-x", iconBg: "#fee2e2", iconColor: "#dc2626" },
          { label: "Patients served", value: "852+", icon: "ti-users", iconBg: "#fef3c7", iconColor: "#d97706", trend: "↑ +34 this week" },
        ].map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div style={T.card}>
        <div style={T.cardHead}>
          <div>
            <div style={T.cardTitle}>Dentist directory</div>
            <div style={T.cardSub}>{dentists.length} registered dentists</div>
          </div>
        </div>
        <SearchRow value={search} onChange={setSearch} onAdd={onAdd} addLabel="Add dentist" placeholder="Search by name, email, or specialty..." />
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 40 }}><Spinner size={24} /></div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#9ca3af" }}>
            <i className="ti ti-tooth" aria-hidden="true" style={{ fontSize: 30, display: "block", marginBottom: 8 }} />
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, color: "#6b7280" }}>No dentists found</div>
            <div style={{ fontSize: 12 }}>Adjust your search or add a new dentist.</div>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{["Dentist", "Email", "Specialty", "Phone", "Status", "Actions"].map(h => <th key={h} style={T.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} className="da-row" style={{ background: "#fff" }}>
                  <td style={T.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Avatar name={d.name} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 12 }}>{d.name}</div>
                        <div style={{ fontSize: 10, color: "#9ca3af" }}>ID #{d.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ ...T.td, color: "#6b7280" }}>{d.email || "—"}</td>
                  <td style={T.td}>
                    <span style={{ ...T.pill, background: "#dcfce7", color: "#15803d" }}>{d.specialization || "General"}</span>
                  </td>
                  <td style={{ ...T.td, color: "#6b7280" }}>{d.phone || "—"}</td>
                  <td style={T.td}><Pill status={d.is_active ? "active" : "inactive"} /></td>
                  <td style={T.td}>
                    <div style={{ display: "flex", gap: 5 }}>
                      <button style={T.actionBtn} className="da-action" onClick={() => onEdit(d)}>Edit</button>
                      <button style={{ ...T.actionBtn, color: "#dc2626", borderColor: "#fecaca" }} className="da-action-del" onClick={() => onDelete(d)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── PAGE: APPOINTMENTS ───────────────────────────────────────────────────────
function Appointments({ appointments, onConfirm }) {
  const [tab, setTab] = useState("all");
  const tabs = ["all", "confirmed", "pending", "cancelled"];
  const filtered = tab === "all" ? appointments : appointments.filter(a => a.status === tab);

  return (
    <div className="da-fade">
      <div style={T.statsGrid}>
        {[
          { label: "Total", value: appointments.length, icon: "ti-calendar", iconBg: "#dbeafe", iconColor: "#2563eb" },
          { label: "Confirmed", value: appointments.filter(a => a.status === "confirmed").length, icon: "ti-circle-check", iconBg: "#dcfce7", iconColor: "#16a34a" },
          { label: "Pending",   value: appointments.filter(a => a.status === "pending").length,   icon: "ti-clock", iconBg: "#fef3c7", iconColor: "#d97706" },
          { label: "Cancelled", value: appointments.filter(a => a.status === "cancelled").length, icon: "ti-x", iconBg: "#fee2e2", iconColor: "#dc2626" },
        ].map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div style={T.card}>
        <div style={T.cardHead}>
          <div>
            <div style={T.cardTitle}>Appointment list</div>
            <div style={T.cardSub}>Manage all patient bookings</div>
          </div>
        </div>
        <div style={T.tabs}>
          {tabs.map(t => (
            <button
              key={t}
              style={T.tab}
              className={`da-tab-btn ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
              <span style={{ marginLeft: 5, fontSize: 10, background: "#f3f4f6", padding: "1px 6px", borderRadius: 99, color: "#9ca3af" }}>
                {t === "all" ? appointments.length : appointments.filter(a => a.status === t).length}
              </span>
            </button>
          ))}
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Queue", "Patient", "Dentist", "Treatment", "Date & time", "Status", "Actions"].map(h => <th key={h} style={T.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="da-row" style={{ background: "#fff" }}>
                <td style={T.td}><span style={{ fontWeight: 600, color: "#6b7280", fontSize: 11 }}>A-{String(a.id).padStart(3, "0")}</span></td>
                <td style={T.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar name={a.full_name} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 12 }}>{a.full_name}</div>
                      <div style={{ fontSize: 10, color: "#9ca3af" }}>{a.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ ...T.td, color: "#6b7280" }}>{a.dentist}</td>
                <td style={T.td}><span style={{ ...T.pill, background: "#f3f4f6", color: "#374151" }}>{a.treatment}</span></td>
                <td style={T.td}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{a.appointment_date}</div>
                  <div style={{ fontSize: 10, color: "#9ca3af" }}>{a.appointment_time} WIB</div>
                </td>
                <td style={T.td}><Pill status={a.status} /></td>
                <td style={T.td}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button style={T.actionBtn} className="da-action">View</button>
                    {a.status === "pending" && (
                      <button
                        style={{ ...T.actionBtn, color: "#16a34a", borderColor: "#bbf7d0" }}
                        className="da-action-confirm"
                        onClick={() => onConfirm(a.id)}
                      >Confirm</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PAGE: PATIENT RECORDS ────────────────────────────────────────────────────
function PatientRecords({ patients, onAdd, onView }) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = patients
    .filter(p => tab === "all" || p.status === tab)
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.dentist.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="da-fade">
      <div style={T.statsGrid}>
        {[
          { label: "Total patients",  value: patients.length, icon: "ti-users", iconBg: "#dbeafe", iconColor: "#2563eb" },
          { label: "Active patients", value: patients.filter(p => p.status === "active").length, icon: "ti-user-check", iconBg: "#dcfce7", iconColor: "#16a34a" },
          { label: "Total visits",    value: patients.reduce((s, p) => s + p.visits, 0), icon: "ti-calendar-check", iconBg: "#fef3c7", iconColor: "#d97706" },
          { label: "Avg visits",      value: (patients.reduce((s, p) => s + p.visits, 0) / (patients.length || 1)).toFixed(1), icon: "ti-chart-line", iconBg: "#f3f0ff", iconColor: "#7c3aed" },
        ].map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div style={T.card}>
        <div style={T.cardHead}>
          <div>
            <div style={T.cardTitle}>Patient records</div>
            <div style={T.cardSub}>{patients.length} registered patients</div>
          </div>
        </div>
        <div style={T.tabs}>
          {["all", "active", "inactive"].map(t => (
            <button
              key={t}
              style={T.tab}
              className={`da-tab-btn ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
              <span style={{ marginLeft: 5, fontSize: 10, background: "#f3f4f6", padding: "1px 6px", borderRadius: 99, color: "#9ca3af" }}>
                {t === "all" ? patients.length : patients.filter(p => p.status === t).length}
              </span>
            </button>
          ))}
        </div>
        <SearchRow value={search} onChange={setSearch} onAdd={onAdd} addLabel="Add patient" placeholder="Search by name, email, or dentist..." />
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#9ca3af" }}>
            <i className="ti ti-users" aria-hidden="true" style={{ fontSize: 30, display: "block", marginBottom: 8 }} />
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, color: "#6b7280" }}>No patients found</div>
            <div style={{ fontSize: 12 }}>Try a different search term.</div>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{["Patient", "Contact", "Dentist", "Last visit", "Visits", "Status", "Actions"].map(h => <th key={h} style={T.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="da-row" style={{ background: "#fff" }}>
                  <td style={T.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Avatar name={p.name} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 12 }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: "#9ca3af" }}>{p.gender} · {p.dob}</div>
                      </div>
                    </div>
                  </td>
                  <td style={T.td}>
                    <div style={{ fontSize: 12 }}>{p.email}</div>
                    <div style={{ fontSize: 10, color: "#9ca3af" }}>{p.phone}</div>
                  </td>
                  <td style={{ ...T.td, color: "#6b7280", fontSize: 12 }}>{p.dentist}</td>
                  <td style={{ ...T.td, fontSize: 12 }}>{p.last_visit}</td>
                  <td style={T.td}>
                    <span style={{ ...T.pill, background: "#f3f4f6", color: "#374151" }}>
                      <i className="ti ti-calendar" aria-hidden="true" style={{ fontSize: 10 }} /> {p.visits}x
                    </span>
                  </td>
                  <td style={T.td}><Pill status={p.status} /></td>
                  <td style={T.td}>
                    <div style={{ display: "flex", gap: 5 }}>
                      <button style={T.actionBtn} className="da-action" onClick={() => onView(p)}>View</button>
                      <button style={T.actionBtn} className="da-action">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── PAGE: REPORTS ────────────────────────────────────────────────────────────
function Reports({ report }) {
  const maxRevenue = Math.max(...report.monthly.map(m => m.revenue));
  const maxTotal   = Math.max(...report.monthly.map(m => m.total));
  const totalRevenue = report.monthly.reduce((s, m) => s + m.revenue, 0);
  const totalAppts   = report.monthly.reduce((s, m) => s + m.total, 0);
  const totalConfirmed = report.monthly.reduce((s, m) => s + m.confirmed, 0);

  return (
    <div className="da-fade">
      <div style={T.statsGrid}>
        {[
          { label: "Total revenue (YTD)", value: formatRp(totalRevenue), icon: "ti-currency-dollar", iconBg: "#dcfce7", iconColor: "#16a34a" },
          { label: "Total appointments",  value: totalAppts, icon: "ti-calendar", iconBg: "#dbeafe", iconColor: "#2563eb" },
          { label: "Confirmed rate",      value: `${Math.round(totalConfirmed / totalAppts * 100)}%`, icon: "ti-chart-pie", iconBg: "#fef3c7", iconColor: "#d97706" },
          { label: "Top treatment",       value: "Consultation", icon: "ti-stethoscope", iconBg: "#f3f0ff", iconColor: "#7c3aed" },
        ].map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Monthly appointments bar chart */}
        <div style={T.card}>
          <div style={T.cardHead}>
            <div style={T.cardTitle}>Monthly appointments</div>
          </div>
          <div style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
              {report.monthly.map(m => (
                <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 9, color: "#9ca3af" }}>{m.total}</span>
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, justifyContent: "flex-end", height: 90 }}>
                    <div style={{ background: "#2563eb", borderRadius: "3px 3px 0 0", height: `${Math.round(m.confirmed / maxTotal * 90)}px`, opacity: .85 }} />
                    <div style={{ background: "#f3f4f6", height: `${Math.round((m.total - m.confirmed) / maxTotal * 90)}px` }} />
                  </div>
                  <span style={{ fontSize: 10, color: "#9ca3af" }}>{m.month}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
              <span style={{ fontSize: 10, color: "#9ca3af", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 10, height: 10, background: "#2563eb", borderRadius: 2, display: "inline-block", opacity: .85 }} /> Confirmed
              </span>
              <span style={{ fontSize: 10, color: "#9ca3af", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 10, height: 10, background: "#f3f4f6", borderRadius: 2, display: "inline-block", border: "1px solid #e5e7eb" }} /> Other
              </span>
            </div>
          </div>
        </div>

        {/* Revenue trend */}
        <div style={T.card}>
          <div style={T.cardHead}>
            <div style={T.cardTitle}>Monthly revenue</div>
          </div>
          <div style={{ padding: "16px 18px" }}>
            {report.monthly.map(m => (
              <div key={m.month} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 10, color: "#9ca3af", width: 28, flexShrink: 0 }}>{m.month}</span>
                <div style={{ flex: 1, height: 7, background: "#f3f4f6", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.round(m.revenue / maxRevenue * 100)}%`, background: "#16a34a", borderRadius: 99 }} />
                </div>
                <span style={{ fontSize: 10, color: "#6b7280", width: 80, textAlign: "right", flexShrink: 0 }}>{formatRp(m.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Treatment breakdown */}
        <div style={T.card}>
          <div style={T.cardHead}>
            <div style={T.cardTitle}>Treatment breakdown</div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{["Treatment", "Count", "Revenue"].map(h => <th key={h} style={T.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {report.treatments.map(t => (
                <tr key={t.name} className="da-row" style={{ background: "#fff" }}>
                  <td style={T.td}><span style={{ fontWeight: 500, fontSize: 12 }}>{t.name}</span></td>
                  <td style={T.td}>
                    <span style={{ ...T.pill, background: "#f3f4f6", color: "#374151" }}>{t.count}x</span>
                  </td>
                  <td style={{ ...T.td, fontSize: 12, color: "#16a34a", fontWeight: 500 }}>{formatRp(t.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top dentists */}
        <div style={T.card}>
          <div style={T.cardHead}>
            <div style={T.cardTitle}>Top dentists by revenue</div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{["Dentist", "Patients", "Revenue"].map(h => <th key={h} style={T.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {report.topDentists.sort((a, b) => b.revenue - a.revenue).map((d, i) => (
                <tr key={d.name} className="da-row" style={{ background: "#fff" }}>
                  <td style={T.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Avatar name={d.name} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 12 }}>{d.name}</div>
                        <div style={{ fontSize: 10, color: "#9ca3af" }}>#{i + 1} this period</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ ...T.td, fontSize: 12 }}>{d.patients}</td>
                  <td style={{ ...T.td, fontSize: 12, color: "#16a34a", fontWeight: 500 }}>{formatRp(d.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: SYSTEM SETTINGS ────────────────────────────────────────────────────
function SystemSettings({ settings, onToggle, onSave }) {
  const clinicFields = [
    { label: "Clinic name", key: "name", value: "Dental Happy" },
    { label: "Phone", key: "phone", value: "(808) 555-0111" },
    { label: "Address", key: "address", value: "Jl. Soekarno Hatta No.1, Malang" },
    { label: "Email", key: "email", value: "info@dentalhappy.co" },
    { label: "Opening hours", key: "hours", value: "Mon–Fri: 08:00–15:00, Sat: 08:00–13:00" },
    { label: "Max patients/day", key: "max", value: "30" },
  ];

  const sections = [
    {
      title: "Clinic operations",
      items: [
        { key: "online_booking",      label: "Online booking",       desc: "Allow patients to book appointments online" },
        { key: "email_notifications", label: "Email notifications",  desc: "Send confirmation emails to patients" },
        { key: "sms_reminders",       label: "SMS reminders",        desc: "Send SMS reminders 24 hours before appointment" },
        { key: "emergency_service",   label: "Emergency service",    desc: "Accept walk-in emergency patients outside hours" },
      ],
    },
    {
      title: "Queue & capacity",
      items: [
        { key: "auto_queue",     label: "Auto queue number",     desc: "Automatically assign queue numbers on booking" },
        { key: "waitlist",       label: "Waitlist mode",         desc: "Enable waitlist when all slots are full" },
        { key: "double_booking", label: "Prevent double booking", desc: "Block duplicate bookings per patient per day" },
      ],
    },
    {
      title: "Security",
      items: [
        { key: "two_fa",           label: "Two-factor auth",   desc: "Require 2FA for admin login" },
        { key: "audit_log",        label: "Audit log",         desc: "Record all admin actions for security review" },
        { key: "maintenance_mode", label: "Maintenance mode",  desc: "Take the patient portal offline temporarily" },
      ],
    },
  ];

  return (
    <div className="da-fade">
      {/* Clinic info */}
      <div style={{ ...T.card, marginBottom: 16 }}>
        <div style={T.cardHead}>
          <div style={T.cardTitle}>
            <i className="ti ti-building" aria-hidden="true" style={{ marginRight: 6, fontSize: 14, verticalAlign: -2 }} />
            Clinic information
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: "16px 18px" }}>
          {clinicFields.map(f => (
            <div key={f.key}>
              <label style={T.label} htmlFor={`clinic-${f.key}`}>{f.label}</label>
              <input id={`clinic-${f.key}`} style={T.input} className="da-input" defaultValue={f.value} />
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 18px", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "flex-end" }}>
          <button style={T.btnPrimary} className="da-btn-primary" onClick={onSave}>
            <i className="ti ti-device-floppy" aria-hidden="true" /> Save changes
          </button>
        </div>
      </div>

      {sections.map(sec => (
        <div key={sec.title} style={{ ...T.card, marginBottom: 14 }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid #f0f0f0", fontSize: 12, fontWeight: 600 }}>{sec.title}</div>
          {sec.items.map(item => (
            <div key={item.key} style={T.settingRow}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{item.desc}</div>
              </div>
              <Toggle value={settings[item.key] ?? true} onChange={val => onToggle(item.key, val)} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── MODALS ───────────────────────────────────────────────────────────────────
function DentistModal({ dentist, onClose, onSave }) {
  const [form, setForm] = useState({
    name: dentist?.name || "", email: dentist?.email || "",
    specialization: dentist?.specialization || "", phone: dentist?.phone || "",
  });
  const [saving, setSaving] = useState(false);
  const f = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSave = async () => {
    if (!form.name || !form.specialization) return;
    setSaving(true); await onSave(form); setSaving(false);
  };

  return (
    <div style={T.overlay}>
      <div style={T.modal}>
        <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 4 }}>{dentist ? "Edit dentist" : "Add new dentist"}</div>
        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 22 }}>{dentist ? `Editing ${dentist.name}` : "Fill in the dentist's details below."}</div>
        <div style={{ marginBottom: 14 }}>
          <label style={T.label}>Full name</label>
          <input style={T.input} className="da-input" value={form.name} onChange={f("name")} placeholder="Dr. Full Name" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={T.label}>Email</label>
          <input style={T.input} className="da-input" type="email" value={form.email} onChange={f("email")} placeholder="doctor@dentalhappy.co" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div>
            <label style={T.label}>Specialization</label>
            <select style={T.select} className="da-input" value={form.specialization} onChange={f("specialization")}>
              <option value="">Select...</option>
              {["General Dentist","Orthodontist","Oral Surgeon","Prosthodontist","Periodontist","Endodontist","Pediatric Dentist"].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={T.label}>Phone</label>
            <input style={T.input} className="da-input" value={form.phone} onChange={f("phone")} placeholder="08xx-xxxx-xxxx" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 22 }}>
          <button style={T.btnGhost} className="da-btn-ghost" onClick={onClose}>Cancel</button>
          <button style={T.btnPrimary} className="da-btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? <><Spinner /> Saving...</> : (dentist ? "Update dentist" : "Add dentist")}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ dentist, onClose, onConfirm }) {
  const [deleting, setDeleting] = useState(false);
  const go = async () => { setDeleting(true); await onConfirm(); setDeleting(false); };
  return (
    <div style={T.overlay}>
      <div style={{ ...T.modal, width: 380, textAlign: "center" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22 }}>
          <i className="ti ti-trash" aria-hidden="true" style={{ color: "#dc2626" }} />
        </div>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Delete dentist?</div>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>
          Are you sure you want to remove <strong>{dentist?.name}</strong>? This action cannot be undone.
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ ...T.btnGhost, flex: 1, justifyContent: "center" }} className="da-btn-ghost" onClick={onClose}>Cancel</button>
          <button style={{ ...T.btnPrimary, flex: 1, background: "#dc2626", justifyContent: "center" }} onClick={go} disabled={deleting}>
            {deleting ? <><Spinner /> Deleting...</> : "Yes, delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PatientModal({ patient, onClose }) {
  return (
    <div style={T.overlay}>
      <div style={{ ...T.modal, width: 500 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <Avatar name={patient.name} size={50} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 17 }}>{patient.name}</div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>{patient.gender} · {patient.dob}</div>
          </div>
          <Pill status={patient.status} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
          {[
            { label: "Email", value: patient.email },
            { label: "Phone", value: patient.phone },
            { label: "Assigned dentist", value: patient.dentist },
            { label: "Last visit", value: patient.last_visit },
            { label: "Total visits", value: `${patient.visits} visits` },
            { label: "Status", value: patient.status },
          ].map(row => (
            <div key={row.label}>
              <div style={T.label}>{row.label}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#374151", padding: "8px 12px", background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 8 }}>{row.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={T.btnGhost} className="da-btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function Toast({ message, type }) {
  const isSuccess = type === "success";
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9999,
      background: isSuccess ? "#f0fdf4" : "#fef2f2",
      color: isSuccess ? "#15803d" : "#dc2626",
      border: `1px solid ${isSuccess ? "#bbf7d0" : "#fecaca"}`,
      borderRadius: 12, padding: "12px 18px",
      fontWeight: 500, fontSize: 13,
      display: "flex", alignItems: "center", gap: 8,
      boxShadow: "0 4px 16px rgba(0,0,0,.08)",
      animation: "fadeUp .2s ease",
    }}>
      <i className={`ti ${isSuccess ? "ti-circle-check" : "ti-circle-x"}`} aria-hidden="true" />
      {message}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AdminDashboard() {

  const [page, setPage] = useState("overview");

  const [dentists, setDentists] = useState([]);

  const [loadingD, setLoadingD] = useState(true);

  const [appointments, setAppts] = useState([]);

  const [patients, setPatients] = useState([]);

  const [modal, setModal] = useState(null);

  const [toast, setToast] = useState(null);

  const [settings, setSettings] = useState({
    online_booking: true,
    email_notifications: true,
    sms_reminders: false,
    emergency_service: true,
    auto_queue: true,
    waitlist: false,
    double_booking: true,
    two_fa: false,
    audit_log: true,
    maintenance_mode: false,
  });

  useEffect(() => { injectStyles(); }, []);
useEffect(() => {

  fetchDentists();

  fetchAppointments();

  fetchPatients();

  const interval = setInterval(() => {

    fetchAppointments();

  }, 5000);

  return () => clearInterval(interval);

}, []);
 const fetchDentists = async () => {

  setLoadingD(true);

  try {

    const res = await axios.get(
      `${API}/dentists`
    );

    setDentists(res.data);

  } catch (error) {

    console.error(error);

  } finally {

    setLoadingD(false);

  }
};

const fetchAppointments = async () => {

  try {

    const res = await axios.get(
      `${API}/appointments`
    );

    setAppts(res.data);

  } catch (error) {

    console.error(error);

  }
};
const fetchPatients = async () => {

  try {

    const res = await axios.get(
      `${API}/patients`
    );

    setPatients(res.data);

  } catch (error) {

    console.error(error);

  }
};
const updateStatus = async (
  id,
  status
) => {

  try {

    await axios.put(
      `${API}/appointments/${id}`,
      { status }
    );

    fetchAppointments();

    setToast({
      type: "success",
      message: `Appointment ${status}`,
    });

  } catch (error) {

    console.error(error);

  }
};
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveDentist = async (form) => {
    try {
      if (modal.type === "edit") {
        await axios.put(`${API}/dentists/${modal.data.id}`, form);
        setDentists(d => d.map(x => x.id === modal.data.id ? { ...x, ...form } : x));
        showToast("Dentist updated successfully.");
      } else {
        const res = await axios.post(`${API}/dentists`, form);
        setDentists(d => [...d, res.data]);
        showToast("New dentist added.");
      }
    } catch {
      if (modal.type === "edit") {
        setDentists(d => d.map(x => x.id === modal.data.id ? { ...x, ...form } : x));
        showToast("Dentist updated.");
      } else {
        setDentists(d => [...d, { id: Date.now(), is_active: true, ...form }]);
        showToast("Dentist added.");
      }
    }
    setModal(null);
  };

  const handleDeleteDentist = async () => {
    try { await axios.delete(`${API}/dentists/${modal.data.id}`); } catch {}
    setDentists(d => d.filter(x => x.id !== modal.data.id));
    showToast("Dentist deleted.", "error");
    setModal(null);
  };

  const handleConfirmAppt = async (id) => {
    try { await axios.patch(`${API}/appointments/${id}`, { status: "confirmed" }); } catch {}
    setAppts(a => a.map(x => x.id === id ? { ...x, status: "confirmed" } : x));
    showToast("Appointment confirmed.");
  };

  const NAV = [
    { key: "overview",      label: "Overview",         icon: "ti-layout-dashboard" },
    { key: "dentists",      label: "Dentists",          icon: "ti-stethoscope" },
    { key: "appointments",  label: "Appointments",      icon: "ti-calendar" },
    { key: "patients",      label: "Patient records",   icon: "ti-users" },
    { key: "reports",       label: "Reports",           icon: "ti-chart-bar" },
    { key: "settings",      label: "Settings",          icon: "ti-settings" },
  ];

  const PAGE_TITLES = {
    overview: "Overview", dentists: "Dentist management",
    appointments: "Appointments", patients: "Patient records",
    reports: "Reports", settings: "System settings",
  };
const admin = localStorage.getItem("admin");

if (!admin) {

  window.location.href =
    "/admin-login";

  return null;

};
  return (
    <div style={T.layout}>
      {/* ── SIDEBAR ── */}
      <aside style={T.sidebar}>
        <div style={T.logo}>
          <div style={T.logoMark}>
            <i className="ti ti-tooth" aria-hidden="true" style={{ fontSize: 14, color: "#fff" }} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>Dental Happy</div>
            <div style={{ fontSize: 10, color: "#9ca3af", letterSpacing: 0.5 }}>ADMIN PANEL</div>
          </div>
        </div>

        <div style={T.navLabel}>Menu</div>
        {NAV.map(n => (
          <div
            key={n.key}
            style={T.navItem}
            className={`da-nav ${page === n.key ? "active" : ""}`}
            onClick={() => setPage(n.key)}
            role="button"
            tabIndex={0}
            aria-current={page === n.key ? "page" : undefined}
          >
            <i className={`ti ${n.icon} da-nav-icon`} aria-hidden="true" style={{ fontSize: 15, width: 16 }} />
            {n.label}
          </div>
        ))}

        <div style={T.navSep} />
        <div style={{ marginTop: "auto", padding: "12px 8px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, background: "#f9fafb", borderRadius: 10, border: "1px solid #f0f0f0" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>AD</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Admin</div>
              <div style={{ fontSize: 10, color: "#22c55e" }}>● Online</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={T.main} role="main">
        {/* Topbar */}
        <div style={T.topbar}>
          <span style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>{PAGE_TITLES[page]}</span>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>
            {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </span>
          <button style={T.btnGhost} className="da-btn-ghost" aria-label="Notifications">
            <i className="ti ti-bell" aria-hidden="true" style={{ fontSize: 14 }} />
          </button>
          <button style={T.btnGhost} className="da-btn-ghost" onClick={() => window.location.href = "/"}>
            <i className="ti ti-arrow-left" aria-hidden="true" style={{ fontSize: 14 }} /> Back to site
          </button>
        </div>

        {/* Content */}
        <div style={T.content}>
          {page === "overview" && (
            <Overview appointments={appointments} dentists={dentists} patients={patients} setPage={setPage} />
          )}
          {page === "dentists" && (
            <DentistManagement
              dentists={dentists} loading={loadingD}
              onAdd={() => setModal({ type: "add" })}
              onEdit={d => setModal({ type: "edit", data: d })}
              onDelete={d => setModal({ type: "delete", data: d })}
            />
          )}
          {page === "appointments" && (
            <Appointments appointments={appointments} onConfirm={handleConfirmAppt} />
          )}
          {page === "patients" && (
            <PatientRecords
              patients={patients}
              onAdd={() => showToast("Add patient form — coming soon.")}
              onView={p => setModal({ type: "viewPatient", data: p })}
            />
          )}
          {page === "reports" && (
            <Reports report={MOCK_REPORT} />
          )}
          {page === "settings" && (
            <SystemSettings
              settings={settings}
              onToggle={(k, v) => setSettings(s => ({ ...s, [k]: v }))}
              onSave={() => showToast("Settings saved.")}
            />
          )}
        </div>
      </main>

      {/* ── MODALS ── */}
      {(modal?.type === "add" || modal?.type === "edit") && (
        <DentistModal dentist={modal.type === "edit" ? modal.data : null} onClose={() => setModal(null)} onSave={handleSaveDentist} />
      )}
      {modal?.type === "delete" && (
        <DeleteModal dentist={modal.data} onClose={() => setModal(null)} onConfirm={handleDeleteDentist} />
      )}
      {modal?.type === "viewPatient" && (
        <PatientModal patient={modal.data} onClose={() => setModal(null)} />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}