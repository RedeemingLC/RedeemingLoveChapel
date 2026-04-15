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
      const { data } = await adminApi.get("/audio/admin"); // ✅ FIXED
      setAudioList(Array.isArray(data) ? data : []); // ✅ SAFE
    } catch (error) {
      console.log("FETCH AUDIO ERROR:", error?.response || error);
      setAudioList([]); // ✅ Prevent crash
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
      await adminApi.delete(`/audio/${id}`); // ✅ FIXED
      setAudioList((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to delete audio");
    }
  };

  const handleTogglePublish = async (audio) => {
    try {
      const { data } = await adminApi.put(`/audio/${audio._id}`, {
        // ✅ FIXED
        isPublished: !audio.isPublished,
      });

      setAudioList((prev) => prev.map((a) => (a._id === audio._id ? data : a)));
    } catch (error) {
      console.log(error);
      alert("Failed to update publish status");
    }
  };

  return (
    <>
      <div className="adminHeader">
        <h1>Audio Sermons</h1>
        <p>Add SoundCloud links and manage publishing</p>
      </div>

      <div className="adminSection">
        <AudioForm
          editingAudio={editingAudio}
          onSuccess={() => {
            setEditingAudio(null);
            fetchAudio();
          }}
        />
      </div>

      <div className="adminSection">
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
    </>
  );
}
