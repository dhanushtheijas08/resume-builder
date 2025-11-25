"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useResumeStore,
  CustomSection,
  CustomSectionEntry,
  CustomField,
  createCustomSectionEntry,
} from "@/lib/store/resume-store";
import { RichTextEditor } from "../editor/rich-text-editor";
import {
  Edit2,
  LayoutList,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JSONContent } from "@tiptap/react";

interface CustomSectionProps {
  section: CustomSection;
}

export function CustomSectionComponent({ section }: CustomSectionProps) {
  const { addCustomSectionEntry, updateCustomSectionEntry, removeCustomSectionEntry } =
    useResumeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<CustomSectionEntry | null>(null);
  const [formData, setFormData] = useState<Record<string, string | JSONContent>>({});

  const handleAdd = () => {
    setEditingEntry(null);
    const emptyEntry = createCustomSectionEntry(section.fields);
    setFormData(emptyEntry.values);
    setIsOpen(true);
  };

  const handleEdit = (entry: CustomSectionEntry) => {
    setEditingEntry(entry);
    setFormData({ ...entry.values });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (editingEntry) {
      updateCustomSectionEntry(section.id, editingEntry.id, formData);
    } else {
      const newEntry = createCustomSectionEntry(section.fields);
      newEntry.values = formData;
      addCustomSectionEntry(section.id, newEntry);
    }
    setIsOpen(false);
    setEditingEntry(null);
  };

  const handleDelete = (entryId: string) => {
    removeCustomSectionEntry(section.id, entryId);
  };

  const handleFieldChange = (fieldId: string, value: string | JSONContent) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const getDisplayValue = (entry: CustomSectionEntry) => {
    // Get the first text field value for display
    const firstTextField = section.fields.find(
      (f) => f.type === "text" || f.type === "textarea"
    );
    if (firstTextField) {
      const value = entry.values[firstTextField.id];
      if (typeof value === "string") return value || "Untitled";
    }
    return "Entry";
  };

  const getSubtitle = (entry: CustomSectionEntry) => {
    // Get second text field or date for subtitle
    const otherFields = section.fields.filter(
      (f) => f.type === "text" || f.type === "date"
    );
    if (otherFields.length > 1) {
      const value = entry.values[otherFields[1].id];
      if (typeof value === "string") return value;
    }
    return null;
  };

  const renderField = (field: CustomField) => {
    const value = formData[field.id];

    switch (field.type) {
      case "text":
      case "email":
      case "phone":
      case "url":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.name}</Label>
            <Input
              id={field.id}
              type={field.type === "email" ? "email" : field.type === "url" ? "url" : "text"}
              value={(value as string) || ""}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder || `Enter ${field.name.toLowerCase()}`}
            />
          </div>
        );
      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.name}</Label>
            <textarea
              id={field.id}
              value={(value as string) || ""}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder || `Enter ${field.name.toLowerCase()}`}
              className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        );
      case "richtext":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.name}</Label>
            <RichTextEditor
              content={value as JSONContent}
              onChange={(content) => handleFieldChange(field.id, content)}
            />
          </div>
        );
      case "date":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.name}</Label>
            <Input
              id={field.id}
              type="month"
              value={(value as string) || ""}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with count and add button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LayoutList className="size-4" />
          <span>
            {section.entries.length}{" "}
            {section.entries.length === 1 ? "entry" : "entries"}
          </span>
        </div>
        {(section.allowMultiple || section.entries.length === 0) && (
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            <Plus className="size-4 mr-2" />
            Add Entry
          </Button>
        )}
      </div>

      {/* Entries */}
      {section.entries.length > 0 ? (
        <div className="space-y-3">
          {section.entries.map((entry) => (
            <div
              key={entry.id}
              className="border rounded-lg p-4 bg-card hover:bg-accent/5 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{getDisplayValue(entry)}</h3>
                  {getSubtitle(entry) && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {getSubtitle(entry)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => handleEdit(entry)}
                  >
                    <Edit2 className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => handleDelete(entry.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
          <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <LayoutList className="size-6 text-muted-foreground" />
          </div>
          <h4 className="font-medium mb-1">No entries added</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Add entries to this section.
          </p>
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            <Plus className="size-4 mr-2" />
            Add Entry
          </Button>
        </div>
      )}

      {/* Entry Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="size-5" />
              {editingEntry ? `Edit ${section.name}` : `Add ${section.name}`}
            </DialogTitle>
            <DialogDescription>
              {editingEntry
                ? `Update the details for this ${section.name.toLowerCase()} entry.`
                : `Add a new entry to ${section.name}.`}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4 py-4">
              {section.fields.map((field) => renderField(field))}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              {editingEntry ? "Save Changes" : "Add Entry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

