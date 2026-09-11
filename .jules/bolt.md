## 2025-03-09 - React state animation bottleneck in Hero Component
**Learning:** Frequent state updates (every 50ms) to drive UI animations (like a progress bar) cause unnecessary, heavy React re-renders, especially when wrapping expensive elements like images or motion wrappers.
**Action:** Use CSS transitions, Web Animations API, or Framer Motion (e.g. `motion.span` with duration) to handle continuous visual animations instead of updating React state in short intervals.
