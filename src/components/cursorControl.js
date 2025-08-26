import MouseFollower from "mouse-follower";
import gsap from "gsap";

MouseFollower.registerGSAP(gsap);

(function () {
  // ---- Environment checks: skip on touch / reduced motion
  const isTouchLike =
    (window.matchMedia &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches) ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isTouchLike || prefersReducedMotion) return;

  // ---- MouseFollower init (your config, cleaned)
  const cursor = new MouseFollower({
    el: null,
    container: document.body,
    className: "mf-cursor",
    innerClassName: "mf-cursor-inner",
    textClassName: "mf-cursor-text",
    mediaClassName: "mf-cursor-media",
    mediaBoxClassName: "mf-cursor-media-box",
    iconSvgClassName: "mf-svgsprite",
    iconSvgNamePrefix: "-",
    iconSvgSrc: "",
    dataAttr: "cursor",
    hiddenState: "-hidden",
    textState: "-text",
    iconState: "-icon",
    activeState: "-active",
    mediaState: "-media",
    // single stateDetection block
    stateDetection: {
      "-pointer": 'a, button, [role="button"]',
      "-hidden": "iframe",
      "-opaque": ".has-opaque-cursor", // opt-in class for stronger fill
      "-menu": ".menu-toggle, .nav", // adjust to your markup
      "-lg": ".cursor-lg", // for prominent areas
      "-under": ".cursor-under", // if you ever need it
      "-inverse": '[data-cursor="-inverse"], .cursor-inverse', // flip to white
    },
    visible: true,
    visibleOnState: false,
    speed: 0.55,
    ease: "expo.out",
    overwrite: true,
    skewing: 0,
    skewingText: 2,
    skewingIcon: 2,
    skewingMedia: 2,
    skewingDelta: 0.001,
    skewingDeltaMax: 0.15,
    stickDelta: 0.15,
    showTimeout: 20,
    hideOnLeave: true,
    hideTimeout: 300,
    hideMediaTimeout: 300,
  });

  // ---- Media previews (unchanged, but only if cursor exists)
  document.querySelectorAll(".preview").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.setImg(el.dataset.preview || el.querySelector("img")?.src);
      cursor.addState("-media");
      // cursor.addState('-media-blend'); // optional: exclusion blend
      // cursor.addState('-media-lg');    // optional: full circle media
    });
    el.addEventListener("mouseleave", () => {
      cursor.removeImg();
      cursor.removeState("-media");
      cursor.removeState("-media-blend");
      cursor.removeState("-media-lg");
    });
  });
})();
