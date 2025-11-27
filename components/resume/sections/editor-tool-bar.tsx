"use client";
import { BoldIcon, ItalicIcon, LinkIcon, UnderlineIcon } from "lucide-react";
import { Editor } from "@tiptap/react";
import { Toggle, toggleVariants } from "@/components/ui/toggle";
import { VariantProps } from "class-variance-authority";
import * as TogglePrimitive from "@radix-ui/react-toggle";

const defaultToggleAttributes: VariantProps<typeof toggleVariants> &
  React.ComponentProps<typeof TogglePrimitive.Root> = {
  size: "sm",
  variant: "outline",
  className:
    "transition-all border-none hover:bg-muted hover:text-foreground data-[state=on]:bg-primary/20 data-[state=on]:text-primary data-[state=on]:border-primary data-[state=on]:shadow-sm data-[state=on]:hover:bg-primary/30",
};

export const EditorToolBar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex items-center gap-1 p-2 border-b bg-muted/30">
      <Toggle
        {...defaultToggleAttributes}
        value="bold"
        aria-label="Toggle bold"
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        pressed={editor.isActive("bold")}
      >
        <BoldIcon className="size-4" />
      </Toggle>
      <Toggle
        {...defaultToggleAttributes}
        value="italic"
        aria-label="Toggle italic"
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        pressed={editor.isActive("italic")}
      >
        <ItalicIcon className="size-4" />
      </Toggle>
      <Toggle
        {...defaultToggleAttributes}
        value="underline"
        aria-label="Toggle underline"
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        pressed={editor.isActive("underline")}
      >
        <UnderlineIcon className="size-4" />
      </Toggle>
      <Toggle
        {...defaultToggleAttributes}
        value="link"
        aria-label="Toggle link"
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        pressed={editor.isActive("underline")}
      >
        <LinkIcon className="size-4" />
      </Toggle>
    </div>
  );
};
