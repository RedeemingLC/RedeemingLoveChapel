import adminApi from "../../services/adminApi";
import { useNavigate } from "react-router-dom";

function ContentList({ contents, setEditingContent, fetchContents }) {
  const navigate = useNavigate();
  const deleteContent = async (id) => {
    if (!window.confirm("Delete this content?")) return;

    await adminApi.delete(`/api/content/${id}`);

    fetchContents();
  };

  return (
    <div>
      <h3>Existing Content</h3>

      {contents.map((content) => (
        <div key={content._id}>
          <strong>{content.title}</strong>
          <span> ({content.type}) </span>

          <button onClick={() => setEditingContent(content)}>Edit</button>

          <button onClick={() => deleteContent(content._id)}>Delete</button>

          <button
            onClick={() => navigate(`/admin/content/${content._id}/sections`)}
          >
            Sections
          </button>
        </div>
      ))}
    </div>
  );
}

export default ContentList;
