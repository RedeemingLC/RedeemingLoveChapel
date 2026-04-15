import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await adminApi.get("/blog?limit=100"); // ✅ FIXED

      // ✅ Safe assignment
      setBlogs(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.log("FETCH BLOG ERROR:", error?.response || error);
      setBlogs([]); // ✅ Prevent crash
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;

    try {
      await adminApi.delete(`/blog/${id}`); // ✅ FIXED
      fetchBlogs();
    } catch (error) {
      console.log(error);
      alert("Failed to delete blog");
    }
  };

  const handleTogglePublish = async (blog) => {
    try {
      await adminApi.put(`/blog/${blog._id}`, {
        // ✅ FIXED
        isPublished: !blog.isPublished,
      });
      fetchBlogs();
    } catch (error) {
      console.log(error);
      alert("Failed to update publish status");
    }
  };

  return (
    <>
      <div className="adminHeader">
        <h1>Blog Manager</h1>
        <p>Create, edit and manage blog posts</p>
      </div>

      <div className="adminSection">
        <BlogForm
          editingBlog={editingBlog}
          onSuccess={() => {
            setEditingBlog(null);
            fetchBlogs();
          }}
        />
      </div>

      <div className="adminSection">
        <h2>All Blog Posts</h2>

        {loading ? (
          <p>Loading blog posts...</p>
        ) : blogs.length === 0 ? (
          <p>No blog posts yet.</p>
        ) : (
          <BlogList
            blogs={blogs}
            onDelete={handleDelete}
            onTogglePublish={handleTogglePublish}
            onEdit={setEditingBlog}
          />
        )}
      </div>
    </>
  );
}
