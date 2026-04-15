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
    content: "",
  });

  const fetchAll = async () => {
    try {
      const res = await api.get(`/studies/${studyId}`);
      setStudy(res.data);
      setEntryContent(res.data.entryContent || "");
    } catch (error) {
      console.log("FETCH STUDY ERROR:", error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [studyId]);

  const sortedDays = useMemo(() => {
    if (!study?.days) return [];
    return [...study.days].sort(
      (a, b) => (a.dayNumber ?? 9999) - (b.dayNumber ?? 9999),
    );
  }, [study]);

  const safeDays = Array.isArray(sortedDays) ? sortedDays : [];

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

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateStudy = async (patch) => {
    try {
      const res = await api.put(`/studies/${studyId}`, patch);
      setStudy(res.data);

      if (patch.entryContent !== undefined) {
        setEntryContent(res.data.entryContent || "");
      }
    } catch (error) {
      console.log("UPDATE ERROR:", error);
    }
  };

  const saveEntryContent = async () => {
    await updateStudy({ entryContent });
  };

  const createDay = async (e) => {
    e.preventDefault();

    if (!dayForm.content.trim()) {
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

      setStudy(res.data);

      setDayForm((p) => ({
        ...p,
        title: "",
        reflectionPrompt: "",
        content: "",
      }));

      setEditingDayId(null);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const deleteDay = async (id) => {
    if (!window.confirm("Delete this day?")) return;

    try {
      const updatedDays = study.days.filter((d) => d._id !== id);

      const res = await api.put(`/studies/${studyId}`, {
        days: updatedDays,
      });

      setStudy(res.data);
    } catch (error) {
      console.log("DELETE DAY ERROR:", error);
    }
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

      <section className={styles.section}>
        <h2>Study Info</h2>

        <input
          value={study.title}
          onChange={(e) => setStudy((p) => ({ ...p, title: e.target.value }))}
          onBlur={() => updateStudy({ title: study.title })}
        />

        <textarea
          value={study.description}
          onChange={(e) =>
            setStudy((p) => ({
              ...p,
              description: e.target.value,
            }))
          }
          onBlur={() => updateStudy({ description: study.description })}
        />
      </section>

      <div className={styles.section}>
        <h2>Entry Content</h2>
        <RichTextEditor value={entryContent} onChange={setEntryContent} />
        <button onClick={saveEntryContent}>Save Entry Content</button>
      </div>

      <section className={styles.section}>
        <h2>Days</h2>

        <form onSubmit={createDay}>
          <input
            type="number"
            value={dayForm.dayNumber}
            onChange={(e) =>
              setDayForm((p) => ({
                ...p,
                dayNumber: Number(e.target.value),
              }))
            }
          />

          <input
            value={dayForm.title}
            onChange={(e) =>
              setDayForm((p) => ({
                ...p,
                title: e.target.value,
              }))
            }
          />

          <RichTextEditor
            value={dayForm.content}
            onChange={(val) =>
              setDayForm((p) => ({
                ...p,
                content: val,
              }))
            }
          />

          <button>{editingDayId ? "Update Day" : "Add Day"}</button>
        </form>

        <div>
          {safeDays.map((d) => (
            <div key={d._id}>
              <h3>
                Day {d.dayNumber} — {d.title}
              </h3>

              <button onClick={() => startEditDay(d)}>Edit</button>
              <button onClick={() => deleteDay(d._id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
