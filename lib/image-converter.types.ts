export type ImageFormat =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/avif";

export type ImageStatus =
  | "idle"
  | "processing"
  | "completed"
  | "error";

export type Rotation =
  | 0
  | 90
  | 180
  | 270;

export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageItem {
  id: string;

  file: File;

  preview: string;

  width: number;
  height: number;

  convertedUrl?: string;

  convertedSize?: number;

  convertedWidth?: number;

  convertedHeight?: number;

  rotation: Rotation;

  flipHorizontal: boolean;

  flipVertical: boolean;

  crop?: CropData;

  status: ImageStatus;
}