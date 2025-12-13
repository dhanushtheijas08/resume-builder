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
    <Empty className="border border-dashed rounded-lg flex flex-col items-center justify-center text-center text-white/90 bg-background/40">
      <EmptyHeader>
        <EmptyMedia variant="icon" className={cn(iconContainerClassName)}>
          {icon}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription className="text-nowrap text-ellipsis overflow-hidden max-w-lg">
          {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{children}</EmptyContent>
    </Empty>
  );
};
