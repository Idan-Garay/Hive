import React, { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const HiveInputSecure = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [hidePassword, setHidePassword] = useState(true);
    return (
      <div className="relative">
        <Input
          type={hidePassword ? "password" : "text"}
          className={cn(
            "flex h-14 w-full rounded border-[1.5px] border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <div
          className="absolute bottom-1/4 right-3 cursor-pointer"
          onClick={() => setHidePassword((bool) => !bool)}
        >
          {hidePassword ? (
            <EyeOpenIcon height={20} width={20} className="" />
          ) : (
            <EyeClosedIcon height={20} width={20} className="" />
          )}
        </div>
      </div>
    );
  }
);

HiveInputSecure.displayName = "HiveInputSecure";
