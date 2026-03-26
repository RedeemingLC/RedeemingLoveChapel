import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const fetchCategories = async () => {
    try {
      const { data } = await adminApi.get("/api/categories");
      setCategories(data.data);
    } catch (error) {
      console.log("FETCH CATEGORY ERROR:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await adminApi.post("/api/categories", { name });
      setName("");
      fetchCategories();
    } catch (error) {
      alert("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await adminApi.delete(`/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      alert("Failed to delete category");
    }
  };

  const handleUpdate = async (id) => {
    try {
      await adminApi.put(`/api/categories/${id}`, {
        name: editName,
      });

      setEditingId(null);
      setEditName("");
      fetchCategories();
    } catch (error) {
      alert("Failed to update category");
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h1>Category Manager</h1>

      <form onSubmit={handleCreate} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button disabled={loading}>
          {loading ? "Creating..." : "Add Category"}
        </button>
      </form>

      {categories.map((cat) => (
        <div
          key={cat._id}
          style={{
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {editingId === cat._id ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <button onClick={() => handleUpdate(cat._id)}>Save</button>

              <button
                onClick={() => {
                  setEditingId(null);
                  setEditName("");
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>{cat.name}</span>

              <button
                onClick={() => {
                  setEditingId(cat._id);
                  setEditName(cat.name);
                }}
              >
                Edit
              </button>

              <button
                style={{ color: "red" }}
                onClick={() => handleDelete(cat._id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
