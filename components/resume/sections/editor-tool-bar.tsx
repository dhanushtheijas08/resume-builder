"use client";
import { DataStatePropInterceptor } from "@/components/ui/data-state-interpreter";
import { Toggle, toggleVariants } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { Editor } from "@tiptap/react";
import { VariantProps } from "class-variance-authority";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  LucideIcon,
  Redo2,
  UnderlineIcon,
  Undo2,
} from "lucide-react";
type ToolbarItem = {
  value: string;
  label: string;
  icon: LucideIcon;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
};

const toolbarItems: ToolbarItem[] = [
  {
    value: "bold",
    label: "Bold",
    icon: BoldIcon,
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
  },
  {
    value: "italic",
    label: "Italic",
    icon: ItalicIcon,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
  },
  {
    value: "underline",
    label: "Underline",
    icon: UnderlineIcon,
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive("underline"),
  },
  {
    value: "bulletList",
    label: "Bullet List",
    icon: ListIcon,
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  {
    value: "orderedList",
    label: "Ordered List",
    icon: ListOrderedIcon,
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
  {
    value: "undo",
    label: "Undo",
    icon: Undo2,
    action: (editor) => editor.chain().focus().undo().run(),
    isActive: (editor) => editor.isActive("undo"),
  },
  {
    value: "redo",
    label: "Redo",
    icon: Redo2,
    action: (editor) => editor.chain().focus().redo().run(),
    isActive: (editor) => editor.isActive("redo"),
  },
];

const defaultToggleAttributes: VariantProps<typeof toggleVariants> &
  React.ComponentProps<typeof TogglePrimitive.Root> = {
  size: "sm",
  variant: "outline",
  className:
    "transition-all border-none hover:bg-muted hover:text-foreground data-[state=on]:bg-primary/20 data-[state=on]:text-primary data-[state=on]:border-primary data-[state=on]:shadow-sm data-[state=on]:hover:bg-primary/30",
};

export const EditorToolBar = ({
  editor,
  isLoading,
}: {
  editor: Editor;
  isLoading: boolean;
}) => {
  return (
    <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
      {toolbarItems.map((item) => (
        <Tooltip key={item.value}>
          <TooltipTrigger asChild>
            <DataStatePropInterceptor>
              <Toggle
                {...defaultToggleAttributes}
                value={item.value}
                aria-label={`Toggle ${item.label.toLowerCase()}`}
                onPressedChange={() => item.action(editor)}
                pressed={item.isActive(editor)}
                disabled={isLoading}
              >
                <item.icon className="size-4" />
              </Toggle>
            </DataStatePropInterceptor>
          </TooltipTrigger>
          <TooltipContent>{item.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
