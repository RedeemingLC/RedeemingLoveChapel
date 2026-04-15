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
    isFeatured: false,
  });

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
        isFeatured: editingBlog.isFeatured || false,
      });
    }
  }, [editingBlog]);

  /* ===============================
     Fetch Categories
  =============================== */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await adminApi.get("/categories"); // ✅ FIXED
        setCategories(Array.isArray(data?.data) ? data.data : []); // ✅ SAFE
      } catch (error) {
        console.log("CATEGORY FETCH ERROR:", error);
        setCategories([]); // ✅ Prevent crash
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
      const { data } = await adminApi.post("/upload", formDataUpload, {
        // ✅ FIXED
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

      if (editingBlog) {
        await adminApi.put(`/blog/${editingBlog._id}`, formData); // ✅ FIXED
      } else {
        await adminApi.post("/blog", formData); // ✅ FIXED
      }

      setFormData({
        title: "",
        content: "",
        featuredImage: "",
        seoTitle: "",
        seoDescription: "",
        isPublished: false,
        category: "",
        excerpt: "",
        isFeatured: false,
      });

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
    <form onSubmit={handleSubmit} className="adminForm">
      <h2>{editingBlog ? "Update Blog" : "Create Blog"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Blog Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="excerpt"
        placeholder="Short excerpt"
        value={formData.excerpt}
        onChange={handleChange}
        rows="3"
      />

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

        {Array.isArray(categories) &&
          categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
      </select>

      <label className="adminCheckbox">
        <input
          type="checkbox"
          name="isFeatured"
          checked={formData.isFeatured}
          onChange={handleChange}
        />
        Set as Featured Article
      </label>

      <div>
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

      <label className="adminCheckbox">
        <input
          type="checkbox"
          name="isPublished"
          checked={formData.isPublished}
          onChange={handleChange}
        />
        Publish immediately
      </label>

      <div>
        <label>Featured Image</label>
        <input type="file" onChange={handleImageUpload} />

        {formData.featuredImage && (
          <img
            src={formData.featuredImage} // ✅ FIXED (no localhost)
            alt="Preview"
            className="adminPreviewImage"
          />
        )}
      </div>

      <input
        type="text"
        name="seoTitle"
        placeholder="SEO Title"
        value={formData.seoTitle}
        onChange={handleChange}
      />

      <textarea
        name="seoDescription"
        placeholder="SEO Description"
        value={formData.seoDescription}
        onChange={handleChange}
        rows="3"
      />

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
