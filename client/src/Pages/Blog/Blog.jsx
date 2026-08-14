import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api"; // ✅ FIXED

import DOMPurify from "dompurify";

import styles from "./Blog.module.css";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import ShareButtons from "../../components/ShareButtons/ShareButtons";

import BlogCard from "../Blog/components/BlogCard";

// ✅ FIXED: base URL helper
const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "");

const getImageUrl = (path) => {
  if (!path) return "/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
};

const Blog = () => {
  const { slug } = useParams();
  const { user } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [singleBlog, setSingleBlog] = useState(null);
  const [singleLoading, setSingleLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");

      const safeCategories = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
          ? data
          : [];

      setCategories(safeCategories);
    } catch (error) {
      console.error("FETCH CATEGORIES ERROR:", error);
      setCategories([]);
    }
  };

  const fetchFeaturedBlog = async () => {
    try {
      const { data } = await api.get("/blog?page=1&limit=1");

      const posts = Array.isArray(data?.data) ? data.data : [];

      setFeaturedBlog(posts[0] || null);
    } catch (error) {
      console.error("FETCH FEATURED BLOG ERROR:", error);
      setFeaturedBlog(null);
    }
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/blog?page=${currentPage}&limit=${limit}${
          selectedCategory ? `&category=${selectedCategory}` : ""
        }`,
      ); // ✅ FIXED

      const safeBlogs = Array.isArray(data?.data) ? data.data : [];

      setBlogs(safeBlogs);
      setTotalPages(data?.pagination?.totalPages || 1);
    } catch (error) {
      console.error("FETCH BLOG ERROR:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleBlog = async () => {
    try {
      setSingleLoading(true);

      const { data } = await api.get(`/blog/${slug}`);

      setSingleBlog(data?.data || null);
    } catch (error) {
      console.error("FETCH SINGLE BLOG ERROR:", error);
      setSingleBlog(null);
    } finally {
      setSingleLoading(false);
    }
  };

  useEffect(() => {
    if (!slug) {
      fetchCategories();
      fetchFeaturedBlog();
    }
  }, [slug]);

  useEffect(() => {
    setBlogs([]);
    setSingleBlog(null);

    if (slug) {
      fetchSingleBlog();
      fetchBlogs();
    } else {
      fetchBlogs();
    }
  }, [slug, currentPage, selectedCategory]);

  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  const otherBlogs = safeBlogs.filter((blog) => blog._id !== featuredBlog?._id);

  const relatedBlogs = safeBlogs
    .filter((b) => b._id !== singleBlog?._id)
    .slice(0, 3);

  return (
    <>
      <Section>
        <Container>
          {!slug ? (
            <>
              {/* FEATURED */}
              {featuredBlog && (
                <div className={styles.featured}>
                  <div className={styles.featuredText}>
                    <h1 className={`gradientText ${styles.featuredTitle}`}>
                      {featuredBlog.title}
                    </h1>

                    <div className={styles.meta}>
                      <span>● Admin</span>
                      <span>
                        📅{" "}
                        {new Date(featuredBlog.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p>
                      {featuredBlog.excerpt
                        ? featuredBlog.excerpt.slice(0, 300) + "..."
                        : "No description available."}
                    </p>

                    <Link
                      to={`/blog/${featuredBlog.slug}`}
                      className={styles.primaryLink}
                    >
                      Read More →
                    </Link>
                  </div>

                  <div className={styles.featuredImageWrapper}>
                    <img
                      src={getImageUrl(featuredBlog.featuredImage)} // ✅ FIXED
                      alt={featuredBlog.title}
                    />
                    <span className="badge">Featured Article</span>
                  </div>
                </div>
              )}

              {/* CATEGORY */}
              <div className={styles.categoryWrapper}>
                <Button
                  variant={selectedCategory === "" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("");
                    setCurrentPage(1);
                  }}
                >
                  All
                </Button>

                {categories.map((category) => (
                  <Button
                    key={category._id}
                    variant={
                      selectedCategory === category._id ? "primary" : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(category._id);
                      setCurrentPage(1);
                    }}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* BLOG GRID */}
              {loading ? (
                <p>Loading blog posts...</p>
              ) : safeBlogs.length === 0 ? (
                <p>No blog posts available.</p>
              ) : (
                otherBlogs.length > 0 && (
                  <div className={styles.grid}>
                    {otherBlogs.map((blog) => (
                      <BlogCard key={blog._id} blog={blog} />
                    ))}
                  </div>
                )
              )}

              {/* PAGINATION */}
              {!loading && totalPages > 1 && (
                <div className={styles.pagination}>
                  <Button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </Button>

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
            <>
              {singleLoading ? (
                <p>Loading blog...</p>
              ) : singleBlog ? (
                <>
                  <div className={styles.singleContainer}>
                    <div className={styles.singleHero}>
                      <h1 className={styles.singleTitle}>{singleBlog.title}</h1>

                      <div className={styles.metaCentered}>
                        <span>● {singleBlog.author || "Admin"}</span>
                        <span>
                          📅{" "}
                          {new Date(singleBlog.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <p className={styles.singleExcerpt}>
                        {singleBlog.excerpt || ""}
                      </p>
                    </div>
                  </div>

                  {singleBlog.featuredImage && (
                    <Container>
                      <div className={styles.imageWrapperSingle}>
                        <img
                          src={getImageUrl(singleBlog.featuredImage)} // ✅ FIXED
                          alt={singleBlog.title}
                        />
                      </div>
                    </Container>
                  )}

                  <div
                    className={`${styles.singleContainer} ${styles.singleEnd}`}
                  >
                    <div
                      className={styles.singleContent}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(singleBlog.content || ""),
                      }}
                    />

                    <div className={styles.share}>
                      <h4>Share this post:</h4>

                      <div className={styles.shareRow}>
                        <ShareButtons
                          title={singleBlog.title}
                          url={window.location.href}
                        />
                      </div>
                    </div>

                    <div className={styles.backWrapper}>
                      <Link to="/blog" className={styles.outlineLink}>
                        ← Back to Blog
                      </Link>

                      {user?.role === "admin" && (
                        <Link
                          to={`/admin/blog?edit=${singleBlog._id}`}
                          className={styles.primaryLink}
                        >
                          Edit Blog
                        </Link>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <p>Blog not found.</p>
              )}
            </>
          )}
        </Container>
      </Section>

      {slug && relatedBlogs.length > 0 && (
        <Section className={styles.relatedSection}>
          <Container>
            <h2 className={styles.relatedTitle}>Related Posts</h2>

            <div className={styles.relatedGrid}>
              {relatedBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
};

export default Blog;
