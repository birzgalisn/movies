import styles from "../styles/modules/Layout.module.scss";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
