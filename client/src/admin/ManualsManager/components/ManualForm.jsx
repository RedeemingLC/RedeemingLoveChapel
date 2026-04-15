import { useState, useEffect } from "react";
import adminApi from "../../../services/adminApi";
import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor";

export default function ManualForm({ onSuccess, editingManual }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [existingPdf, setExistingPdf] = useState("");
  const [existingCover, setExistingCover] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingManual) {
      setTitle(editingManual.title || "");
      setDescription(editingManual.description || "");
      setEditorContent(editingManual.content || "");
      setExistingPdf(editingManual.fileUrl || "");
      setExistingCover(editingManual.coverImage || "");
      setCategory(editingManual.category?._id || "");
    }
  }, [editingManual]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await adminApi.get("/categories"); // ✅ FIXED
        setCategories(Array.isArray(data?.data) ? data.data : []); // ✅ SAFE
      } catch (error) {
        console.log("FETCH CATEGORIES ERROR:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditorContent("");
    setPdfFile(null);
    setCoverFile(null);
    setExistingPdf("");
    setExistingCover("");
    setCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fileUrl = existingPdf;
      let coverImage = existingCover;

      // PDF Upload
      if (pdfFile) {
        const pdfData = new FormData();
        pdfData.append("file", pdfFile);

        const pdfUpload = await adminApi.post("/upload/manual", pdfData, {
          // ✅ FIXED
          headers: { "Content-Type": "multipart/form-data" },
        });

        fileUrl = pdfUpload.data.fileUrl;
      }

      // Cover Upload
      if (coverFile) {
        const coverData = new FormData();
        coverData.append("file", coverFile);

        const coverUpload = await adminApi.post(
          "/upload/manual-cover", // ✅ FIXED
          coverData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        coverImage = coverUpload.data.fileUrl;
      }

      const payload = {
        title,
        description,
        content: editorContent,
        fileUrl,
        coverImage,
        category,
      };

      if (editingManual) {
        await adminApi.put(`/manuals/${editingManual._id}`, payload); // ✅ FIXED
      } else {
        await adminApi.post("/manuals", payload); // ✅ FIXED
      }

      resetForm();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("MANUAL SAVE ERROR:", error?.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="adminForm">
      <h2>{editingManual ? "Edit Manual" : "Create Manual"}</h2>

      <input
        type="text"
        placeholder="Manual Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Manual Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>

        {Array.isArray(categories) &&
          categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
      </select>

      <RichTextEditor value={editorContent} onChange={setEditorContent} />

      {existingPdf && (
        <p>
          Current PDF:{" "}
          <a href={existingPdf} target="_blank" rel="noreferrer">
            View
          </a>
        </p>
      )}

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdfFile(e.target.files[0])}
      />

      {existingCover && (
        <p>
          Current Cover:{" "}
          <a href={existingCover} target="_blank" rel="noreferrer">
            View
          </a>
        </p>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCoverFile(e.target.files[0])}
      />

      <button type="submit" disabled={loading}>
        {loading
          ? editingManual
            ? "Updating..."
            : "Saving..."
          : editingManual
            ? "Update Manual"
            : "Create Manual"}
      </button>
    </form>
  );
}
