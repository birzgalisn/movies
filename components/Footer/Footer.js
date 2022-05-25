import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer_wrapper}>
      <div className={styles.footer}>
        <Link href={"/"} passHref>
          <a>
            Powered by <span className={styles.logo}>_CINEMA</span>
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
