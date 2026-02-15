import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/ui/responsive-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ResumeDialogProps {
  title: string;
  icon?: React.ReactNode;
  description: string;
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const ResumeDialog = ({
  title,
  icon,
  description,
  className,
  open,
  onOpenChange,
  children,
}: ResumeDialogProps) => {
  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent
        className={cn(
          "w-full max-w-full md:max-w-2xl gap-4 md:gap-0",
          className,
        )}
      >
        <ResponsiveDialogHeader className="py-0">
          <ResponsiveDialogTitle className="flex items-center gap-2 px-1 mx-auto md:mx-0">
            <span className="hidden md:inline">{icon && icon}</span>
            {title}
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription className="px-1 text-left">
            {description}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ScrollArea className="px-3 sm:px-5 md:px-0 overflow-y-auto pb-4">
          {children}
        </ScrollArea>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
