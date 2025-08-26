import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./components/headerUtils.js";
import "./components/navigation.js";
import "./components/sliceReveal.js";
import "./components/hoverLink.js";
import "./components/cursorControl.js";

gsap.registerPlugin(ScrollTrigger);
// Initialize smooth scrolling
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
