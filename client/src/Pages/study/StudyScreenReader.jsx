import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import StudyBlocksRenderer from "./components/StudyBlocksRenderer";

export default function StudyScreenReader() {
  const { slug, screenId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/study/${slug}/screen/${screenId}`);
      setData(res.data);
    };
    load();
  }, [slug, screenId]);

  const goNext = async () => {
    const res = await api.get(`/study/${slug}/next`, {
      params: { currentType: "transition", screenId },
    });

    const next = res.data.next;
    if (!next) return;

    if (next.type === "day") {
      navigate(`/study/${slug}/day/${next.dayNumber}`);
    } else {
      navigate(`/study/${slug}/screen/${next._id}`);
    }
  };

  if (!data) return <div style={{ padding: 24 }}>Loading...</div>;

  const { study, screen } = data;

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>{study.title}</h1>

      <h2 style={{ marginTop: 14 }}>{screen.title}</h2>

      <div style={{ marginTop: 18 }}>
        <StudyBlocksRenderer blocks={screen.blocks || []} />
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button onClick={goNext}>Continue</button>
      </div>
    </div>
  );
}
