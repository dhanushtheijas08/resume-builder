import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.4 : undefined,
  };

  return (
    <div className="relative">
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    </div>
  );
};
