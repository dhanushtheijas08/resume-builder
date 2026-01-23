import { cn } from "@/lib/utils";

export const XIcon = ({ className }: { className?: string }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-5 h-5", className)}
        viewBox="0 0 16 16"
        id="Twitter-X--Streamline-Bootstrap"
        height="16"
        width="16"
      >
        <path
          d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z"
          strokeWidth="1"
        ></path>
      </svg>
    );
};
