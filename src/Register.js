import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import dentist from "./gambar2.jpg";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (!username || !email || !password || !confirm) {
      setError("⚠️ Semua field wajib diisi");
      return;
    }

    if (password !== confirm) {
      setError("❌ Password tidak sama");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      console.log("FULL RESPONSE:", data); // 🔥 debug
      alert(JSON.stringify(data)); // 🔥 tampilkan error asli

      if (res.ok) {
        alert("Register berhasil 🎉");
        navigate("/login");
      } else {
        setError(data.error || data.message || "Register gagal");
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-image">
          <img src={dentist} alt="dentist" />
        </div>

        <div className="login-form">
          <h2>Create Account 🚀</h2>
          <p className="subtitle">Daftar untuk mulai</p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Nomor Telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          {error && <div className="error-box">{error}</div>}

          <button onClick={handleRegister} disabled={loading}>
            {loading ? "Loading..." : "REGISTER"}
          </button>

          <p className="register-text">
            Sudah punya akun?{" "}
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;