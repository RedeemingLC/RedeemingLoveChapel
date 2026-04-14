import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import styles from "./AudioList.module.css";

export default function AudioList({
  audioList,
  onDelete,
  onTogglePublish,
  onEdit,
}) {
  return (
    <div className={styles.list}>
      {audioList.map((audio) => (
        <Card key={audio._id} className={styles.card}>
          <div className={styles.content}>
            <h3>{audio.title}</h3>

            <p className={styles.meta}>{audio.speaker}</p>

            <p className={styles.status}>
              {audio.isPublished ? "Published" : "Draft"}
            </p>
          </div>

          <div className={styles.actions}>
            <Button variant="outline" onClick={() => onEdit(audio)}>
              Edit
            </Button>

            <Button
              variant={audio.isPublished ? "ghost" : "primary"}
              onClick={() => onTogglePublish(audio)}
            >
              {audio.isPublished ? "Unpublish" : "Publish"}
            </Button>

            <Button variant="ghost" onClick={() => onDelete(audio._id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}