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
      const { data } = await adminApi.get("/categories"); // ✅ FIXED
      setCategories(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.log("FETCH CATEGORY ERROR:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await adminApi.post("/categories", { name }); // ✅ FIXED
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
      await adminApi.delete(`/categories/${id}`); // ✅ FIXED
      fetchCategories();
    } catch (error) {
      alert("Failed to delete category");
    }
  };

  const handleUpdate = async (id) => {
    try {
      await adminApi.put(`/categories/${id}`, {
        // ✅ FIXED
        name: editName,
      });

      setEditingId(null);
      setEditName("");
      fetchCategories();
    } catch (error) {
      alert("Failed to update category");
    }
  };

  // ✅ Prevent crash
  if (!Array.isArray(categories)) {
    return <p>Loading categories...</p>;
  }

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

        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
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
        )}
      </div>
    </>
  );
}
