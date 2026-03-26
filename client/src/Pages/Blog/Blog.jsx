import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import styles from "./Blog.module.css";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";

import BlogCard from "../Blog/components/BlogCard";

const Blog = () => {
  const { slug } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [singleBlog, setSingleBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `/api/blog?page=${currentPage}&limit=${limit}${
          selectedCategory ? `&category=${selectedCategory}` : ""
        }`,
      );

      setBlogs(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.log("FETCH BLOG ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleBlog = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/blog/${slug}`);
      setSingleBlog(data.data);
    } catch (error) {
      console.log("FETCH SINGLE BLOG ERROR:", error);
      setSingleBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "/placeholder.jpg"; // optional fallback

    return path.startsWith("http") ? path : `http://localhost:5000${path}`;
  };

  useEffect(() => {
    setBlogs([]);
    setSingleBlog(null);

    if (slug) {
      fetchSingleBlog(); // ✅ get the current blog
      fetchBlogs(); // ✅ ALSO get all blogs for related posts
    } else {
      fetchBlogs(); // ✅ normal list view
    }
  }, [slug, currentPage, selectedCategory]);

  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);
  const relatedBlogs = blogs
    .filter((b) => b._id !== singleBlog?._id) // exclude current
    .slice(0, 3); // limit to 3

  return (
    <Section>
      <Container>
        {/* ================= LIST VIEW ================= */}
        {!slug ? (
          <>
            {featuredBlog && (
              <div className={styles.featured}>
                <div className={styles.featuredText}>
                  <h1 className={styles.featuredTitle}>{featuredBlog.title}</h1>

                  <div className={styles.meta}>
                    <span>● Admin</span>
                    <span>
                      📅 {new Date(featuredBlog.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p>
                    {featuredBlog.excerpt
                      ? featuredBlog.excerpt.slice(0, 300) + "..."
                      : "No description available."}
                  </p>

                  <Link to={`/blog/${featuredBlog.slug}`}>
                    <Button>Read More →</Button>
                  </Link>
                </div>

                <div className={styles.featuredImageWrapper}>
                  <img
                    src={getImageUrl(featuredBlog.featuredImage)}
                    alt={featuredBlog.title}
                  />
                  <span className={styles.badge}>Featured Article</span>
                </div>
              </div>
            )}

            <div className={styles.categoryWrapper}>
              {["", "faith", "grace", "doctrine"].map((cat) => (
                <button
                  key={cat}
                  className={`${styles.categoryBtn} ${
                    selectedCategory === cat ? styles.active : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                >
                  {cat === "" ? "All" : cat}
                </button>
              ))}
            </div>

            {loading ? (
              <p>Loading blog posts...</p>
            ) : blogs.length === 0 ? (
              <p>No blog posts available.</p>
            ) : (
              <>
                {/* BLOG GRID */}
                {otherBlogs.length > 0 && (
                  <div className={styles.grid}>
                    {otherBlogs.map((blog) => (
                      <BlogCard key={blog._id} blog={blog} />
                    ))}
                  </div>
                )}
              </>
            )}

            {!loading && totalPages > 1 && (
              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* Previous */}
                <Button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </Button>

                {/* Numbered Buttons */}
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <Button
                      key={pageNumber}
                      variant={
                        currentPage === pageNumber ? "primary" : "outline"
                      }
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}

                {/* Next */}
                <Button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          /* ================= SINGLE VIEW ================= */
          <>
            {loading ? (
              <p>Loading blog...</p>
            ) : singleBlog ? (
              <>
                {/* ================= SINGLE CONTAINER ================= */}
                <div className={styles.singleContainer}>
                  {/* HERO */}
                  <div className={styles.singleHero}>
                    <h1 className={`text-grad ${styles.singleTitle}`}>
                      {singleBlog.title}
                    </h1>

                    {/* META */}
                    <div className={styles.metaCentered}>
                      <span>● {singleBlog.author || "Admin"}</span>
                      <span>
                        📅 {new Date(singleBlog.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* EXCERPT */}
                    <p className={styles.singleExcerpt}>
                      {singleBlog.excerpt || ""}
                    </p>
                  </div>
                </div>

                {/* IMAGE */}
                {singleBlog.featuredImage && (
                  <div className={styles.fullWidthImage}>
                    <img
                      src={getImageUrl(singleBlog.featuredImage)}
                      alt={singleBlog.title}
                    />
                  </div>
                )}

                {/* CONTENT */}
                <div className={styles.singleContainer}>
                  <div
                    className={styles.singleContent}
                    dangerouslySetInnerHTML={{
                      __html: singleBlog.content,
                    }}
                  />

                  {/* SHARE */}
                  <div className={styles.share}>
                    <h4>Share this post:</h4>

                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        window.location.href,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>

                    {" | "}

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.href,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </div>

                  {/* BACK BUTTON */}
                  <Link to="/blog">
                    <Button variant="outline">← Back to Blog</Button>
                  </Link>
                </div>

                {/* ================= RELATED POSTS (OUTSIDE) ================= */}
                {relatedBlogs.length > 0 && (
                  <div className={styles.relatedSection}>
                    <h2 className={styles.relatedTitle}>Related Posts</h2>

                    <div className={styles.relatedGrid}>
                      {relatedBlogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p>Blog not found.</p>
            )}
          </>
        )}
      </Container>
    </Section>
  );
};

export default Blog;
