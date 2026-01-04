"use client";

import { SortableItem } from "@/components/resume/sortable-item";
import { SortableOverlay } from "@/components/resume/sortable-overlay";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useState, useCallback } from "react";

type SortableListProps<T extends { id: string }> = {
  items: T[];
  onReorder: (
    reorderedItems: T[],
    updatedOrders: { id: string; order: number }[]
  ) => void;
  renderItem: (item: T) => React.ReactNode;
  renderOverlayItem: (item: T) => React.ReactNode;
  isDisabled?: boolean;
  className?: string;
};

export function SortableList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
  renderOverlayItem,
  isDisabled = false,
  className = "space-y-3",
}: SortableListProps<T>) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [prevItems, setPrevItems] = useState<T[]>(items);
  const [sortedItems, setSortedItems] = useState<T[]>(items);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor)
  );

  if (items !== prevItems) {
    setPrevItems(items);
    setSortedItems(items);
  }

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (active.id !== over?.id && over) {
        const oldIndex = sortedItems.findIndex((item) => item.id === active.id);
        const newIndex = sortedItems.findIndex((item) => item.id === over.id);
        const reorderedItems = arrayMove(sortedItems, oldIndex, newIndex);

        setSortedItems(reorderedItems);

        const reorderedStartIndex = Math.min(oldIndex, newIndex);
        const reorderedEndIndex = Math.max(oldIndex, newIndex);
        const updatedOrders = reorderedItems
          .slice(reorderedStartIndex, reorderedEndIndex + 1)
          .map((item, index) => ({
            id: item.id,
            order: reorderedStartIndex + index + 1,
          }));

        onReorder(reorderedItems, updatedOrders);
      }
    },
    [sortedItems, onReorder]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const activeItem = activeId
    ? sortedItems.find((item) => item.id === activeId)
    : null;

  return (
    <div
      className={`${className} ${
        isDisabled ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={sortedItems.map((item) => item.id)}>
          {sortedItems.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              {renderItem(item)}
            </SortableItem>
          ))}
          <SortableOverlay>
            {activeItem ? renderOverlayItem(activeItem) : null}
          </SortableOverlay>
        </SortableContext>
      </DndContext>
    </div>
  );
}
