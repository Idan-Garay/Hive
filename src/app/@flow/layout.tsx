"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "~/components/ui/dialog";

export default function Layout({ children }: { children: React.ReactNode }) {
  const route = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) {
          route.back();
        }
      }}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
