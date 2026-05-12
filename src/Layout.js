import { Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserMd,
  FaCalendar,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";

function Layout() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="menu" onClick={() => navigate("/")}>
          <FaHome /> Dashboard
        </div>

        <div className="menu" onClick={() => navigate("/doctor")}>
          <FaUserMd /> Dokter
        </div>

        <div className="menu">
          <FaCalendar /> Jadwal
        </div>

        <div className="menu">
          <FaMoneyBill /> Pembayaran
        </div>

        <div className="menu">
          <FaCog /> Setting
        </div>
      </div>

      {/* 🔥 ISI HALAMAN */}
      <div className="main">
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;