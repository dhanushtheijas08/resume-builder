import {
  DropAnimation,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
  duration: 200,
  easing: "ease-out",
};

export function SortableOverlay({ children }: { children: React.ReactNode }) {
  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
  );
}
