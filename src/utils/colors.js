export const hexToRGBA = (hex, alpha) => {
  const rgb = hexToRGBParts(hex);
  alpha = alpha > 1 || alpha < 0 || typeof alpha !== 'number' ? 1 : alpha
  return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + alpha + ")";
};

export const hexToRGBParts = hex => {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16)
  };
};
