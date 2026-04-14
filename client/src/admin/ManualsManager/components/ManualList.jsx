import { useNavigate } from "react-router-dom";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import styles from "./ManualList.module.css";

export default function ManualList({
  manuals,
  onDelete,
  onTogglePublish,
  onEdit,
}) {
  const navigate = useNavigate();

  return (
    <div className={styles.list}>
      {manuals.map((manual) => (
        <Card key={manual._id} className={styles.card}>
          <div className={styles.row}>
            {manual.coverImage && (
              <img
                src={`http://localhost:5000${manual.coverImage}`}
                alt={manual.title}
                className={styles.image}
              />
            )}

            <div className={styles.content}>
              <h3>{manual.title}</h3>

              <p className={styles.description}>
                {manual.description || "No description"}
              </p>

              <p className={styles.meta}>
                Category: {manual.category?.name || "Unassigned"}
              </p>

              <p className={styles.status}>
                {manual.isPublished ? "Published" : "Draft"}
              </p>
            </div>
          </div>

          <div className={styles.actions}>
            <Button variant="outline" onClick={() => onEdit(manual)}>
              Edit
            </Button>

            <Button
              variant={manual.isPublished ? "ghost" : "primary"}
              onClick={() => onTogglePublish(manual)}
            >
              {manual.isPublished ? "Unpublish" : "Publish"}
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate(`/admin/manuals/${manual._id}/sections`)}
            >
              Sections
            </Button>

            <Button variant="ghost" onClick={() => onDelete(manual._id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
