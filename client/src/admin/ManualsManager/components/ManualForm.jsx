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

  // Load manual when editing
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
        const { data } = await adminApi.get("/api/categories");
        setCategories(data.data);
      } catch (error) {
        console.log("FETCH CATEGORIES ERROR:", error);
      }
    };

    fetchCategories();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditorContent("");
    setPdfFile(null); // 🔥 ADDED
    setCoverFile(null); // 🔥 ADDED
    setExistingPdf(""); // 🔥 ADDED
    setExistingCover(""); // 🔥 ADDED
    setCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🔥 START - Files:", {
        pdfFile: !!pdfFile,
        coverFile: !!coverFile,
      });
      console.log("🔥 BEFORE - existing:", { existingPdf, existingCover });

      let fileUrl = existingPdf;
      let coverImage = existingCover;

      // PDF Upload
      if (pdfFile) {
        console.log("📄 UPLOADING PDF...");
        const pdfData = new FormData();
        pdfData.append("file", pdfFile);
        const pdfUpload = await adminApi.post("/api/upload/manual", pdfData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        fileUrl = pdfUpload.data.fileUrl;
        console.log("✅ PDF URL:", fileUrl);
      }

      // Cover Upload
      if (coverFile) {
        console.log("🖼️ UPLOADING COVER...");
        const coverData = new FormData();
        coverData.append("file", coverFile);
        const coverUpload = await adminApi.post(
          "/api/upload/manual-cover",
          coverData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        coverImage = coverUpload.data.fileUrl;
        console.log("✅ COVER URL:", coverImage);
      }

      const payload = {
        title,
        description,
        content: editorContent,
        fileUrl,
        coverImage,
        category,
      };

      console.log("📤 SENDING PAYLOAD:", payload);

      let result;
      if (editingManual) {
        result = await adminApi.put(
          `/api/manuals/${editingManual._id}`,
          payload,
        );
      } else {
        result = await adminApi.post("/api/manuals", payload);
      }

      console.log("✅ SAVE RESULT:", result.data);

      resetForm();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("💥 FULL ERROR:", error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FIX 4: Add this helper function (add after handleSubmit)
  const uploadFile = async (file, endpoint) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await adminApi.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.fileUrl;
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

        {categories.map((cat) => (
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
