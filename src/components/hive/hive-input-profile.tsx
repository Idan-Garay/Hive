/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import * as React from "react";
import { cn } from "~/lib/utils";
import { CameraIcon } from "@radix-ui/react-icons";
import "react-image-crop/dist/ReactCrop.css";

export interface HiveInputProfileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
  fileRef: React.RefObject<HTMLInputElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const HiveInputProfile = ({
  className,
  type = "file",
  setImgSrc,
  fileRef,
  canvasRef,
  ...props
}: HiveInputProfileProps) => {
  const [imageError, setImageError] = React.useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // setCrop(undefined);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const image = new Image();
        image.src = reader.result?.toString() ?? "";
        image.onload = () => {
          if (image.naturalWidth < 300 && image.naturalHeight < 300) {
            setImageError("Dimension must be >= 300 pixels");
            setTimeout(() => {
              setImageError("");
            }, 5000);
            return;
          } else {
            setImgSrc(reader.result?.toString() ?? "");
          }
        };
      });

      reader.readAsDataURL(e.target.files[0]!);
    }
  };

  const fileClick = () => {
    if (fileRef.current !== null) {
      fileRef.current.click();
    }
  };

  return (
    // eslint-disable-next-line tailwindcss/classnames-order
    <div
      className={cn(
        "group relative mx-auto w-fit rounded-full border bg-default-avatar bg-cover"
      )}
    >
      <label
        htmlFor="profile-input"
        className="absolute left-1/2 top-1/2 z-[99] hidden size-fit -translate-x-1/2 -translate-y-1/2 rounded-full border bg-accent p-4 text-accent-foreground group-hover:block"
      >
        <CameraIcon height={30} width={30} />
      </label>
      <canvas
        ref={canvasRef}
        className="absolute z-50 size-56 rounded-full border "
        onClick={fileClick}
      />
      <input
        id="profile-input"
        type={type}
        accept="image/png, image/jpeg, image/webp"
        className={cn(
          "flex size-56 rounded-full border-[1.5px] border-input bg-transparent px-3 py-1 text-base text-transparent shadow-sm transition-colors ",
          "overflow-hidden file:border-none file:text-sm hover:border-primary",
          "file:z-50 file:hidden",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={fileRef}
        {...props}
        onChange={onChange}
      />
      {imageError.length ? (
        <span className="absolute -bottom-20 left-4 font-medium text-destructive">
          {imageError}
        </span>
      ) : null}
    </div>
  );
};

HiveInputProfile.displayName = "Input";

export { HiveInputProfile };
