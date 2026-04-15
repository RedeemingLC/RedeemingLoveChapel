import adminApi from "../../services/adminApi";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import styles from "./SubsectionList.module.css";

function SubsectionList({
  subsections,
  setEditingSubsection,
  fetchSubsections,
}) {
  const deleteSubsection = async (id) => {
    if (!window.confirm("Delete this lesson?")) return;

    try {
      await adminApi.delete(`/subsections/${id}`); // ✅ FIXED
      fetchSubsections();
    } catch (error) {
      console.log("DELETE SUBSECTION ERROR:", error);
      alert("Failed to delete lesson");
    }
  };

  // ✅ Prevent crash
  if (!Array.isArray(subsections)) {
    return <p>Loading lessons...</p>;
  }

  // ✅ Empty state
  if (subsections.length === 0) {
    return <p>No lessons available.</p>;
  }

  return (
    <div className={styles.list}>
      {subsections.map((sub) => (
        <Card key={sub._id} className={styles.card}>
          <div className={styles.content}>
            <h3>{sub.title}</h3>

            <p className={styles.preview}>
              {sub.blocks?.[0]?.value?.slice(0, 150) || "No content"}...
            </p>
          </div>

          <div className={styles.actions}>
            <Button variant="outline" onClick={() => setEditingSubsection(sub)}>
              Edit
            </Button>

            <Button variant="ghost" onClick={() => deleteSubsection(sub._id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default SubsectionList;
