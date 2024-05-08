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
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
