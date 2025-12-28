import { lazy } from "react";

export const TEMPLATE_REGISTRY = {
  "69205909d2a3846e1ea37870": lazy(() => import("./template-1")),
} as const;

export type TemplateId = keyof typeof TEMPLATE_REGISTRY;

// Export skeleton loaders
export { ResumeSkeletonOneColumn, ResumeSkeletonTwoColumn } from "./template-1";
