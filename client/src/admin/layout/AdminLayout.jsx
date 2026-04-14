import { Outlet } from "react-router-dom";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import AdminSidebar from "../components/AdminSidebar";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  return (
    <Section>
      <Container>
        <div className={styles.admin}>
          <AdminSidebar />

          <main className={styles.main}>
            <Outlet />
          </main>
        </div>
      </Container>
    </Section>
  );
}
