export const HiveOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute inset-0 z-[99] flex size-full items-center justify-center bg-background">
      {children}
    </div>
  );
};
