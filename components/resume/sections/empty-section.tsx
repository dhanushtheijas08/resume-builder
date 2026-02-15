import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

export const EmptySection = ({
  title,
  description,
  icon,
  iconContainerClassName,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconContainerClassName: string;
  children: React.ReactNode;
}) => {
  return (
    <Empty className="border border-dashed rounded-lg  gap-4 lg:gap-5 flex flex-col items-center justify-center text-center text-white/90 bg-background/40 px-4 py-6 sm:px-6">
      <EmptyHeader className="w-full gap-0">
        <EmptyMedia variant="icon" className={cn(iconContainerClassName)}>
          {icon}
        </EmptyMedia>
        <EmptyTitle className="text-sm md:text-lg">{title}</EmptyTitle>
        <EmptyDescription className="text-wrap md:text-nowrap overflow-hidden max-w-60 sm:max-w-lg text-xs sm:text-sm md:text-base">
          {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="w-full flex flex-col items-center">
        {children}
      </EmptyContent>
    </Empty>
  );
};
