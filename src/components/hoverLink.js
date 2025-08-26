import gsap from "gsap";
import SplitText from "gsap/SplitText";

document.addEventListener("DOMContentLoaded", function () {
  // Wait for fonts to load before initializing animations
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      initHoverStagger();
    });
  } else {
    // Fallback for browsers that don't support document.fonts.ready
    setTimeout(() => {
      initHoverStagger();
    }, 100);
  }
});

function initHoverStagger() {
  const linkElements = document.querySelectorAll('[data-hover-stagger="link"]');

  linkElements.forEach((link, index) => {
    setupLinkAnimation(link, index);
  });
}

function setupLinkAnimation(link, index) {
  const textElement = link.querySelector('[data-hover-stagger="text"]');
  const textContainer = link.querySelector(".link-block_text-container");

  if (!textElement || !textContainer) return;

  // Store original text content
  const originalText = textElement.textContent;

  // Create duplicate element
  const duplicateElement = textElement.cloneNode(true);
  duplicateElement.classList.add("is-duplicate");
  duplicateElement.classList.remove("is-original");

  // Add classes to original
  textElement.classList.add("is-original");

  // Append duplicate to container
  textContainer.appendChild(duplicateElement);

  // Apply SplitText to both elements
  const splitOriginal = new SplitText(textElement, {
    type: "chars,words",
    tagName: "span",
  });

  const splitDuplicate = new SplitText(duplicateElement, {
    type: "chars,words",
    tagName: "span",
  });

  // Set initial states
  gsap.set(splitDuplicate.chars, { yPercent: 100, opacity: 0 });
  gsap.set(splitOriginal.chars, { yPercent: 0, opacity: 1 });

  // Create timeline
  const timeline = gsap.timeline({ paused: true });

  timeline
    .to(splitOriginal.chars, {
      yPercent: -100,
      opacity: 0,
      duration: 0.4,
      stagger: { amount: 0.2 },
      ease: "power2.out",
    })
    .fromTo(
      splitDuplicate.chars,
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.4,
        stagger: { amount: 0.2 },
        ease: "power2.out",
      },
      "0.01"
    );

  // Event listeners
  link.addEventListener("mouseenter", () => {
    timeline.restart();
  });

  // Optional: Uncomment for reverse animation on mouse leave
  link.addEventListener("mouseleave", () => {
    timeline.reverse();
  });
}
