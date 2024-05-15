import { cn } from "~/lib/utils";

export const HiveLoading: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const { className } = props;

  return (
    <div
      className={cn(
        "size-4 animate-spin rounded-full border-2 border-secondary border-t-transparent",
        className
      )}
    ></div>
  );
};
