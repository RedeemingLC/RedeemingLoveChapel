import { useState, useEffect } from "react";
import adminApi from "../../../services/adminApi";

export default function AudioForm({ onSuccess, editingAudio }) {
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [description, setDescription] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingAudio) {
      setTitle(editingAudio.title || "");
      setSpeaker(editingAudio.speaker || "");
      setDescription(editingAudio.description || "");
      setAudioUrl(editingAudio.audioUrl || "");
      setIsPublished(editingAudio.isPublished || false);
    }
  }, [editingAudio]);

  const resetForm = () => {
    setTitle("");
    setSpeaker("");
    setDescription("");
    setAudioUrl("");
    setIsPublished(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        title,
        speaker,
        description,
        audioUrl,
        isPublished,
      };

      if (editingAudio) {
        await adminApi.put(`/audio/${editingAudio._id}`, payload); // ✅ FIXED
      } else {
        await adminApi.post("/audio", payload); // ✅ FIXED
      }

      resetForm();

      if (onSuccess) onSuccess();
    } catch (error) {
      console.log("AUDIO SAVE ERROR:", error?.response || error);
      alert("Failed to save audio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="adminForm">
      <h2>{editingAudio ? "Update Audio" : "Create Audio"}</h2>

      <input
        type="text"
        placeholder="Sermon Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Speaker"
        value={speaker}
        onChange={(e) => setSpeaker(e.target.value)}
        required
      />

      <textarea
        placeholder="Sermon Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
      />

      <input
        type="text"
        placeholder="SoundCloud Embed URL"
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}
        required
      />

      <label className="adminCheckbox">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        Publish immediately
      </label>

      <button type="submit" disabled={loading}>
        {loading
          ? editingAudio
            ? "Updating..."
            : "Saving..."
          : editingAudio
            ? "Update Audio"
            : "Create Audio"}
      </button>
    </form>
  );
}
