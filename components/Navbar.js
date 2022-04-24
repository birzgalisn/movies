import Link from "next/link";
import { useState } from "react";
import { HiFilm, HiOutlineLogin, HiOutlineMenu } from "react-icons/hi";
import styles from "../styles/modules/Navbar.module.scss";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleIsMobileOpen = () => setIsMobileOpen((prev) => !prev);

  return (
    <>
      <div className={styles.navbar_wrapper}>
        <nav className={styles.navbar}>
          <div className={styles.navbar_content}>
            <div className={styles.navbar_content_start}>
              <Link href={"/"}>
                <a>
                  <h1>_CINEMA</h1>
                </a>
              </Link>
            </div>

            <div className={styles.navbar_content_center}>
              <Link href={"/events"}>
                <a>
                  <HiFilm className={styles.navbar_content_center_icon} />
                </a>
              </Link>
            </div>

            <div className={styles.navbar_content_end}>
              <Link href={"/login"}>
                <a>
                  <HiOutlineLogin className={styles.navbar_content_end_icon} />
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

      {isMobileOpen && (
        <div className={styles.mobile_portal_wrapper}>
          <div className={styles.mobile_portal}>
            <div className={styles.mobile_portal_content}>
              <Sidebar />
            </div>

            <div
              className={styles.mobile_portal_close}
              onClick={toggleIsMobileOpen}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
