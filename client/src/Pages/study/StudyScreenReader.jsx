import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import StudyBlocksRenderer from "./components/StudyBlocksRenderer";

export default function StudyScreenReader() {
  const { slug, screenId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/study/${slug}/screen/${screenId}`);

        setData(res.data || null); // ✅ SAFE
      } catch (err) {
        console.error("SCREEN LOAD ERROR:", err);
        setError("Failed to load screen.");
      }
    };

    load();
  }, [slug, screenId]);

  const goNext = async () => {
    try {
      const res = await api.get(`/study/${slug}/next`, {
        params: { currentType: "transition", screenId },
      });

      const next = res.data?.next;

      if (!next) return;

      if (next.type === "day") {
        navigate(`/study/${slug}/day/${next.dayNumber}`);
      } else {
        navigate(`/study/${slug}/screen/${next._id}`);
      }
    } catch (err) {
      console.error("NEXT SCREEN ERROR:", err);
    }
  };

  if (error) return <div style={{ padding: 24 }}>{error}</div>;
  if (!data) return <div style={{ padding: 24 }}>Loading...</div>;

  // ✅ SAFE destructuring
  const study = data?.study || {};
  const screen = data?.screen || {};

  // ✅ SAFE blocks
  const blocks = Array.isArray(screen.blocks) ? screen.blocks : [];

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>{study.title}</h1>

      <h2 style={{ marginTop: 14 }}>{screen.title}</h2>

      <div style={{ marginTop: 18 }}>
        <StudyBlocksRenderer blocks={blocks} />
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button onClick={goNext}>Continue</button>
      </div>
    </div>
  );
}
