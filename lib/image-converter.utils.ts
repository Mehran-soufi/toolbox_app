import {
  CropData,
  ImageFormat,
  Rotation,
} from "./image-converter.types";

interface ProcessImageOptions {
  crop?: CropData;

  rotation: Rotation;

  flipHorizontal: boolean;

  flipVertical: boolean;

  outputWidth?: number;

  outputHeight?: number;

  quality: number;

  format: ImageFormat;
}

export function getEditedImageDimensions(
  originalWidth: number,
  originalHeight: number,
  crop?: CropData,
  rotation: Rotation = 0
) {
  const cropWidth = crop
    ? Math.round(
        (crop.width / 100) *
          originalWidth
      )
    : originalWidth;

  const cropHeight = crop
    ? Math.round(
        (crop.height / 100) *
          originalHeight
      )
    : originalHeight;

  const isRotated =
    rotation === 90 ||
    rotation === 270;

  return {
    width: isRotated
      ? cropHeight
      : cropWidth,

    height: isRotated
      ? cropWidth
      : cropHeight,
  };
}

export async function processImage(
  file: File,
  options: ProcessImageOptions
) {
  const image = new Image();

  const objectUrl =
    URL.createObjectURL(file);

  try {
    await new Promise<void>(
      (resolve, reject) => {
        image.onload = () =>
          resolve();

        image.onerror = () =>
          reject(
            new Error(
              "خطا در بارگذاری تصویر"
            )
          );

        image.src = objectUrl;
      }
    );

    const originalWidth =
      image.naturalWidth;

    const originalHeight =
      image.naturalHeight;

    /*
     * Crop
     */

    const crop =
      options.crop;

    const cropX = crop
      ? Math.round(
          (crop.x / 100) *
            originalWidth
        )
      : 0;

    const cropY = crop
      ? Math.round(
          (crop.y / 100) *
            originalHeight
        )
      : 0;

    const cropWidth = crop
      ? Math.round(
          (crop.width / 100) *
            originalWidth
        )
      : originalWidth;

    const cropHeight = crop
      ? Math.round(
          (crop.height / 100) *
            originalHeight
        )
      : originalHeight;

    /*
     * Rotation
     */

    const isRotated =
      options.rotation === 90 ||
      options.rotation === 270;

    const baseWidth =
      isRotated
        ? cropHeight
        : cropWidth;

    const baseHeight =
      isRotated
        ? cropWidth
        : cropHeight;

    /*
     * Resize
     */

    let outputWidth =
      options.outputWidth ||
      baseWidth;

    let outputHeight =
      options.outputHeight ||
      baseHeight;

    /*
     * اگر فقط width تعیین شده
     * نسبت تصویر حفظ شود.
     */

    if (
      options.outputWidth &&
      !options.outputHeight
    ) {
      outputHeight =
        Math.round(
          outputWidth *
            (baseHeight /
              baseWidth)
        );
    }

    /*
     * اگر فقط height تعیین شده
     */

    if (
      options.outputHeight &&
      !options.outputWidth
    ) {
      outputWidth =
        Math.round(
          outputHeight *
            (baseWidth /
              baseHeight)
        );
    }

    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.width =
      outputWidth;

    canvas.height =
      outputHeight;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      throw new Error(
        "Canvas در دسترس نیست."
      );
    }

    ctx.imageSmoothingEnabled =
      true;

    ctx.imageSmoothingQuality =
      "high";

    /*
     * Transform
     */

    ctx.save();

    ctx.translate(
      outputWidth / 2,
      outputHeight / 2
    );

    ctx.rotate(
      (options.rotation *
        Math.PI) /
        180
    );

    ctx.scale(
      options.flipHorizontal
        ? -1
        : 1,
      options.flipVertical
        ? -1
        : 1
    );

    /*
     * Draw
     */

    ctx.drawImage(
      image,

      cropX,
      cropY,

      cropWidth,
      cropHeight,

      -outputWidth / 2,
      -outputHeight / 2,

      outputWidth,
      outputHeight
    );

    ctx.restore();

    /*
     * Export
     */

    const blob =
      await new Promise<Blob | null>(
        (resolve) => {
          canvas.toBlob(
            resolve,
            options.format,
            options.quality
          );
        }
      );

    if (!blob) {
      throw new Error(
        "تبدیل تصویر انجام نشد."
      );
    }

    return {
      blob,

      width: outputWidth,

      height: outputHeight,
    };
  } finally {
    URL.revokeObjectURL(
      objectUrl
    );
  }
}