import adminApi from "../../services/adminApi";
import { useNavigate } from "react-router-dom";

function SectionList({ sections, setEditingSection, fetchSections }) {
  const navigate = useNavigate();

  const deleteSection = async (id) => {
    if (!window.confirm("Delete this section?")) return;

    await adminApi.delete(`/api/sections/${id}`);

    fetchSections();
  };

  return (
    <div>
      <h3>Sections</h3>

      {sections.map((section) => (
        <div key={section._id} style={{ marginBottom: "15px" }}>
          <strong>{section.title}</strong>

          <div style={{ marginTop: "5px", display: "flex", gap: "10px" }}>
            <button onClick={() => setEditingSection(section)}>Edit</button>

            <button onClick={() => deleteSection(section._id)}>Delete</button>

            <button
              onClick={() => navigate(`/admin/sections/${section._id}/lessons`)}
            >
              Lessons
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SectionList;
