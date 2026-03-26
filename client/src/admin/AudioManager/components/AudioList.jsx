export default function AudioList({
  audioList,
  onDelete,
  onTogglePublish,
  onEdit,
}) {
  return (
    <div>
      {audioList.map((audio) => (
        <div
          key={audio._id}
          style={{
            border: "1px solid #ddd",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3>{audio.title}</h3>

          <p>{audio.speaker}</p>

          <p>Status: {audio.isPublished ? "Published" : "Draft"}</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => onEdit(audio)}>Edit</button>

            <button onClick={() => onTogglePublish(audio)}>
              {audio.isPublished ? "Unpublish" : "Publish"}
            </button>

            <button
              style={{ color: "red" }}
              onClick={() => onDelete(audio._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
