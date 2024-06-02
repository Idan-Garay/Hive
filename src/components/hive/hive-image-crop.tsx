"use client";
import { RefObject, forwardRef, useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
  convertToPixelCrop,
} from "react-image-crop";
import Image from "next/image";

export const HiveImageCrop = forwardRef<HTMLImageElement, HiveImageCrop>(
  ({ imgSrc, setCompleteCrop, ...props }, ref) => {
    const [crop, setCrop] = useState<Crop>();

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const MIN_DIMENSION = 224;
      const { width, height } = e.currentTarget;
      const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

      const crop = centerCrop(
        makeAspectCrop(
          {
            unit: "%",
            width: cropWidthInPercent,
          },
          1 / 1,
          224,
          224
        ),
        width,
        height
      );
      const centeredCrop = centerCrop(crop, width, height);
      setCrop(centeredCrop);
    };

    return !!imgSrc ? (
      <ReactCrop
        crop={crop}
        circularCrop
        keepSelection
        onChange={(crop, percentCrop) => setCrop(percentCrop)}
        onComplete={(c) => {
          if (ref) {
            setCompleteCrop(convertToPixelCrop(c, 224, 224));
          }
        }}
        aspect={1 / 1}
        minWidth={224}
        className="mx-auto w-[300px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          ref={ref}
          src={imgSrc}
          height={300}
          width={300}
          alt="uploaded_file"
          onLoad={onImageLoad}
          className="aspect-square object-cover object-center"
        />
      </ReactCrop>
    ) : null;
  }
);

HiveImageCrop.displayName = "HiveImageCrop";

export interface HiveImageCrop {
  imgSrc: string;
  setCompleteCrop: (c: PixelCrop) => void;
}
