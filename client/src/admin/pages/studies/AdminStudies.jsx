import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";

export default function AdminStudies() {
  const [studies, setStudies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const navigate = useNavigate();

  const fetchStudies = async () => {
    try {
      setFetching(true);
      const res = await api.get("/studies");
      setStudies(Array.isArray(res.data) ? res.data : []); // ✅ SAFE
    } catch (error) {
      console.log("FETCH STUDIES ERROR:", error);
      setStudies([]);
    } finally {
      setFetching(false);
    }
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
    } catch (error) {
      console.log("CREATE STUDY ERROR:", error);
      alert("Failed to create study");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (studyId) => {
    if (!window.confirm("Delete this study and ALL its days?")) return;

    try {
      await api.delete(`/studies/${studyId}`);
      fetchStudies();
    } catch (error) {
      console.log("DELETE ERROR:", error);
      alert("Failed to delete study");
    }
  };

  // ✅ Prevent crash
  if (!Array.isArray(studies)) {
    return <p>Loading studies...</p>;
  }

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

        {fetching ? (
          <p>Loading studies...</p>
        ) : studies.length === 0 ? (
          <p>No studies available.</p>
        ) : (
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
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Edit
                  </button>

                  <button onClick={() => handleDelete(s._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
