(() => {
  const root = document.documentElement;
  const NAV_VAR = "--_ui-styles---navigation--height";
  const VH_VAR = "--vh";

  const setVH = () => {
    const vh = window.innerHeight * 0.01; // use in CSS as calc(var(--vh) * 100)
    root.style.setProperty(VH_VAR, `${vh}px`);
  };

  const setNavHeight = () => {
    const nav = document.querySelector(".nav_wrapper");
    if (!nav) return;
    const { height } = nav.getBoundingClientRect(); // sub-pixel safe
    root.style.setProperty(NAV_VAR, `${Math.round(height)}px`);
  };

  // rAF throttle for resize/orientation events
  let rafId = null;
  const onResize = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      setVH();
      setNavHeight();
    });
  };

  const init = () => {
    setVH();
    setNavHeight();

    // Resize + orientation
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    // Track nav size changes (e.g., sticky state, menu open/close)
    if ("ResizeObserver" in window) {
      const nav = document.querySelector(".nav_wrapper");
      if (nav) new ResizeObserver(setNavHeight).observe(nav);
    }

    // Update after webfonts load to avoid layout shift
    if (document.fonts?.ready) {
      document.fonts.ready.then(setNavHeight).catch(() => {});
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
