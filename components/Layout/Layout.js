import Footer from "../Footer";
import Navbar from "../Navbar";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
