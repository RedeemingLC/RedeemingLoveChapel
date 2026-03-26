export default function BlogList({ blogs, onDelete, onTogglePublish, onEdit }) {
  return (
    <div>
      {blogs.map((blog) => (
        <div
          key={blog._id}
          style={{
            border: "1px solid #e5e5e5",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            background: "#fff",
          }}
        >
          <h3 style={{ marginBottom: "0.5rem" }}>{blog.title}</h3>

          <div>
            <img
              src={
                blog.featuredImage?.startsWith("http")
                  ? blog.featuredImage
                  : `http://localhost:5000${blog.featuredImage}`
              }
              alt={blog.title}
              style={{
                width: "120px",
                borderRadius: "6px",
                marginBottom: "10px",
              }}
            />
          </div>

          <p style={{ margin: "0.25rem 0" }}>
            <strong>Category:</strong> {blog.category?.name || "Uncategorized"}
          </p>

          <p style={{ margin: "0.25rem 0" }}>
            <strong>Status:</strong>{" "}
            <span
              style={{
                color: blog.isPublished ? "green" : "orange",
                fontWeight: "600",
              }}
            >
              {blog.isPublished ? "Published" : "Draft"}
            </span>
          </p>

          <p style={{ margin: "0.25rem 0" }}>
            <strong>Created:</strong>{" "}
            {blog.createdAt ? new Date(blog.createdAt).toLocaleString() : "—"}
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "1rem",
            }}
          >
            <button onClick={() => onEdit(blog)}>Edit</button>

            <button onClick={() => onTogglePublish(blog)}>
              {blog.isPublished ? "Unpublish" : "Publish"}
            </button>

            <button style={{ color: "red" }} onClick={() => onDelete(blog._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
