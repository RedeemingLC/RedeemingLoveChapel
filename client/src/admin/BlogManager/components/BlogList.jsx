import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import styles from "./BlogList.module.css";

export default function BlogList({ blogs, onDelete, onTogglePublish, onEdit }) {
  // ✅ Prevent crash
  if (!Array.isArray(blogs)) {
    return <p>Loading blogs...</p>;
  }

  // ✅ Handle empty list
  if (blogs.length === 0) {
    return <p>No blogs available.</p>;
  }

  return (
    <div className={styles.list}>
      {blogs.map((blog) => (
        <Card key={blog._id} className={styles.card}>
          <div className={styles.content}>
            <h3>{blog.title}</h3>

            {blog.featuredImage && (
              <img
                src={blog.featuredImage} // ✅ FIXED (no localhost)
                alt={blog.title}
                className={styles.image}
              />
            )}

            <p className={styles.meta}>
              Category: {blog.category?.name || "Uncategorized"}
            </p>

            <p className={styles.status}>
              {blog.isPublished ? "Published" : "Draft"}
            </p>

            <p className={styles.meta}>
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleString()
                : "—"}
            </p>
          </div>

          <div className={styles.actions}>
            <Button variant="outline" onClick={() => onEdit(blog)}>
              Edit
            </Button>

            <Button
              variant={blog.isPublished ? "ghost" : "primary"}
              onClick={() => onTogglePublish(blog)}
            >
              {blog.isPublished ? "Unpublish" : "Publish"}
            </Button>

            <Button variant="ghost" onClick={() => onDelete(blog._id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}