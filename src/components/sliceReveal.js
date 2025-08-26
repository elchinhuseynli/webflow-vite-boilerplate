// Universal Slice Reveal Effect with Global Configuration
// Usage: data-slice-wrapper="themeName" + data-slice-target on the media element
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

class UniversalSliceReveal {
  constructor() {
    // Global Configuration - Set up your themes once here
    this.config = {
      // Default settings
      defaults: {
        sliceCount: 8,
        animationDuration: 1.2,
        staggerAmount: 0.85,
        imageScale: 1.4,
        triggerPoint: "top 70%",
        ease: "power4.inOut",
        direction: "horizontal", // horizontal, vertical, left-to-right, right-to-left, top-to-bottom, bottom-to-top
        playOnce: false, // true = play only once, false = play/reverse on scroll
      },

      // Predefined themes - customize these for your website
      themes: {
        gold: {
          sliceCount: 6,
          animationDuration: 1,
          staggerAmount: 0.9,
          imageScale: 1.3,
          triggerPoint: "top bottom",
          className: "slice-theme_gold",
          playOnce: true, // Sunset theme also plays only once
        },
        ocean: {
          sliceCount: 12,
          animationDuration: 1.8,
          staggerAmount: 0.95,
          imageScale: 1.5,
          triggerPoint: "top 60%",
          className: "slice-theme_ocean",
        },
        forest: {
          sliceCount: 8,
          animationDuration: 1.0,
          staggerAmount: 0.8,
          imageScale: 1.2,
          triggerPoint: "top 80%",
          className: "slice-theme_forest",
        },
        sunset: {
          sliceCount: 10,
          animationDuration: 2.0,
          staggerAmount: 1.0,
          imageScale: 1.6,
          triggerPoint: "top 50%",
          className: "slice-theme_sunset",
          playOnce: true, // Sunset theme also plays only once
        },
        royal: {
          sliceCount: 7,
          animationDuration: 1.3,
          staggerAmount: 0.7,
          imageScale: 1.4,
          triggerPoint: "top 70%",
          className: "slice-theme_royal",
        },
        dark: {
          sliceCount: 15,
          animationDuration: 1.6,
          staggerAmount: 1.2,
          imageScale: 1.3,
          triggerPoint: "top 85%",
          className: "slice-theme_dark",
        },
      },
    };

    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof gsap !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        this.setupSliceRevealElements();
      } else {
        console.error("GSAP is required for UniversalSliceReveal");
      }
    });
  }

  setupSliceRevealElements() {
    // Find all elements with data-slice-wrapper attribute
    const sliceWrappers = document.querySelectorAll("[data-slice-wrapper]");

    sliceWrappers.forEach((wrapper, index) => {
      this.createSliceRevealEffect(wrapper, index);
    });
  }

  createSliceRevealEffect(wrapper, index) {
    // Get theme name from attribute
    const themeName = wrapper.dataset.sliceWrapper;

    // Get direction from attribute (with fallback to theme or default)
    const direction =
      wrapper.dataset.sliceDirection ||
      this.config.themes[themeName]?.direction ||
      this.config.defaults.direction;

    // Get playOnce from attribute (with fallback to theme or default)
    const playOnce =
      wrapper.dataset.slicePlayOnce !== undefined
        ? wrapper.dataset.slicePlayOnce === "true"
        : this.config.themes[themeName]?.playOnce !== undefined
        ? this.config.themes[themeName].playOnce
        : this.config.defaults.playOnce;

    // Get theme configuration
    const theme = this.config.themes[themeName] || {};
    const settings = { ...this.config.defaults, ...theme, direction, playOnce };

    // Find the target element (the media to be revealed)
    const target = wrapper.querySelector("[data-slice-target]");
    if (!target) {
      console.warn(
        "No element with data-slice-target found in wrapper:",
        wrapper
      );
      return;
    }

    // Add theme class to wrapper for styling
    if (settings.className) {
      wrapper.classList.add(settings.className);
    }

    // Create slice overlay container
    const sliceOverlay = document.createElement("div");
    sliceOverlay.className = "slice-reveal_overlay";
    sliceOverlay.setAttribute("data-slice-overlay-id", index);
    sliceOverlay.setAttribute("data-direction", direction);

    // Create individual slices
    for (let i = 0; i < settings.sliceCount; i++) {
      const slice = document.createElement("div");
      slice.className = "slice-reveal_slice";
      slice.setAttribute("data-slice-index", i);
      sliceOverlay.appendChild(slice);
    }

    // Insert overlay into wrapper
    wrapper.appendChild(sliceOverlay);

    // Get slices for animation
    const slices = wrapper.querySelectorAll(".slice-reveal_slice");

    // Create GSAP timeline with conditional ScrollTrigger behavior
    const scrollTriggerConfig = {
      trigger: wrapper,
      start: settings.triggerPoint,
      end: "bottom 20%",
      markers: false, // Set to true for debugging
    };

    // Set toggleActions based on playOnce setting
    if (settings.playOnce) {
      scrollTriggerConfig.toggleActions = "play none none none"; // Only play once
      scrollTriggerConfig.once = true; // GSAP's built-in once option
    } else {
      scrollTriggerConfig.toggleActions = "play reverse play reverse"; // Play/reverse on scroll
    }

    const tl = gsap.timeline({
      scrollTrigger: scrollTriggerConfig,
    });

    // Add animations based on direction
    this.createDirectionalAnimation(tl, slices, target, settings, direction);

    // Store references for potential future use
    wrapper._sliceRevealTimeline = tl;
    wrapper._sliceRevealTarget = target;
    wrapper._sliceRevealSettings = settings;
  }

  createDirectionalAnimation(timeline, slices, target, settings, direction) {
    timeline.addLabel("start");

    // Define animation properties based on direction
    let sliceAnimProps = {};
    let staggerConfig = { amount: settings.staggerAmount };

    switch (direction) {
      case "horizontal":
      case "left-to-right":
        sliceAnimProps = { height: 0 };
        staggerConfig.from = "start";
        break;

      case "right-to-left":
        sliceAnimProps = { height: 0 };
        staggerConfig.from = "end";
        break;

      case "vertical":
      case "top-to-bottom":
        sliceAnimProps = { width: 0 };
        staggerConfig.from = "start";
        break;

      case "bottom-to-top":
        sliceAnimProps = { width: 0 };
        staggerConfig.from = "end";
        break;

      default:
        sliceAnimProps = { height: 0 };
        staggerConfig.from = "start";
    }

    // Add slice animation
    timeline.to(
      slices,
      {
        ...sliceAnimProps,
        duration: settings.animationDuration,
        ease: settings.ease,
        stagger: staggerConfig,
      },
      "start"
    );

    // Add target scale animation
    timeline.to(
      target,
      {
        scale: settings.imageScale,
        duration: settings.animationDuration * 1.1,
        ease: settings.ease,
      },
      "start"
    );
  }

  // Add a new theme programmatically
  addTheme(name, config) {
    this.config.themes[name] = { ...this.config.defaults, ...config };
  }

  // Update existing theme
  updateTheme(name, config) {
    if (this.config.themes[name]) {
      this.config.themes[name] = { ...this.config.themes[name], ...config };
    }
  }

  // Get theme configuration
  getTheme(name) {
    return this.config.themes[name] || null;
  }

  // List all available themes
  getAvailableThemes() {
    return Object.keys(this.config.themes);
  }

  // Public method to manually trigger animation
  triggerAnimation(wrapper) {
    if (wrapper._sliceRevealTimeline) {
      wrapper._sliceRevealTimeline.play();
    }
  }

  // Public method to reverse animation
  reverseAnimation(wrapper) {
    if (wrapper._sliceRevealTimeline) {
      wrapper._sliceRevealTimeline.reverse();
    }
  }

  // Refresh all ScrollTriggers
  refresh() {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  }
}

// Initialize the effect
const sliceReveal = new UniversalSliceReveal();

// Example: Add a custom theme dynamically (optional)
sliceReveal.addTheme("custom", {
  sliceCount: 20,
  animationDuration: 2.5,
  staggerAmount: 1.5,
  imageScale: 1.8,
  triggerPoint: "top 90%",
  className: "slice-theme_custom",
});

// Make it globally available
window.SliceReveal = sliceReveal;
