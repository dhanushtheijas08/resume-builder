import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({
  children,
  id,
  activeId,
  activeOrder,
  order,
}: {
  children: React.ReactNode;
  id: string;
  activeId: string | null;
  activeOrder: number | null;
  order: number;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id,
  });
  const isDragActive = activeId !== null;
  const isActiveAfterCurrent = activeOrder !== null && activeOrder > order;
  const isActiveBeforeCurrent = activeOrder !== null && activeOrder < order;

  const style = {
    transform: isDragActive ? undefined : CSS.Transform.toString(transform),
    transition: isDragActive ? undefined : transition,
    opacity: isDragging ? 0.4 : undefined,
  };

  return (
    <div className="relative">
      {isOver && id !== activeId && isActiveAfterCurrent && (
        <div className="absolute right-0 -top-1.5 w-full h-0.5 bg-primary/80 rounded-full z-10 shadow-sm" />
      )}
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
      {isOver && id !== activeId && isActiveBeforeCurrent && (
        <div className="absolute right-0 -bottom-1.5 w-full h-0.5 bg-primary/80 rounded-full z-10 shadow-sm" />
      )}
    </div>
  );
};
