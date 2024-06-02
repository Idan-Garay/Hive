"use client";
import Image from "next/image";
import { DialogTitle } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { HiveInputProfile } from "~/components/hive/hive-input-profile";
import { HiveImageCrop } from "~/components/hive/hive-image-crop";
import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "~/components/ui/alert-dialog";
import { type PixelCrop } from "react-image-crop";
import Link from "next/link";

export const PickProfileForm = (props: PickProfileFormProps): JSX.Element => {
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [completeCrop, setCompleteCrop] = useState<PixelCrop>();
  const [imgSrc, setImgSrc] = useState("");

  const updateCanvas = (crop: PixelCrop) => {
    // draw in canvas
    if (canvasRef.current != null && imgRef.current !== null) {
      const canvas = canvasRef.current;
      const image = imgRef.current;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("No 2d context");
      }

      if (!completeCrop) {
        throw new Error("No complete crop");
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      // devicePixelRatio slightly increases sharpness on retina devices
      // at the expense of slightly slower render times and needing to
      // size the image back down if you want to download/upload and be
      // true to the images natural size.
      const pixelRatio = window.devicePixelRatio;
      // const pixelRatio = 1

      canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
      canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

      ctx.scale(pixelRatio, pixelRatio);
      ctx.imageSmoothingQuality = "high";

      const cropX = crop.x * scaleX;
      const cropY = crop.y * scaleY;

      ctx.save();

      // 5) Move the crop origin to the canvas origin (0,0)
      ctx.translate(-cropX, -cropY);
      // 4) Move the origin to the center of the original position
      // 3) Rotate around the origin
      // 2) Scale the image

      ctx.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.restore();
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas === null) {
      return;
    }
    const downloadableFile = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception

    const a = document.createElement("a");
    a.href = downloadableFile;
    a.download = "profile.png";
    a.click();
  };

  useEffect(() => {
    if (imgSrc.length !== 0) {
      setOpenCrop(true);
    }
  }, [imgSrc]);

  return (
    <div className="flex size-full max-h-full flex-col">
      <Image
        src="/x-icon.svg"
        alt="x-icon"
        width={32}
        height={32}
        className="absolute left-1/2 top-3 -translate-x-1/2"
      />
      <div className="flex h-full flex-col px-8 pt-10">
        <DialogTitle className="text-3xl font-bold">
          {"Pick a profile picture"}
        </DialogTitle>
        <p className="py-1 text-muted-foreground">
          {"Have a favorite selfie? Upload it now."}
        </p>
        <div className="h-12"></div>
        <HiveInputProfile
          fileRef={fileRef}
          canvasRef={canvasRef}
          setImgSrc={setImgSrc}
          maxLength={24}
          placeholder="imgSrc"
        />

        <AlertDialog
          open={openCrop}
          onOpenChange={(open) => {
            setOpenCrop(open);
            if (open === false) {
              setImgSrc("");
            }
          }}
        >
          <AlertDialogContent className="">
            <HiveImageCrop
              ref={imgRef}
              setCompleteCrop={setCompleteCrop}
              imgSrc={imgSrc}
            />
            <div className="h-4"></div>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-sm ">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (completeCrop === undefined) {
                    return;
                  }
                  updateCanvas(completeCrop);
                }}
                className="text-sm "
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="h-full"></div>
        <Button
          // disabled={form.formState.isSubmitting || !form.formState.isValid}
          type="submit"
          variant="secondary"
          className=" mt-auto py-5"
          onClick={handleSave}
        >
          Save
        </Button>
        <div className="min-h-3"></div>
        <Button
          // disabled={form.formState.isSubmitting || !form.formState.isValid}
          type="submit"
          variant="outline"
          className=" mt-auto py-5"
        >
          Skip
        </Button>
      </div>
    </div>
  );
};

export type PickProfileFormProps = {
  className?: string;
};
