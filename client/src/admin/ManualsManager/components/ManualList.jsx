import { useNavigate } from "react-router-dom";

export default function ManualList({
  manuals,
  onDelete,
  onTogglePublish,
  onEdit,
}) {
  const navigate = useNavigate();

  return (
    <div>
      {manuals.map((manual) => (
        <div
          key={manual._id}
          style={{
            border: "1px solid #ddd",
            padding: "1.5rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            background: "#f9f9f9",
          }}
        >
          <div
            style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
          >
            {/* 🔥 COVER IMAGE */}
            {manual.coverImage && (
              <img
                src={`http://localhost:5000${manual.coverImage}`} // 🔥 FULL URL
                alt={manual.title}
                style={{
                  width: "80px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  border: "1px solid #eee",
                }}
                onError={(e) => {
                  console.log("❌ IMAGE ERROR:", manual.coverImage);
                  e.target.src = "/placeholder.jpg"; // fallback
                }}
                onLoad={() => console.log("✅ LOADED:", manual.coverImage)}
              />
            )}

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{manual.title}</h3>

              <p style={{ margin: "0 0 1rem 0", color: "#666" }}>
                {manual.description || "No description"}
              </p>

              {/* 🔥 PDF LINK */}
              {manual.fileUrl && (
                <div style={{ marginBottom: "1rem" }}>
                  <a
                    href={`http://localhost:5000${manual.fileUrl}`} // 🔥 FULL URL
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#667eea",
                      textDecoration: "none",
                      padding: "0.5rem",
                      background: "white",
                      borderRadius: "4px",
                      border: "1px solid #667eea",
                    }}
                  >
                    📄 View PDF
                  </a>
                </div>
              )}

              <p style={{ margin: "0 0 1rem 0" }}>
                <strong>Status:</strong>{" "}
                {manual.isPublished ? "🟢 Published" : "🔴 Draft"}
              </p>
            </div>
          </div>

          {/* 🔥 ACTION BUTTONS */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => onEdit(manual)}
              style={{
                padding: "0.5rem 1rem",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => onTogglePublish(manual)}
              style={{
                padding: "0.5rem 1rem",
                background: manual.isPublished ? "#ef4444" : "#10b981",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {manual.isPublished ? "📴 Unpublish" : "📱 Publish"}
            </button>

            <button
              style={{
                padding: "0.5rem 1rem",
                background: "#6b7280",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/admin/manuals/${manual._id}/sections`)}
            >
              📂 Sections
            </button>

            <button
              style={{
                padding: "0.5rem 1rem",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => onDelete(manual._id)}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
