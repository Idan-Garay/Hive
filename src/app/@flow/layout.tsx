"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "~/components/ui/dialog";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const route = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Dialog
      open={pathname === "/sign-up"}
      onOpenChange={(open) => {
        if (!open) {
          route.replace("/");
        }
      }}
    >
      <DialogContent className="flex size-full max-h-full max-w-none overflow-hidden rounded-none border-transparent px-12 sm:max-h-[650px] sm:max-w-[600px] sm:rounded-sm">
        {children}
      </DialogContent>
    </Dialog>
  );
}
