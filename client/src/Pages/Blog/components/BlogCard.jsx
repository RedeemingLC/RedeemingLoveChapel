import { Link } from "react-router-dom";
import styles from "../../Blog/Blog.module.css";

const BlogCard = ({ blog }) => {
  // ✅ Fix image path
  const getImageUrl = (path) => {
    if (!path) return "/placeholder.jpg";
    return path.startsWith("http") ? path : `http://localhost:5000${path}`;
  };

  // ✅ Remove HTML tags from content
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className={styles.blogCard}>
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <img src={getImageUrl(blog.featuredImage)} alt={blog.title} />

        <span className={styles.categoryTag}>
          {blog.category?.name || "Category"}
        </span>
      </div>

      {/* TITLE */}
      <h3 className={styles.cardTitle}>{blog.title}</h3>

      {/* META */}
      <div className={styles.meta}>
        <span>● {blog.author || "Admin"}</span>
        <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      {/* DESCRIPTION */}
      <p className={styles.cardExcerpt}>
        {(blog.excerpt || "No description available.").slice(0, 150)}...
      </p>

      {/* BUTTON */}
      <Link to={`/blog/${blog.slug}`}>
        <button className={styles.button}>Read More →</button>
      </Link>
    </div>
  );
};

export default BlogCard;
