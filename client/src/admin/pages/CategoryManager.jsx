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
    <>
      <div className="adminHeader">
        <h1>Category Manager</h1>
        <p>Create and manage content categories</p>
      </div>

      <div className="adminSection">
        <form onSubmit={handleCreate} className="adminForm">
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
      </div>

      <div className="adminSection">
        <h2>All Categories</h2>

        <div className="adminList">
          {categories.map((cat) => (
            <div key={cat._id} className="adminListItem">
              {editingId === cat._id ? (
                <div className="adminEditRow">
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
                </div>
              ) : (
                <div className="adminRow">
                  <span>{cat.name}</span>

                  <div className="adminActionsInline">
                    <button
                      onClick={() => {
                        setEditingId(cat._id);
                        setEditName(cat.name);
                      }}
                    >
                      Edit
                    </button>

                    <button onClick={() => handleDelete(cat._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
