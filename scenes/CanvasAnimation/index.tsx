"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './canvas.module.css';
import { Star } from '@/types/star.class';

export default function CanvasAnimation(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window != "undefined" ? window.innerWidth : 0);
  const [windowHeight, setWindowHeight] = useState<number>(typeof window != "undefined" ? window.innerHeight : 0);
  const [isDark, setIsDark] = useState<boolean>(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {

    /**
     * Window Resize Hook
     * @returns {void} new height and width of window
     */
    const handleWindowResize = (): void => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    /**
     * listen for theme change for animation 
     */
    const handleThemeChange = ({ matches }: MediaQueryListEvent): void => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setIsDark(matches);
    };

    /**
     * initialize canvas animation
     * @param w width of canvas
     * @param h height of canvas
     * @returns {void}
     */
    const animateCanvas = (w: number, h: number): void => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas!.getContext('2d');
      const background = isDark ? '#000' : '#fff';
      const colorStops = isDark
        ? [
          { offset: 0.025, color: '#fff' },
          { offset: 0.1, color: 'hsl(217, 61%, 33%)' },
          { offset: 0.25, color: 'hsl(217, 64%, 6%)' },
          { offset: 1, color: 'transparent' },
        ]
        : [
          { offset: 0.025, color: '#000' },
          { offset: 0.25, color: 'transparent' },
          { offset: 0.5, color: 'transparent' },
          { offset: 1, color: 'transparent' },
        ];

      const canvas2 = document.createElement('canvas');
      const ctx2 = canvas2.getContext('2d');
      if (!ctx2) return;
      canvas2.width = 100;
      canvas2.height = 100;
      const half = canvas2.width / 2;
      const gradient2 = ctx2!.createRadialGradient(half, half, 0, half, half, half);
      colorStops.forEach(({ offset, color }) => {
        gradient2.addColorStop(offset, color);
      });
      ctx2.fillStyle = gradient2;
      ctx2.beginPath();
      ctx2.arc(half, half, half, 0, Math.PI * 2);
      ctx2.fill();

      const maxStars = 1000;
      const stars: Star[] = [];
      let count = 0;

      for (let i = 0; i < maxStars; i++) {
        stars.push(new Star(w, h, count, stars, maxStars));
      }

      function animation(): void {
        if (!ctx) return;
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, w, h);

        // ctx.globalCompositeOperation = 'darken';
        ctx.globalCompositeOperation = isDark ? 'lighter' : 'darken';

        for (let i = 1, l = stars.length; i < l; i++) {
          stars[i].draw(ctx, canvas2);
        }

        animationFrameRef.current = requestAnimationFrame(animation);
      }

      animation();
    };

    typeof window !== 'undefined' && window.addEventListener('resize', handleWindowResize);

    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);

    animateCanvas(windowWidth | 0, windowHeight);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowHeight, windowWidth, canvasRef, isDark]);

  return <canvas ref={canvasRef} className={styles.canvas}></canvas>;
}
