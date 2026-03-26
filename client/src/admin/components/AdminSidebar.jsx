import { NavLink, useNavigate } from "react-router-dom";
import styles from "./AdminSidebar.module.css";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoBox}>
        <h2 className={styles.logo}>RLC Admin</h2>
        <p className={styles.sub}>Dashboard</p>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Overview
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Categories
        </NavLink>

        <NavLink
          to="/admin/content"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Content
        </NavLink>

        <NavLink
          to="/admin/manuals"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Manuals
        </NavLink>

        <NavLink
          to="/admin/audio-sermons"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Audio Sermons
        </NavLink>

        <NavLink
          to="/admin/blog"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Blog
        </NavLink>

        <NavLink
          to="/admin/studies"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Study Plans
        </NavLink>

        {/* ✅ Logout Button */}
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </aside>
  );
}
