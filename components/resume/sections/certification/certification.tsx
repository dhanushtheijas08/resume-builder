"use client";

import { Certification } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Award, Plus } from "lucide-react";
import { useState } from "react";
import { EmptySection } from "../empty-section";
import { useCertification } from "./use-certification";
import { CertificationDialog } from "./certification-dialog";
import { CertificationDisplay } from "./certification-display";

export const CertificationSection = ({
  certifications,
}: {
  certifications: Certification[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCertification, setEditingCertification] =
    useState<Certification | null>(null);

  const hasData = certifications.length > 0;
  const sortedCertifications = certifications.sort((a, b) => a.order - b.order);
  const maxOrder = (sortedCertifications.at(-1)?.order ?? 0) + 1;

  const {
    form,
    saveCertification,
    updateCertification,
    removeCertification,
    isLoading,
  } = useCertification(editingCertification, maxOrder, () => {
    setIsOpen(false);
    setEditingCertification(null);
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingCertification(null);
    }
  };

  const handleAddClick = () => {
    setEditingCertification(null);
    handleOpenChange(true);
  };

  const handleEditClick = (certification: Certification) => {
    setEditingCertification(certification);
    handleOpenChange(true);
  };

  return (
    <div className="space-y-4">
      {hasData ? (
        <CertificationDisplay
          certifications={sortedCertifications}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          onDeleteClick={removeCertification}
          isDeleting={isLoading}
        />
      ) : (
        <EmptySection
          title="No certifications added"
          description="Add your professional certifications to showcase your expertise."
          icon={<Award className="size-6 text-yellow-500" />}
          iconContainerClassName="bg-yellow-500/10"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddClick}
            disabled={isLoading}
          >
            <Plus className="size-4 mr-2" />
            Add Certification
          </Button>
        </EmptySection>
      )}

      <CertificationDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        form={form}
        actionFn={
          editingCertification ? updateCertification : saveCertification
        }
        isLoading={isLoading}
        isEditing={!!editingCertification}
      />
    </div>
  );
};
