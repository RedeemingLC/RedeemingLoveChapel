// import styles from "./StudyBlocksRenderer.module.css";

export default function StudyBlocksRenderer({ blocks = [] }) {
  return (
    <div>
      {blocks.map((b, idx) => {
        switch (b.type) {
          case "h1":
            return <h1 key={idx}>{b.value}</h1>;
          case "h2":
            return <h2 key={idx}>{b.value}</h2>;
          case "h3":
            return <h3 key={idx}>{b.value}</h3>;
          case "p":
            return <p key={idx}>{b.value}</p>;

          case "quote":
            return (
              <blockquote
                key={idx}
                style={{
                  borderLeft: "4px solid #ddd",
                  paddingLeft: 14,
                  opacity: 0.9,
                  fontStyle: "italic",
                }}
              >
                {b.value}
              </blockquote>
            );

          case "divider":
            return <hr key={idx} style={{ margin: "12px 0" }} />;

          case "ul":
            return (
              <ul key={idx} style={{ paddingLeft: 20 }}>
                {(b.items || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={idx} style={{ paddingLeft: 20 }}>
                {(b.items || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            );

          case "scripture":
            return (
              <div
                key={idx}
                style={{
                  padding: 14,
                  border: "1px solid #eee",
                  borderRadius: 12,
                  background: "#fafafa",
                }}
              >
                {b.reference && <strong>{b.reference}</strong>}
                <p style={{ marginTop: 8 }}>{b.value}</p>
              </div>
            );

          case "image":
            return (
              <figure key={idx} style={{ margin: 0 }}>
                <img
                  src={b.src}
                  alt={b.alt || ""}
                  style={{ width: "100%", borderRadius: 12 }}
                />
                {b.caption && (
                  <figcaption
                    style={{ fontSize: 13, opacity: 0.7, marginTop: 6 }}
                  >
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return <p key={idx}>{b.value}</p>;
        }
      })}
    </div>
  );
}
