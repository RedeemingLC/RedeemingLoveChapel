import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../../services/adminApi";
import styles from "./AdminLogin.module.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("dizendatbusinesservices@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await adminApi.post("/auth/login", {
        // ✅ FIXED
        email,
        password,
      });

      const adminData = response.data.data;

      if (adminData.role !== "admin") {
        throw new Error("Access denied. Not an admin account.");
      }

      localStorage.setItem("adminToken", adminData.token);

      navigate("/admin");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin Login</h1>
        <p className={styles.subtitle}>
          Sign in to manage Redeeming Love Chapel website content.
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@rlc.com"
              required
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </label>

          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
