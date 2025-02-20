/**
 * Transforms color from #RRGGBB format by inverting it
 * and shifting hue by 180° in HSL.
 *
 * Equivalent to: filter: invert(1) hue-rotate(180deg);
 *
 * @param hexColor String like "#123456" (6 characters excluding #)
 * @returns String like "#RRGGBB" - resulting color
 */
export function invertHueRotate(hexColor: string): string {
  const hex = hexColor.replace(/^#/, '').toUpperCase();

  if (hex.length !== 6) {
    throw new Error(`Invalid color format: "${hexColor}". Expected "#RRGGBB" (6 characters).`);
  }

  let r = Number.parseInt(hex.slice(0, 2), 16);
  let g = Number.parseInt(hex.slice(2, 4), 16);
  let b = Number.parseInt(hex.slice(4, 6), 16);

  // Invert (invert(1))
  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  // Convert to [0..1] for HSL
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;

  // Convert (r, g, b) → (h, s, l)
  let { h, s, l } = rgbToHsl(rf, gf, bf);

  // hue-rotate(180deg)
  h = (h + 180) % 360;

  // Convert (h, s, l) → (r, g, b)
  let { r: rr, g: gg, b: bb } = hslToRgb(h, s, l);

  // Convert back to [0..255]
  rr = Math.round(rr * 255);
  gg = Math.round(gg * 255);
  bb = Math.round(bb * 255);

  const toHex = (v: number) => v.toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(rr)}${toHex(gg)}${toHex(bb)}`;
}

/**
 * Converts RGB ([0..1]) to HSL.
 * h ∈ [0..360], s,l ∈ [0..1].
 */
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s: number;
  const l = (max + min) / 2;
  const d = max - min;

  if (d === 0) {
    h = 0;
    s = 0;
  } else {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return { h, s, l };
}

/**
 * Converts HSL (h ∈ [0..360], s,l ∈ [0..1]) to RGB (each channel in [0..1]).
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs(hh % 2 - 1));

  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (hh >= 0 && hh < 1) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (hh >= 1 && hh < 2) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (hh >= 2 && hh < 3) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (hh >= 3 && hh < 4) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (hh >= 4 && hh < 5) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else if (hh >= 5 && hh < 6) {
    r1 = c;
    g1 = 0;
    b1 = x;
  }

  const m = l - c / 2;
  return {
    r: r1 + m,
    g: g1 + m,
    b: b1 + m,
  };
}