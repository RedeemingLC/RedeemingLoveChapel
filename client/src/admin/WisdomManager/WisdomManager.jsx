import { useEffect, useState } from "react";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import api from "../../utils/api";

export default function WisdomManager() {
  const [wisdomList, setWisdomList] = useState([]);
  const [form, setForm] = useState({ text: "", author: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWisdom = async () => {
    try {
      setLoading(true);

      const res = await api.get("/wisdom/admin/wisdom", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      setWisdomList(res.data);
    } catch (error) {
      console.error("FETCH ERROR:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.text.trim()) return;

    if (editingId) {
      await api.put(`/wisdom/admin/wisdom/${editingId}`, form);
    } else {
      await api.post("/wisdom/admin/wisdom", form);
    }

    setForm({ text: "", author: "" });
    setEditingId(null);
    fetchWisdom();
  };

  const handleEdit = (item) => {
    setForm({ text: item.text, author: item.author });
    setEditingId(item._id);

    // 🔥 Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this wisdom?")) return;
    await api.delete(`/wisdom/admin/wisdom/${id}`);
    fetchWisdom();
  };

  const handleActivate = async (id) => {
    await api.patch(`/wisdom/admin/wisdom/${id}/activate`);
    fetchWisdom();
  };

  const handleDeactivate = async (id) => {
    await api.patch(`/wisdom/admin/wisdom/${id}/deactivate`);
    fetchWisdom();
  };

  return (
    <>
      <div className="adminHeader">
        <h1>Word of Wisdom</h1>
        <p>Create and manage inspirational messages</p>
      </div>

      {/* FORM */}
      <div className="adminSection">
        <form onSubmit={handleSubmit} className="adminForm">
          <h3>{editingId ? "Update Wisdom" : "Add Wisdom"}</h3>

          <RichTextEditor
            value={form.text}
            onChange={(val) => setForm({ ...form, text: val })}
          />

          <input
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />

          <button>{editingId ? "Update Wisdom" : "Add Wisdom"}</button>
        </form>
      </div>

      {/* LIST */}
      <div className="adminSection">
        <h2>All Wisdom</h2>

        {loading ? (
          <p>Loading wisdom...</p>
        ) : wisdomList.length === 0 ? (
          <p>No wisdom added yet.</p>
        ) : (
          <div className="adminList">
            {wisdomList.map((w) => (
              <div key={w._id} className="adminListItem">
                <div className="adminContent">
                  <div
                    className="adminRichText"
                    dangerouslySetInnerHTML={{ __html: w.text }}
                  />

                  <p className="adminMeta">— {w.author || "Unknown"}</p>

                  {w.isActive && <span className="adminBadge">Active</span>}
                </div>

                <div className="adminActionsInline">
                  <button onClick={() => handleEdit(w)}>Edit</button>

                  <button onClick={() => handleDelete(w._id)}>Delete</button>

                  {w.isActive ? (
                    <button onClick={() => handleDeactivate(w._id)}>
                      Deactivate
                    </button>
                  ) : (
                    <button onClick={() => handleActivate(w._id)}>
                      Set Active
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
