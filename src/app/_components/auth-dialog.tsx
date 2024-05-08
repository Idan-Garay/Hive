"use client";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog";
import { HiveLink } from "~/components/hive/hive-link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useSearchParams } from "next/navigation";

export const AuthDialog = () => {
  const searchParams = useSearchParams();
  return (
    <Dialog open={searchParams.get("flow") !== null}>
      <DialogContent className="flex size-full max-w-none items-center justify-center rounded-none sm:max-h-[650px] sm:max-w-[600px] sm:rounded-sm">
        <Image
          src="/x-icon.svg"
          alt="x-icon"
          width={32}
          height={32}
          className="absolute left-1/2 top-4 -translate-x-1/2"
        />
        <div className="h-full w-[min(364px,100%)] px-8 py-10">
          <DialogTitle className="text-3xl font-bold">Sign in to X</DialogTitle>
          <div className="h-6" />
          <Button className=" font-normal">
            <Image
              src="/google-icon.svg"
              alt="google-icon"
              height={24}
              width={24}
              className="mr-2"
            />
            Sign up with Google
          </Button>
          <div className="h-4"></div>
          {/* <Button className="font-semibold">
            <Image
              src="/apple-icon.svg"
              alt="apple-icon"
              height={24}
              width={24}
              className="mr-2"
            />
            Sign up with Apple
          </Button> */}
          <div className="relative h-[40px] w-[300px] ">
            <hr className="absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 border-foreground/30 " />
            <p className=" absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-primary-foreground px-2 text-primary">
              or
            </p>
          </div>
          <Input
            className="h-14 text-base"
            placeholder="Phone, email, or username"
          />
          <div className="h-6"></div>

          <Button className="font-semibold">Next</Button>
          <div className="h-6"></div>

          <Button variant="outline" className="font-semibold">
            Forgot Password?
          </Button>
          <div className="h-12"></div>
          <span className="block text-base text-muted-foreground">
            {"Don't have an account? "} <HiveLink href="#">Sign up</HiveLink>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
