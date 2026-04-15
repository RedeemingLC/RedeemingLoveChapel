import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import StatCard from "../../components/StatCard/StatCard";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    manuals: 0,
    categories: 0,
    sermons: 0,
    blog: 0,
  });

  const fetchStats = async () => {
    try {
      const [manualsRes, categoriesRes, sermonsRes, blogRes] =
        await Promise.all([
          adminApi.get("/manuals/published"), // ✅ FIXED
          adminApi.get("/categories"), // ✅ FIXED
          adminApi.get("/audio"), // ✅ FIXED
          adminApi.get("/blog"), // ✅ FIXED
        ]);

      setStats({
        manuals: Array.isArray(manualsRes.data) ? manualsRes.data.length : 0,

        categories: Array.isArray(categoriesRes.data?.data)
          ? categoriesRes.data.data.length
          : 0,

        sermons: Array.isArray(sermonsRes.data) ? sermonsRes.data.length : 0,

        blog: Array.isArray(blogRes.data?.data) ? blogRes.data.data.length : 0,
      });
    } catch (error) {
      console.log("STATS ERROR:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <div className="adminHeader">
        <h1>Dashboard Overview</h1>
        <p>Welcome to the admin panel. Use the sidebar to manage content.</p>
      </div>

      <div className="grid grid-layout-2-col">
        <StatCard title="Total Manuals" value={stats.manuals} />
        <StatCard title="Categories" value={stats.categories} />
        <StatCard title="Audio Sermons" value={stats.sermons} />
        <StatCard title="Blog Posts" value={stats.blog} />
      </div>
    </>
  );
}
