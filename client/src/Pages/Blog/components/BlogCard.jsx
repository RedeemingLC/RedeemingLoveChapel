import { Link } from "react-router-dom";
import styles from "./BlogCard.module.css";

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "");

const getImageUrl = (path) => {
  if (!path) return "/placeholder.jpg";
  if (path.startsWith("http")) return path;

  return `${BASE_URL}${path}`;
};

const BlogCard = ({ blog }) => {
  return (
    <div className={styles.blogCard}>
      <div className={styles.imageWrapper}>
        <img src={getImageUrl(blog.featuredImage)} alt={blog.title} />

        <span className="badge">{blog.category?.name || "Category"}</span>
      </div>

      <h3 className={styles.cardTitle}>{blog.title}</h3>

      <div className={styles.meta}>
        <span>● {blog.author || "Admin"}</span>
        <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      <p className={styles.cardExcerpt}>
        {(blog.excerpt || "No description available.").slice(0, 150)}...
      </p>

      <Link to={`/blog/${blog.slug}`} className={styles.readMoreButton}>
        Read More →
      </Link>
    </div>
  );
};

export default BlogCard;
