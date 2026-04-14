import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <>
      <div className="adminHeader">
        <h1>Study Plans</h1>
        <p>Create and manage Bible study plans (online reading only).</p>
      </div>

      <div className="adminSection">
        <form className="adminForm" onSubmit={handleCreate}>
          <input
            placeholder="Study title"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            required
          />

          <input
            placeholder="Slug (e.g. why-the-bible-is-the-word-of-god)"
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
      </div>

      <div className="adminSection">
        <h2>All Studies</h2>

        <div className="adminList">
          {studies.map((s) => (
            <div key={s._id} className="adminListItem">
              <div>
                <h3>{s.title}</h3>
                <p className="adminMeta">/{s.slug}</p>
                <p className="adminMeta">{s.description}</p>
                <p className="adminMeta">
                  {s.isPublished ? "Published" : "Draft"}
                </p>
              </div>

              <div className="adminActionsInline">
                <button
                  onClick={() => {
                    navigate(`/admin/studies/${s._id}`);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  Edit
                </button>

                <button onClick={() => handleDelete(s._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
