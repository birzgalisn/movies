import { motion } from "framer-motion";
import { variants } from "../../lib/framer";
import styles from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: "linear" }}
      className={styles.main}
    >
      {children}
    </motion.main>
  );
}
