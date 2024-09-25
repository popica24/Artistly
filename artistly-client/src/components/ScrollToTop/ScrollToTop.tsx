import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const scrollToTopWithDelay = () => {
      const timeoutId = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 500); // Delay of 0.6 seconds (600 milliseconds)

      // Return a cleanup function to clear the timeout
      return () => clearTimeout(timeoutId);
    };

    // Call the function to scroll to top with a delay
    const cleanup = scrollToTopWithDelay();

    // Ensure cleanup is called if component unmounts or pathname changes
    return cleanup;
  }, [pathname]);
  return null;
};

export default ScrollToTop;
