import { useEffect, useRef } from "react";

export const useCounter = () => {
  useEffect(() => {
    const counters = document.querySelectorAll(".count-up");

    const animateCounters = () => {
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(animateCounters, 20);
        } else {
          counter.innerText = target;
        }
      });
    };

    animateCounters();
  }, []);
};
