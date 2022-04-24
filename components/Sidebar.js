import Link from "next/link";
import { useRouter } from "next/router";
import {
  HiFilm,
  HiOutlineHome,
  HiOutlineLogin,
  HiOutlineSparkles,
} from "react-icons/hi";
import styles from "../styles/modules/Sidebar.module.scss";

const fetchGenres = async () => {
  const res = await fetch("/api/genres");
  return await res.json();
};

const fetchImFeelingLucky = async () => {
  const res = await fetch("/api/imfeelinglucky");
  return await res.json();
};

const Sidebar = () => {
  const router = useRouter();

  const imFeelingLucky = async () => {
    const res = await fetchImFeelingLucky();
    router.push(`/events/${res.id}`);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_content}>
        <div className={styles.sidebar_links}>
          <Link href={"/"}>
            <a>
              <div className={styles.sibebar_links_link}>
                <HiOutlineHome />
                Home
              </div>
            </a>
          </Link>
          <Link href={"/events"}>
            <a>
              <div className={styles.sibebar_links_link}>
                <HiFilm /> Films
              </div>
            </a>
          </Link>
          <Link href={"/login"}>
            <a>
              <div>
                <HiOutlineLogin /> Login
              </div>
            </a>
          </Link>
        </div>

        {/* <div className={styles.sidebar_filter}>
          <div className={styles.sidebar_filter_select}>
            <p>Genre</p>
            <div>
              <select></select>
              <div>
                <HiOutlineChevronDown />
              </div>
            </div>
          </div>
        </div> */}

        <button className={styles.sidebar_button} onClick={imFeelingLucky}>
          <HiOutlineSparkles />
          I&apos;m Feeling Lucky
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
