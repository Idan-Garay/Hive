import { cn } from "~/lib/utils";

export const HiveLoading = (props: HiveLoadingProps) => {
  const { className } = props;
  return (
    <div
      className={cn(
        "size-7 animate-spin rounded-full border-2 border-secondary border-t-transparent",
        className
      )}
    ></div>
  );
};

export type HiveLoadingProps = {
  className?: string;
};
