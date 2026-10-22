/**
 * Scroll Reveal Progressive Enhancement
 * Leverages IntersectionObserver fallback when CSS scroll-driven animations are unsupported.
 */
export function initScrollReveal(): void {
  // If user prefers reduced motion, reveal immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      el.classList.add('is-revealed');
    });
    return;
  }

  // If CSS scroll-driven animations are supported, CSS handles it natively
  const hasCssScrollTimeline = 
    typeof CSS !== 'undefined' && 
    CSS.supports && 
    CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

  const revealTargets = document.querySelectorAll('.scroll-reveal');
  if (revealTargets.length === 0) return;

  if (hasCssScrollTimeline) {
    // Native CSS is handling via .reveal-on-scroll; mark visible as safety fallback
    revealTargets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  // Fallback: IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Legacy fallback
    revealTargets.forEach((el) => el.classList.add('is-revealed'));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
