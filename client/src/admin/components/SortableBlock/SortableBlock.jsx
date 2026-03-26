import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableBlock = ({ block, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    activationConstraint: {
      distance: 5,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging ? "#fafafa" : "#fff",
    border: "1px solid #e5e5e5",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "12px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: "grab",
          fontSize: "14px",
          color: "#777",
          marginBottom: "8px",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        ☰ Drag block
      </div>

      {/* Block Content */}
      <div>{children}</div>
    </div>
  );
};

export default SortableBlock;
