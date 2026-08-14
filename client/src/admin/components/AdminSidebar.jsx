import adminApi from "../../services/adminApi";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./AdminSidebar.module.css";

export default function AdminSidebar({ closeMenu }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await adminApi.post("/auth/logout");

      navigate("/admin/login"); // ✅ redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
          onClick={closeMenu}
        >
          Overview
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
          onClick={closeMenu}
        >
          Categories
        </NavLink>

        <NavLink
          to="/admin/wisdom"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
          onClick={closeMenu}
        >
          Words of Wisdom
        </NavLink>

        {/* <NavLink
          to="/admin/content"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Content
        </NavLink> */}

        <NavLink
          to="/admin/manuals"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
          onClick={closeMenu}
        >
          Manuals
        </NavLink>

        <NavLink
          to="/admin/audio-sermons"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
          onClick={closeMenu}
        >
          Audio Sermons
        </NavLink>

        <NavLink
          to="/admin/blog"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
          onClick={closeMenu}
        >
          Blog
        </NavLink>

        <NavLink
          to="/admin/studies"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
          onClick={closeMenu}
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
