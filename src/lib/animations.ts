// Simple animation utilities for the TrendTok dashboard

export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.2 }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// CSS-based animations for components that don't use Framer Motion
export const cssAnimations = {
  fadeInUp: 'animate-[fadeInUp_0.3s_ease-out]',
  slideInLeft: 'animate-[slideInLeft_0.4s_ease-out]',
  scaleIn: 'animate-[scaleIn_0.2s_ease-out]',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
  spin: 'animate-spin'
};