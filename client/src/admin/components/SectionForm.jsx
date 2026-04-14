import { useState, useEffect } from "react";
import adminApi from "../../services/adminApi";

function SectionForm({
  manualId,
  editingSection,
  fetchSections,
  setEditingSection,
}) {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(0);

  useEffect(() => {
    if (editingSection) {
      setTitle(editingSection.title);
      setOrder(editingSection.order || 0);
    }
  }, [editingSection]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingSection) {
      await adminApi.put(`/api/sections/${editingSection._id}`, {
        title,
        order,
      });
    } else {
      await adminApi.post("/api/sections", {
        manualId,
        title,
        order,
      });
    }

    setTitle("");
    setOrder(0);
    setEditingSection(null);

    fetchSections();
  };

  return (
    <form onSubmit={handleSubmit} className="adminForm">
      <h3>{editingSection ? "Update Section" : "Create Section"}</h3>

      <input
        type="text"
        placeholder="Section Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Order"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      />

      <button type="submit">
        {editingSection ? "Update Section" : "Create Section"}
      </button>
    </form>
  );
}

export default SectionForm;
