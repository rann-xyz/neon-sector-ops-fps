// The look plan, in one place. Neon cyberpunk tactical FPS palette.
// Six values and one accent hue; the lighting makes every shade the game needs.
export const PALETTE = {
  canvas: '#0a0e17',
  surface: '#161c2a',
  hairline: '#2a3a52',
  ink: '#e2e8f0',
  muted: '#94a3b8',
  accent: '#38bdf8',
};

export function shade(name) {
  return PALETTE[name];
}
