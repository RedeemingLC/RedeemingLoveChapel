import { useState, useEffect } from "react";
import adminApi from "../../services/adminApi";
import BlockEditor from "./BlockEditor/BlockEditor";

function SubsectionForm({
  sectionId,
  editingSubsection,
  fetchSubsections,
  setEditingSubsection,
}) {
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState([{ type: "paragraph", value: "" }]);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    if (editingSubsection) {
      setTitle(editingSubsection.title);

      setBlocks(editingSubsection.blocks || []);

      setOrder(editingSubsection.order || 0);
    }
  }, [editingSubsection]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingSubsection) {
      await adminApi.put(`/api/subsections/${editingSubsection._id}`, {
        title,
        blocks,
        order,
      });
    } else {
      await adminApi.post("/api/subsections", {
        sectionId,
        title,
        blocks,
        order,
      });
    }

    setTitle("");
    setBlocks([{ type: "paragraph", value: "" }]);
    setOrder(0);
    setEditingSubsection(null);

    fetchSubsections();

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingSubsection ? "Update Lesson" : "Create Lesson"}</h3>

      <input
        type="text"
        placeholder="Lesson Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <BlockEditor blocks={blocks} setBlocks={setBlocks} />

      <input
        type="number"
        placeholder="Order"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      />

      <button type="submit">
        {editingSubsection ? "Update Lesson" : "Create Lesson"}
      </button>
    </form>
  );
}

export default SubsectionForm;
