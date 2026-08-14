import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import adminApi from "../../services/adminApi";
import ManualForm from "./components/ManualForm";
import ManualList from "./components/ManualList";

export default function ManualsManager() {
  const [manuals, setManuals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingManual, setEditingManual] = useState(null);

  const fetchManuals = async () => {
    try {
      setLoading(true);

      const { data } = await adminApi.get("/manuals/admin");

      setManuals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("FETCH MANUALS ERROR:", error?.response || error);

      setManuals([]);

      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch manuals",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManuals();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this manual?")) return;

    try {
      await adminApi.delete(`/manuals/${id}`);

      toast.success("Manual deleted successfully");

      fetchManuals();
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete manual",
      );
    }
  };

  const handleTogglePublish = async (manual) => {
    try {
      await adminApi.put(`/manuals/${manual._id}`, {
        isPublished: !manual.isPublished,
      });

      toast.success(
        manual.isPublished
          ? "Manual unpublished"
          : "Manual published",
      );

      fetchManuals();
    } catch (error) {
      console.error(
        "PUBLISH ERROR:",
        error.response?.data || error.message,
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to update publish status",
      );
    }
  };

  return (
    <>
      <div className="adminHeader">
        <h1>Manuals Manager</h1>
        <p>Create, edit and manage all manuals</p>
      </div>

      <ManualForm
        editingManual={editingManual}
        onSuccess={() => {
          setEditingManual(null);
          fetchManuals();
        }}
      />

      <div className="adminSection">
        <h2>All Manuals</h2>

        {loading ? (
          <p>Loading manuals...</p>
        ) : manuals.length === 0 ? (
          <p>No manuals uploaded yet.</p>
        ) : (
          <ManualList
            manuals={manuals}
            onDelete={handleDelete}
            onTogglePublish={handleTogglePublish}
            onEdit={setEditingManual}
          />
        )}
      </div>
    </>
  );
}