import { useEffect } from "react";

function useInfiniteScroll(callback) {
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 100) {
        callback();
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback]);
}

export default useInfiniteScroll;