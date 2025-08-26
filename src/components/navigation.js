import gsap from "gsap";

class MobileNavigation {
  constructor() {
    this.menuBtn = document.querySelector(".menu_btn");
    this.mobileContainer = document.querySelector(".nav_mobile-container");
    this.mobileCloseBtn = document.querySelector(".nav_mobile-close");
    this.accordionItems = document.querySelectorAll(".accordion-item");
    this.accordionHeaders = document.querySelectorAll(".accordion-header");
    this.mobileSubLinks = document.querySelectorAll(".nav_mobile-sub-link");
    this.isOpen = false;

    this.init();
  }

  init() {
    // Set initial states
    gsap.set(this.mobileContainer, { opacity: 0, visibility: "hidden" });
    gsap.set(this.mobileCloseBtn, { opacity: 0, scale: 0.8 });

    // Set initial states for accordion items
    gsap.set(this.accordionItems, { opacity: 0, y: 50 });

    // Add event listeners
    this.menuBtn.addEventListener("click", () => this.toggleMenu());

    // Close menu on close button click
    this.mobileCloseBtn.addEventListener("click", () => this.closeMenu());

    // Handle accordion functionality
    this.accordionHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        // Find the parent accordion-item
        const accordionItem = header.parentElement;

        // Toggle the .is-open class
        accordionItem.classList.toggle("is-open");
      });
    });

    // Close menu on sub-link clicks
    this.mobileSubLinks.forEach((subLink) => {
      subLink.addEventListener("click", () => this.closeMenu());
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isOpen = true;
    this.menuBtn.classList.add("is-active");

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();

    // Show container
    tl.set(this.mobileContainer, { visibility: "visible" })
      .to(this.mobileContainer, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      // Animate close button
      .to(
        this.mobileCloseBtn,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.2)",
        },
        "-=0.1"
      )
      // Animate accordion items with stagger
      .to(
        this.accordionItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
        },
        "-=0.2"
      );
  }

  closeMenu() {
    this.isOpen = false;
    this.menuBtn.classList.remove("is-active");

    // Restore body scroll
    document.body.style.overflow = "";

    // Close all accordion items
    this.accordionItems.forEach((item) => {
      item.classList.remove("is-open");
    });

    const tl = gsap.timeline();

    // Animate out with reverse stagger
    tl.to(this.accordionItems, {
      opacity: 0,
      y: 50,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
    })
      // Animate close button out
      .to(
        this.mobileCloseBtn,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.2,
          ease: "power2.in",
        },
        "-=0.1"
      )
      // Hide container
      .to(
        this.mobileContainer,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        "-=0.1"
      )
      .set(this.mobileContainer, { visibility: "hidden" });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new MobileNavigation();
});

// Add some smooth scroll behavior for demo links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
  });
});
