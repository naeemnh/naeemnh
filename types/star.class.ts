import { maxOrbit } from "@/utils/maxOrbit";
import { random } from "@/utils/random";

export class Star {
  orbitRadius: number;
  radius: number;
  orbitX: number;
  orbitY: number;
  timePassed: number;
  speed: number;
  alpha: number;

  constructor(w: number, h: number, private count: number, private stars: Star[], private maxStars: number) {
    this.orbitRadius = random(maxOrbit(w, h * 1.45));
    this.radius = random(60, this.orbitRadius) / 12;
    this.orbitX = w / 2;
    this.orbitY = h * 0.95;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 1000000;
    this.alpha = random(2, 10) / 10;

    this.count++;
    stars[this.count] = this;
  }
  draw(ctx: CanvasRenderingContext2D, canvas2: HTMLCanvasElement): void {
    const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
    const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;

    const twinkle = random(10);

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05;
    }
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    this.timePassed += this.speed;
  };
}