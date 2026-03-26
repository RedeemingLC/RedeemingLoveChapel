import { useState, useEffect } from "react";
import adminApi from "../../../services/adminApi";
import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor";

export default function BlogForm({ onSuccess, editingBlog }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    featuredImage: "",
    seoTitle: "",
    seoDescription: "",
    isPublished: false,
    category: "",
    excerpt: "",
  });

  // const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  /* ===============================
     Load Blog When Editing
  =============================== */

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || "",
        content: editingBlog.content || "",
        excerpt: editingBlog.excerpt || "",
        featuredImage: editingBlog.featuredImage || "",
        seoTitle: editingBlog.seoTitle || "",
        seoDescription: editingBlog.seoDescription || "",
        isPublished: editingBlog.isPublished || false,
        category: editingBlog.category?._id || editingBlog.category || "",
        isFeatured: editingBlog.isFeatured || false, // ✅ ADD THIS
      });
    }
  }, [editingBlog]);

  /* ===============================
     Fetch Categories
  =============================== */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await adminApi.get("/api/categories");
        setCategories(data.data);
      } catch (error) {
        console.log("CATEGORY FETCH ERROR:", error);
      }
    };

    fetchCategories();
  }, []);

  /* ===============================
     Handle Input Change
  =============================== */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ===============================
     Image Upload
  =============================== */

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const { data } = await adminApi.post("/api/upload", formDataUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData((prev) => ({
        ...prev,
        featuredImage: data.imageUrl,
      }));
    } catch (error) {
      console.log(error);
      alert("Image upload failed");
    }
  };

  /* ===============================
     Submit Form
  =============================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData, // ✅ already contains correct content
      };

      if (editingBlog) {
        await adminApi.put(`/api/blog/${editingBlog._id}`, payload);
      } else {
        await adminApi.post("/api/blog", payload);
      }

      /* Reset Form Completely */

      setFormData({
        title: "",
        content: "",
        featuredImage: "",
        seoTitle: "",
        seoDescription: "",
        isPublished: false,
        category: "",
        excerpt: "",
      });

      // setEditorContent("");

      if (onSuccess) onSuccess();
    } catch (error) {
      console.log("BLOG SAVE ERROR:", error?.response || error);
      alert("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     Component UI
  =============================== */

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      {/* Title */}

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Excerpt */}
      <div style={{ marginBottom: "1rem" }}>
        <textarea
          name="excerpt"
          placeholder="Short excerpt (for preview cards)"
          value={formData.excerpt}
          onChange={handleChange}
          rows="3"
        />
      </div>

      {/* Category */}

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Category
          <select
            name="category"
            value={formData.category || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured || false}
            onChange={(e) =>
              setFormData({
                ...formData,
                isFeatured: e.target.checked,
              })
            }
          />
          Set as Featured Article
        </label>
      </div>

      {/* Rich Text Editor */}

      <div style={{ marginBottom: "1rem" }}>
        <label>Blog Content</label>
        <RichTextEditor
          value={formData.content || ""}
          onChange={(value) =>
            setFormData({
              ...formData,
              content: value,
            })
          }
        />
      </div>

      {/* Publish Toggle */}

      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          Publish immediately
        </label>
      </div>

      {/* Image Upload */}

      <div style={{ marginBottom: "1rem" }}>
        <label>Featured Image</label>

        <input type="file" onChange={handleImageUpload} />

        {formData.featuredImage && (
          <img
            src={
              formData.featuredImage?.startsWith("http")
                ? formData.featuredImage
                : `http://localhost:5000${formData.featuredImage}`
            }
            alt="Preview"
            style={{
              width: "150px",
              marginTop: "10px",
              borderRadius: "6px",
            }}
          />
        )}
      </div>

      {/* SEO Title */}

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="seoTitle"
          placeholder="SEO Title"
          value={formData.seoTitle}
          onChange={handleChange}
        />
      </div>

      {/* SEO Description */}

      <div style={{ marginBottom: "1rem" }}>
        <textarea
          name="seoDescription"
          placeholder="SEO Description"
          value={formData.seoDescription}
          onChange={handleChange}
          rows="3"
        />
      </div>

      {/* Submit */}

      <button type="submit" disabled={loading}>
        {loading
          ? editingBlog
            ? "Updating..."
            : "Creating..."
          : editingBlog
            ? "Update Blog"
            : "Create Blog"}
      </button>
    </form>
  );
}
