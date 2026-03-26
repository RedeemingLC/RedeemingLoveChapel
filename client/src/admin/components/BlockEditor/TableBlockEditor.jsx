import React from "react";

function TableBlockEditor({ value, onChange }) {
  const updateCell = (rowIndex, colIndex, content) => {
    const rows = [...value.rows];

    rows[rowIndex].cells[colIndex].content = content;

    onChange({ rows });
  };

  const addRow = () => {
    const columnCount = value.rows[0].cells.length;

    const newRow = {
      cells: Array.from({ length: columnCount }, () => ({ content: "" })),
    };

    onChange({
      rows: [...value.rows, newRow],
    });
  };

  const deleteRow = (rowIndex) => {
    if (value.rows.length === 1) return; // prevent empty table

    const rows = value.rows.filter((_, index) => index !== rowIndex);

    onChange({ rows });
  };

  const addColumn = () => {
    const rows = value.rows.map((row) => ({
      cells: [...row.cells, { content: "" }],
    }));

    onChange({ rows });
  };

  const deleteColumn = (colIndex) => {
    const columnCount = value.rows[0].cells.length;

    if (columnCount === 1) return; // prevent empty table

    const rows = value.rows.map((row) => ({
      cells: row.cells.filter((_, index) => index !== colIndex),
    }));

    onChange({ rows });
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "5px", marginBottom: "5px" }}>
        {value.rows[0].cells.map((_, colIndex) => (
          <button
            key={colIndex}
            type="button"
            onClick={() => deleteColumn(colIndex)}
          >
            Delete Column {colIndex + 1}
          </button>
        ))}
      </div>
      <table border="1" style={{ width: "100%", marginBottom: "10px" }}>
        <tbody>
          {value.rows.map((row, rIndex) => (
            <tr key={rIndex}>
              {row.cells.map((cell, cIndex) => (
                <td key={cIndex}>
                  <textarea
                    value={cell.content}
                    onChange={(e) => updateCell(rIndex, cIndex, e.target.value)}
                    rows={2}
                    style={{
                      width: "100%",
                      resize: "vertical",
                      wordBreak: "break-word",
                    }}
                  />
                </td>
              ))}

              <td>
                <button type="button" onClick={() => deleteRow(rIndex)}>
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="button" onClick={addRow}>
          Add Row
        </button>

        <button type="button" onClick={addColumn}>
          Add Column
        </button>
      </div>
    </div>
  );
}

export default TableBlockEditor;
