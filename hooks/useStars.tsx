import { useEffect, useRef } from "react";
import { maxOrbit, random } from "@/lib";

export interface Star {
  orbitRadius: number;
  radius: number;
  orbitX: number;
  orbitY: number;
  timePassed: number;
  speed: number;
  alpha: number;
}

/**
 * Hook to generate and manage star data for canvas animations.
 *
 * @param canvasWidth Width of the canvas.
 * @param canvasHeight Height of the canvas.
 * @param maxStars Maximum number of stars.
 * @returns Object containing star data and drawing logic.
 */
export const useStars = (
  canvasWidth: number,
  canvasHeight: number,
  maxStars: number,
) => {
  const starsRef = useRef<Star[]>([]);

  // Generate star data if not already initialized
  useEffect(() => {
    if (starsRef.current.length === 0) {
      starsRef.current = Array.from({ length: maxStars }, () => {
        const orbitRadius = random(maxOrbit(canvasWidth, canvasHeight * 1.45));
        return {
          orbitRadius,
          radius: random(60, orbitRadius) / 12,
          orbitX: canvasWidth / 2,
          orbitY: canvasHeight * 0.95,
          timePassed: random(0, maxStars),
          speed: random(orbitRadius) / 1000000,
          alpha: random(2, 10) / 10,
        };
      });
    }
  }, [canvasHeight, canvasWidth, maxStars]);

  /**
   * Draw stars on the provided canvas.
   *
   * @param ctx Canvas 2D rendering context.
   * @param offscreenCanvas Offscreen canvas for star gradient.
   */
  const drawStars = (
    ctx: CanvasRenderingContext2D,
    offscreenCanvas: HTMLCanvasElement,
  ) => {
    starsRef.current.forEach((star) => {
      const x = Math.sin(star.timePassed) * star.orbitRadius + star.orbitX;
      const y = Math.cos(star.timePassed) * star.orbitRadius + star.orbitY;

      // Twinkle effect
      const twinkle = random(10);
      star.alpha +=
        twinkle === 1 && star.alpha > 0
          ? -0.05
          : twinkle === 2 && star.alpha < 1
            ? 0.05
            : 0;

      ctx.globalAlpha = star.alpha;
      ctx.drawImage(
        offscreenCanvas,
        x - star.radius / 2,
        y - star.radius / 2,
        star.radius,
        star.radius,
      );
      star.timePassed += star.speed;
    });
  };

  return { drawStars };
};
