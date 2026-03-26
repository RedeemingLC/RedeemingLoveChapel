import adminApi from "../../services/adminApi";

function SubsectionList({
  subsections,
  setEditingSubsection,
  fetchSubsections,
}) {
  const deleteSubsection = async (id) => {
    if (!window.confirm("Delete this lesson?")) return;

    await adminApi.delete(`/api/subsections/${id}`);

    fetchSubsections();
  };

  return (
    <div>
      <h3>Lessons</h3>

      {subsections.map((sub) => (
        <div key={sub._id} style={{ marginBottom: "20px" }}>
          <strong>{sub.title}</strong>

          {/* Lesson preview */}
          <p style={{ marginTop: "5px", color: "#555" }}>
            {sub.blocks?.[0]?.value?.slice(0, 250)}...
          </p>

          <button onClick={() => setEditingSubsection(sub)}>Edit</button>

          <button onClick={() => deleteSubsection(sub._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default SubsectionList;
