import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Save, X } from "lucide-react";

interface ResumeDialogProps {
  title: string;
  icon?: React.ReactNode;
  description: string;
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionFn: () => void;
  children: React.ReactNode;
}

export const ResumeDialog = ({
  title,
  icon,
  description,
  className,
  open,
  onOpenChange,
  actionFn,
  children,
}: ResumeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {icon && icon}
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button type="submit" className="w-fit" onClick={actionFn}>
            <Save className="size-4" />
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
