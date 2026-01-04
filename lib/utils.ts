import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handlePointerDown = (
  event: React.PointerEvent,
  listeners?: SyntheticListenerMap
) => {
  const target = event.target as HTMLElement;
  if (
    target.tagName === "BUTTON" ||
    target.closest("button") ||
    target.closest('[role="button"]') ||
    target.closest("[data-no-drag]")
  ) {
    return;
  }
  if (listeners?.onPointerDown) {
    listeners.onPointerDown(event);
  }
};
