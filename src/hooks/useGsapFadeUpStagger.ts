import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapFadeUpStagger(
  ref: React.RefObject<HTMLElement>,
  itemSelector = ".gsap-fadeup",
  options = {}
) {
  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(itemSelector);
    gsap.fromTo(
      items,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          ...options,
        },
      }
    );
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [ref, itemSelector, options]);
}