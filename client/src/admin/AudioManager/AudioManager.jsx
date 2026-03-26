import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import AudioForm from "./components/AudioForm";
import AudioList from "./components/AudioList";

export default function AudioManager() {
  const [audioList, setAudioList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingAudio, setEditingAudio] = useState(null);

  const fetchAudio = async () => {
    try {
      setLoading(true);
      const { data } = await adminApi.get("/api/audio/admin");
      setAudioList(data);
    } catch (error) {
      console.log("FETCH AUDIO ERROR:", error?.response || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudio();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this audio?");
    if (!confirmDelete) return;

    try {
      await adminApi.delete(`/api/audio/${id}`);
      setAudioList((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to delete audio");
    }
  };

  const handleTogglePublish = async (audio) => {
    try {
      const { data } = await adminApi.put(`/api/audio/${audio._id}`, {
        isPublished: !audio.isPublished,
      });

      setAudioList((prev) => prev.map((a) => (a._id === audio._id ? data : a)));
    } catch (error) {
      console.log(error);
      alert("Failed to update publish status");
    }
  };

  return (
    <div>
      <h1>Audio Sermons</h1>
      <p>Add SoundCloud links and manage publishing.</p>

      <AudioForm
        editingAudio={editingAudio}
        onSuccess={() => {
          setEditingAudio(null);
          fetchAudio();
        }}
      />

      <h2>All Audio</h2>

      {loading ? (
        <p>Loading audio...</p>
      ) : audioList.length === 0 ? (
        <p>No audio uploaded yet.</p>
      ) : (
        <AudioList
          audioList={audioList}
          onDelete={handleDelete}
          onTogglePublish={handleTogglePublish}
          onEdit={setEditingAudio}
        />
      )}
    </div>
  );
}
