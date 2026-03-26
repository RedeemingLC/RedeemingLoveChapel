import RichTextEditor from "../../../components/RichTextEditor/RichTextEditor";
import TableBlockEditor from "./TableBlockEditor";

function BlockEditor({ blocks, setBlocks }) {
  const addBlock = (type) => {
    let value = "";

    if (type === "table") {
      value = {
        rows: [
          {
            cells: [{ content: "" }, { content: "" }],
          },
        ],
      };
    }

    const newBlock = {
      id: crypto.randomUUID(),
      type,
      value,
    };

    setBlocks((prev) => [...prev, newBlock]);
  };

  const updateBlock = (id, value) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, value } : block,
      ),
    );
  };

  const removeBlock = (id) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  const moveBlockUp = (id) => {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      if (index <= 0) return prev;

      const updated = [...prev];
      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ];

      return updated;
    });
  };

  const moveBlockDown = (id) => {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      if (index === prev.length - 1) return prev;

      const updated = [...prev];
      [updated[index + 1], updated[index]] = [
        updated[index],
        updated[index + 1],
      ];

      return updated;
    });
  };

  return (
    <div>
      <h3>Lesson Content</h3>

      {blocks.map((block, index) => {
        if (!block) return null;

        return (
          <div key={block.id} style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <strong>{block.type}</strong>

              <button
                type="button"
                disabled={index === 0}
                onClick={() => moveBlockUp(block.id)}
              >
                ↑
              </button>

              <button
                type="button"
                disabled={index === blocks.length - 1}
                onClick={() => moveBlockDown(block.id)}
              >
                ↓
              </button>
            </div>

            {/* Paragraph */}
            {block.type === "paragraph" && (
              <RichTextEditor
                value={block.value}
                onChange={(html) => updateBlock(block.id, html)}
              />
            )}

            {/* Heading */}
            {block.type === "heading" && (
              <input
                type="text"
                value={block.value}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                placeholder="Heading text"
                style={{ width: "100%" }}
              />
            )}

            {/* Scripture */}
            {block.type === "scripture" && (
              <textarea
                value={block.value}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                placeholder="Scripture text"
                rows="3"
                style={{ width: "100%" }}
              />
            )}

            {/* Quote */}
            {block.type === "quote" && (
              <textarea
                value={block.value}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                placeholder="Quote"
                rows="3"
                style={{ width: "100%" }}
              />
            )}

            {/* Table */}
            {block.type === "table" && (
              <TableBlockEditor
                value={block.value}
                onChange={(val) => updateBlock(block.id, val)}
              />
            )}

            {/* Footnote */}
            {block.type === "footnote" && (
              <textarea
                value={block.value}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                placeholder="Footnote text"
                rows="2"
                style={{ width: "100%" }}
              />
            )}

            <button type="button" onClick={() => removeBlock(block.id)}>
              Remove
            </button>
          </div>
        );
      })}

      {/* Add Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <button type="button" onClick={() => addBlock("paragraph")}>
          + Paragraph
        </button>

        <button type="button" onClick={() => addBlock("heading")}>
          + Heading
        </button>

        <button type="button" onClick={() => addBlock("scripture")}>
          + Scripture
        </button>

        <button type="button" onClick={() => addBlock("quote")}>
          + Quote
        </button>

        <button type="button" onClick={() => addBlock("table")}>
          + Table
        </button>

        <button type="button" onClick={() => addBlock("footnote")}>
          + Footnote
        </button>
      </div>
    </div>
  );
}

export default BlockEditor;
