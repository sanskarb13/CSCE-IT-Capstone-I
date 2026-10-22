/**
 * Mobile Navigation Drawer & Accessibility Handler
 */
export function initNav(): void {
  const toggleBtn = document.querySelector<HTMLButtonElement>('.nav__toggle');
  const navLinks = document.querySelector<HTMLElement>('.nav__links');

  if (!toggleBtn || !navLinks) return;

  function setMenuState(open: boolean): void {
    toggleBtn!.setAttribute('aria-expanded', String(open));
    toggleBtn!.classList.toggle('nav__toggle--open', open);
    navLinks!.classList.toggle('nav__links--open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    setMenuState(!isExpanded);
  });

  // Close when clicking any nav link
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      toggleBtn.focus();
    }
  });

  // Close when resizing above mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820 && toggleBtn.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
    }
  });
}

// Auto-run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNav);
} else {
  initNav();
}
