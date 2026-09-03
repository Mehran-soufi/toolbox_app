export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type HSL = {
  h: number;
  s: number;
  l: number;
};

export function rgbToHex({ r, g, b }: RGB): string {
  return (
    "#" +
    [r, g, b]
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

export function hexToRgb(hex: string): RGB | null {
  const normalized = hex.replace("#", "").trim();

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return null;
  }

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);

  let h = 0;
  let s = 0;

  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;

    s =
      l > 0.5
        ? delta / (2 - max - min)
        : delta / (max + min);

    switch (max) {
      case red:
        h =
          ((green - blue) / delta +
            (green < blue ? 6 : 0)) /
          6;
        break;

      case green:
        h =
          ((blue - red) / delta + 2) /
          6;
        break;

      case blue:
        h =
          ((red - green) / delta + 4) /
          6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function rgbToCss({ r, g, b }: RGB): string {
  return `rgb(${r}, ${g}, ${b})`;
}

export function rgbToHslCss(rgb: RGB): string {
  const { h, s, l } = rgbToHsl(rgb);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function getPixelColor(
  context: CanvasRenderingContext2D,
  x: number,
  y: number
): RGB {
  const pixel = context.getImageData(x, y, 1, 1).data;

  return {
    r: pixel[0],
    g: pixel[1],
    b: pixel[2],
  };
}

