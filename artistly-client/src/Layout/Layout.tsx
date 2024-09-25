import { FC, useState } from "react";
import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router";
import Navbar from "./Navbar/Navbar";
import MobileNavbar from "./Mobile/Navbar/MobileNavbar";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedOutlet from "../components/AnimatedOutlet";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import "./index.css";
import Cookies from "../Pages/Homepage/components/Cookies";
const Layout: FC = () => {
  const [cookiesEnabled] = useState(
    localStorage.getItem("cookiesEnabled") != null
  );

  const location = useLocation();

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 1,
      },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };

  return (
    <>
      <Navbar />
      <MobileNavbar />
      <ScrollToTop />
      {!cookiesEnabled && <Cookies />}
      <main className="lg:container ">
        <AnimatePresence>
          <motion.div
            key={location.pathname}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <AnimatedOutlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <div className="mobile:block tablet:block laptop:hidden h-[59.8px] bg-white"></div>
    </>
  );
};

export default Layout;
