import { useState, useEffect } from "react";
import adminApi from "../../services/adminApi";

function ContentForm({ editingContent, fetchContents, setEditingContent }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("manual");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(0);

  useEffect(() => {
    if (editingContent) {
      setTitle(editingContent.title);
      setType(editingContent.type);
      setDescription(editingContent.description || "");
      setOrder(editingContent.order || 0);
    }
  }, [editingContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingContent) {
      await adminApi.put(`/api/content/${editingContent._id}`, {
        title,
        type,
        description,
        order,
      });
    } else {
      await adminApi.post("/api/content", {
        title,
        type,
        description,
        order,
      });
    }

    setTitle("");
    setDescription("");
    setOrder(0);
    setEditingContent(null);

    fetchContents();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Content</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="manual">Manual</option>
        <option value="devotional">Devotional</option>
        <option value="course">Course</option>
        <option value="sermon">Sermon Series</option>
        <option value="book">Book</option>
      </select>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      />

      <button type="submit">
        {editingContent ? "Update Content" : "Create Content"}
      </button>
    </form>
  );
}

export default ContentForm;
