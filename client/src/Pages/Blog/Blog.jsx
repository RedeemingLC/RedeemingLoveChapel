import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../utils/api"; // ✅ FIXED

import styles from "./Blog.module.css";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import ShareButtons from "../../components/ShareButtons/ShareButtons";

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

      const { data } = await api.get(
        `/blog?page=${currentPage}&limit=${limit}${
          selectedCategory ? `&category=${selectedCategory}` : ""
        }`,
      ); // ✅ FIXED

      setBlogs(Array.isArray(data?.data) ? data.data : []);
      setTotalPages(data?.pagination?.totalPages || 1);
    } catch (error) {
      console.log("FETCH BLOG ERROR:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleBlog = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/blog/${slug}`); // ✅ FIXED

      setSingleBlog(data?.data || null);
    } catch (error) {
      console.log("FETCH SINGLE BLOG ERROR:", error);
      setSingleBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "/placeholder.jpg";
    return path; // ✅ FIXED (no localhost)
  };

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

  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  const relatedBlogs = blogs
    .filter((b) => b._id !== singleBlog?._id)
    .slice(0, 3);

  // ✅ Prevent crash
  if (!Array.isArray(blogs)) {
    return <p>Loading blog posts...</p>;
  }

  return (
    <Section>
      <Container>
        {!slug ? (
          <>
            {featuredBlog && (
              <div className={styles.featured}>
                <div className={styles.featuredText}>
                  <h1 className={`gradientText ${styles.featuredTitle}`}>
                    {featuredBlog.title}
                  </h1>

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
                </div>
              </div>
            )}

            {loading ? (
              <p>Loading blog posts...</p>
            ) : blogs.length === 0 ? (
              <p>No blog posts available.</p>
            ) : (
              <div className={styles.grid}>
                {otherBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <p>Loading blog...</p>
            ) : singleBlog ? (
              <>
                <h1>{singleBlog.title}</h1>

                <div
                  dangerouslySetInnerHTML={{
                    __html: singleBlog.content,
                  }}
                />

                <Link to="/blog">
                  <Button variant="outline">← Back to Blog</Button>
                </Link>
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
