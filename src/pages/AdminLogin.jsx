import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(res.data.user)
      );

      window.location.href = "/admin";
    } catch (error) {
      alert("Email atau password salah");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#d9e3f3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "1000px",
          height: "650px",
          display: "flex",
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 15px 40px rgba(0,0,0,.1)",
        }}
      >
        {/* LEFT SIDE */}
        <div
          style={{
            flex: 1,
            background: "#3254d8",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800"
            alt="doctor"
            style={{
              width: "100%",
              height: "50%",
              objectFit: "cover",
            }}
          />

          <div
            style={{
              padding: "50px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2
              style={{
                fontSize: "38px",
                marginBottom: "20px",
              }}
            >
              Dental Happy
            </h2>

            <h3
              style={{
                fontSize: "30px",
                marginBottom: "20px",
              }}
            >
              Admin Dashboard
            </h3>

            <p
              style={{
                lineHeight: "1.8",
                opacity: ".9",
              }}
            >
              Kelola data pasien, dokter,
              jadwal konsultasi, dan seluruh
              aktivitas klinik melalui panel
              admin yang terintegrasi.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px",
          }}
        >
          <form
            onSubmit={handleLogin}
            style={{
              width: "100%",
              maxWidth: "350px",
            }}
          >
            <h1
              style={{
                fontSize: "40px",
                marginBottom: "10px",
              }}
            >
              Login
            </h1>

            <p
              style={{
                color: "#666",
                marginBottom: "30px",
              }}
            >
              Login ke Dashboard Admin
            </p>

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Masukkan email"
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "8px",
                marginBottom: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            />

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Masukkan password"
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "8px",
                marginBottom: "25px",
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "10px",
                background: "#3254d8",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}