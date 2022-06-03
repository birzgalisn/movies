import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { HiFilm, HiOutlineLogin, HiOutlineMenu } from "react-icons/hi";
import { variants } from "../../lib/framer";
import Sidebar from "../Sidebar";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleIsMobileOpen = () => setIsMobileOpen((prev) => !prev);

  return (
    <>
      <div className={styles.navbar_wrapper}>
        <nav className={styles.navbar}>
          <div className={styles.navbar_content}>
            <div className={styles.navbar_content_start}>
              <Link href={"/"} passHref>
                <a>
                  <h1>_CINEMA</h1>
                </a>
              </Link>
            </div>

            <div className={styles.navbar_content_center}>
              <Link href={"/events"} passHref>
                <a>
                  <HiFilm className={styles.navbar_content_center_icon} />
                  &nbsp;Events
                </a>
              </Link>
            </div>

            <div className={styles.navbar_content_end}>
              <Link href={"/login"} passHref>
                <a>
                  <HiOutlineLogin className={styles.navbar_content_end_icon} />
                  &nbsp;Login
                </a>
              </Link>
            </div>

            <div className={styles.mobile_navbar}>
              <button onClick={toggleIsMobileOpen}>
                <HiOutlineMenu />
              </button>
            </div>
          </div>
        </nav>
      </div>

      <AnimatePresence exitBeforeEnter initial={false}>
        {isMobileOpen && (
          <div className={styles.mobile_portal_wrapper}>
            <motion.div
              initial="hidden"
              animate="enter"
              exit="exit"
              variants={variants}
              transition={{ type: "linear" }}
              className={styles.mobile_portal}
            >
              <div className={styles.mobile_portal_content}>
                <Sidebar />
              </div>

              <div
                className={styles.mobile_portal_close}
                onClick={toggleIsMobileOpen}
              ></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
