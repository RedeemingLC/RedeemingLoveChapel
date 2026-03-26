import styles from "../../Pages/Manuals/Manuals.module.css";

function BlockRenderer({ block }) {
  if (!block) return null;

  switch (block.type) {
    case "heading":
      return <h3 className={styles.manualHeading}>{block.value}</h3>;

    case "paragraph":
      return (
        <div
          className={styles.manualParagraph}
          dangerouslySetInnerHTML={{ __html: block.value }}
        />
      );

    case "quote":
      return (
        <blockquote className={styles.manualQuote}>{block.value}</blockquote>
      );

    case "scripture":
      return <div className={styles.manualScripture}>{block.value}</div>;

    case "table":
      const headerRow = block.value.rows[0];
      const bodyRows = block.value.rows.slice(1);
      if (!block.value?.rows?.length) return null;
      return (
        <div className={styles.manualTableWrapper}>
          <table className={styles.manualTable}>
            <thead>
              <tr>
                {headerRow.cells.map((cell, index) => (
                  <th key={index} className={styles.manualTableHeader}>
                    {cell.content}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {bodyRows.map((row, rIndex) => (
                <tr key={rIndex}>
                  {row.cells.map((cell, cIndex) => (
                    <td key={cIndex} className={styles.manualTableCell}>
                      {cell.content}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "footnote":
      return (
        <div className={styles.manualFootnote}>
          <sup>*</sup> {block.value}
        </div>
      );

    default:
      return null;
  }
}

export default BlockRenderer;
