import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./AdminStudyEditor.module.css";
import api from "../../../utils/api";
import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor";

export default function AdminStudyEditor() {
  const { studyId } = useParams();

  const [study, setStudy] = useState(null);
  const [editingDayId, setEditingDayId] = useState(null);
  const [entryContent, setEntryContent] = useState("");

  const [dayForm, setDayForm] = useState({
    dayNumber: 1,
    title: "",
    reflectionPrompt: "",
    hasPauseDivider: true,
    pauseText: "Pause & Reflect",
    content: "", // ✅ changed from blocks → content
  });

  const fetchAll = async () => {
    const res = await api.get(`/studies/${studyId}`);
    setStudy(res.data);
    setEntryContent(res.data.entryContent || ""); // ✅ FIXED
  };

  useEffect(() => {
    fetchAll();
  }, [studyId]);

  const sortedDays = useMemo(() => {
    if (!study?.days) return [];

    return [...study.days].sort((a, b) => {
      return (a.dayNumber ?? 9999) - (b.dayNumber ?? 9999);
    });
  }, [study]);

  const startEditDay = (day) => {
    setEditingDayId(day._id);

    setDayForm({
      dayNumber: day.dayNumber,
      title: day.title || "",
      reflectionPrompt: day.reflectionPrompt || "",
      hasPauseDivider: day.hasPauseDivider ?? true,
      pauseText: day.pauseText || "Pause & Reflect",
      content: day.content || "",
    });
  };

  const saveEntryContent = async () => {
    await updateStudy({ entryContent });
  };

  const updateStudy = async (patch) => {
    console.log("PATCH SENT:", patch); // 👈 ADD THIS
    const res = await api.put(`/studies/${studyId}`, patch);
    setStudy(res.data);

    // ✅ Keep entryContent in sync if updated
    if (patch.entryContent !== undefined) {
      setEntryContent(res.data.entryContent || "");
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("userToken");

      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ THIS FIXES IT
        },
      });

      const imageUrl = res.data.imageUrl;

      setStudy((prev) => ({
        ...prev,
        coverImage: imageUrl,
      }));

      await updateStudy({ coverImage: imageUrl });
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed");
    }
  };

  const createDay = async (e) => {
    e.preventDefault();

    if (!dayForm.content || dayForm.content.trim() === "") {
      alert("Please add content before saving.");
      return;
    }

    let updatedDays;

    if (editingDayId) {
      updatedDays = study.days.map((d) =>
        d._id === editingDayId ? { ...d, ...dayForm } : d,
      );
    } else {
      updatedDays = [...(study.days || []), dayForm];
    }

    try {
      const res = await api.put(`/studies/${studyId}`, {
        days: updatedDays,
      });

      console.log("UPDATED STUDY:", res.data); // ✅ safe here

      setStudy(res.data);

      setDayForm((p) => ({
        ...p,
        title: "",
        reflectionPrompt: "",
        content: "",
      }));

      setEditingDayId(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const deleteDay = async (id) => {
    if (!confirm("Delete this day?")) return;

    const updatedDays = study.days.filter((d) => d._id !== id);

    const res = await api.put(`/studies/${studyId}`, {
      days: updatedDays,
    });

    setStudy(res.data);
  };

  if (!study) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <h1>Edit Study</h1>
        <button
          className={study.isPublished ? styles.published : styles.draft}
          onClick={() => updateStudy({ isPublished: !study.isPublished })}
        >
          {study.isPublished ? "Unpublish" : "Publish"}
        </button>
      </div>

      {/* Study Info */}
      <section className={styles.section}>
        <h2>Study Info</h2>

        <label>
          Title
          <input
            value={study.title}
            onChange={(e) => setStudy((p) => ({ ...p, title: e.target.value }))}
            onBlur={() => updateStudy({ title: study.title })}
          />
        </label>

        <label>
          Description
          <textarea
            value={study.description}
            onChange={(e) =>
              setStudy((p) => ({ ...p, description: e.target.value }))
            }
            onBlur={() => updateStudy({ description: study.description })}
          />
        </label>

        <label>
          Topic
          <input
            value={study.topic || ""}
            onChange={(e) => setStudy((p) => ({ ...p, topic: e.target.value }))}
            onBlur={() => updateStudy({ topic: study.topic })}
            placeholder="e.g. The Doctrine of Christ"
          />
        </label>

        <label>
          Cover Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
        </label>

        {study.coverImage && (
          <img
            src={study.coverImage}
            alt="Preview"
            style={{
              width: "150px",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          />
        )}

        <label>
          Entry Title
          <input
            value={study.entryTitle}
            onChange={(e) =>
              setStudy((p) => ({ ...p, entryTitle: e.target.value }))
            }
            onBlur={() => updateStudy({ entryTitle: study.entryTitle })}
          />
        </label>

        <label>
          Entry Subtitle
          <input
            value={study.entrySubtitle}
            onChange={(e) =>
              setStudy((p) => ({ ...p, entrySubtitle: e.target.value }))
            }
            onBlur={() => updateStudy({ entrySubtitle: study.entrySubtitle })}
          />
        </label>
      </section>

      <div className={styles.section}>
        <h2>Entry Content</h2>

        <p className={styles.hint}>
          This appears before users start the study.
        </p>

        <RichTextEditor value={entryContent} onChange={setEntryContent} />

        <button className={styles.saveBtn} onClick={saveEntryContent}>
          Save Entry Content
        </button>
      </div>

      {/* Days */}
      <section className={styles.section}>
        <h2>Days</h2>

        <form className={styles.dayForm} onSubmit={createDay}>
          <div className={styles.row}>
            <input
              type="number"
              min="1"
              placeholder="Day Number"
              value={dayForm.dayNumber}
              onChange={(e) =>
                setDayForm((p) => ({
                  ...p,
                  dayNumber: Number(e.target.value),
                }))
              }
              required
            />
          </div>

          <input
            placeholder="Title"
            value={dayForm.title}
            onChange={(e) =>
              setDayForm((p) => ({ ...p, title: e.target.value }))
            }
            required
          />

          <textarea
            placeholder="Reflection prompt (optional)"
            value={dayForm.reflectionPrompt}
            onChange={(e) =>
              setDayForm((p) => ({
                ...p,
                reflectionPrompt: e.target.value,
              }))
            }
          />

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={dayForm.hasPauseDivider}
              onChange={(e) =>
                setDayForm((p) => ({
                  ...p,
                  hasPauseDivider: e.target.checked,
                }))
              }
            />
            Has pause divider
          </label>

          <input
            placeholder="Pause text"
            value={dayForm.pauseText}
            onChange={(e) =>
              setDayForm((p) => ({
                ...p,
                pauseText: e.target.value,
              }))
            }
          />

          {/* ✅ RichTextEditor replaces BlockEditor */}
          <RichTextEditor
            value={dayForm.content}
            onChange={(val) =>
              setDayForm((prev) => ({
                ...prev,
                content: val,
              }))
            }
          />

          <button>{editingDayId ? "Update Day" : "Add Day"}</button>
        </form>

        <div className={styles.daysList}>
          {sortedDays.map((d) => (
            <div key={d._id} className={styles.dayCard}>
              <h3>
                Day {d.dayNumber} — {d.title}
              </h3>

              <button
                className={styles.danger}
                onClick={() => deleteDay(d._id)}
              >
                Delete
              </button>
              <button onClick={() => startEditDay(d)}>Edit</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
