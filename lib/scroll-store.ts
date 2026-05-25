// Module-level store for sharing scroll progress between Lenis and Three.js useFrame
// Avoids React re-renders while keeping data flow synchronous within the rAF loop
let _progress = 0;

export const scrollStore = {
  get progress() {
    return _progress;
  },
  set progress(v: number) {
    _progress = Math.max(0, Math.min(1, v));
  },
};
