import { Outlet } from "react-router-dom";
import { useState } from "react";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import AdminSidebar from "../components/AdminSidebar";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Section>
      <Container>
        <div className={styles.admin}>
          <button
            className={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {menuOpen && (
            <div
              className={styles.overlay}
              onClick={() => setMenuOpen(false)}
            />
          )}

          <div
            className={`${styles.sidebarWrapper} ${
              menuOpen ? styles.sidebarOpen : ""
            }`}
          >
            <AdminSidebar closeMenu={() => setMenuOpen(false)} />
          </div>

          <main className={styles.main}>
            <Outlet />
          </main>
        </div>
      </Container>
    </Section>
  );
}
