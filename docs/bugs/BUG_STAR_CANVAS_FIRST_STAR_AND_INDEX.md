# Bug: Star canvas — first star never drawn, wrong index passed

## Title
Star canvas first star not drawn and incorrect count/index in constructor

## Description
In `components/organisms/canvas-animation.tsx`, the starfield animation always passes `count = 0` into `new Star(w, h, count, stars, maxStars)` (the `count` variable is declared but never updated). The `Star` constructor in `types/star.ts` uses `count` as the index and does `stars[this.count] = this` after `this.count++`, so every star effectively writes to `stars[1]` and the array is built incorrectly. The draw loop in `animateCanvas` uses `for (let i = 1, l = stars.length; i < l; i++)`, so it skips index 0. As a result, the first star is never drawn, and the `stars` array has wrong/duplicate entries.

**Affected files:** `components/organisms/canvas-animation.tsx`, `types/star.ts`

## Type
Logic

## Severity / Priority
High

## User Context
Addtionally, after the animation is disabled/stopped from the settings, enabling it doesn't restart the animation.