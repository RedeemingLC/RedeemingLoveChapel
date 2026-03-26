import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminStudies.module.css";
import api from "../../../utils/api";

export default function AdminStudies() {
  const [studies, setStudies] = useState([]);
  const [form, setForm] = useState({ title: "", slug: "", description: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchStudies = async () => {
    const res = await api.get("/studies");
    setStudies(res.data);
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/studies", form);
      setForm({ title: "", slug: "", description: "" });
      navigate(`/admin/studies/${res.data._id}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (studyId) => {
    if (!confirm("Delete this study and ALL its days?")) return;
    await api.delete(`/studies/${studyId}`);
    fetchStudies();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h1>Study Plans</h1>
        <p>Create and manage Bible study plans (online reading only).</p>
      </div>

      <form className={styles.form} onSubmit={handleCreate}>
        <input
          placeholder="Study title"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          required
        />
        <input
          placeholder="slug (e.g. why-the-bible-is-the-word-of-god)"
          value={form.slug}
          onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
          required
        />
        <textarea
          placeholder="Short description..."
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
        />
        <button disabled={loading}>
          {loading ? "Creating..." : "Create Study"}
        </button>
      </form>

      <div className={styles.list}>
        {studies.map((s) => (
          <div key={s._id} className={styles.card}>
            <div>
              <h3>{s.title}</h3>
              <p className={styles.slug}>/{s.slug}</p>
              <p className={styles.desc}>{s.description}</p>
              <p className={styles.meta}>
                {s.isPublished ? "✅ Published" : "🕓 Draft"}
              </p>
            </div>

            <div className={styles.actions}>
              <button onClick={() => navigate(`/admin/studies/${s._id}`)}>
                Edit
              </button>
              <button
                className={styles.danger}
                onClick={() => handleDelete(s._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
