import adminApi from "../../services/adminApi";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import styles from "./SectionList.module.css";

function SectionList({ sections, setEditingSection, fetchSections }) {
  const navigate = useNavigate();

  const deleteSection = async (id) => {
    if (!window.confirm("Delete this section?")) return;

    try {
      await adminApi.delete(`/sections/${id}`); // ✅ FIXED
      fetchSections();
    } catch (error) {
      console.log("DELETE SECTION ERROR:", error);
      alert("Failed to delete section");
    }
  };

  // ✅ Prevent crash
  if (!Array.isArray(sections)) {
    return <p>Loading sections...</p>;
  }

  // ✅ Empty state
  if (sections.length === 0) {
    return <p>No sections available.</p>;
  }

  return (
    <div className={styles.list}>
      {sections.map((section) => (
        <Card key={section._id} className={styles.card}>
          <div className={styles.content}>
            <h3>{section.title}</h3>
          </div>

          <div className={styles.actions}>
            <Button
              variant="outline"
              onClick={() => setEditingSection(section)}
            >
              Edit
            </Button>

            <Button variant="ghost" onClick={() => deleteSection(section._id)}>
              Delete
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate(`/admin/sections/${section._id}/lessons`)}
            >
              Lessons
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default SectionList;
