import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import dentist from "./gambar2.jpg";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(""); // 🔥 ganti
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("⚠️ Semua field wajib diisi");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, // 🔥 ganti dari email
          password,
        }),
      });

      const data = await res.json();
      console.log(data); // 🔥 debug

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login berhasil 🎉");
        navigate("/dashboard");
      } else {
        setError(data.message || "Login gagal");
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* IMAGE */}
        <div className="login-image">
          <img src={dentist} alt="dentist" />
        </div>

        {/* FORM */}
        <div className="login-form">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Login untuk melanjutkan</p>

          <input
            type="text"
            placeholder="Username" // 🔥 ubah
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="error-box">{error}</div>}

          <button onClick={handleLogin}>LOGIN</button>

          <p className="register-text">
            Belum punya akun?{" "}
            <span onClick={() => navigate("/register")}>
              Daftar sekarang
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;