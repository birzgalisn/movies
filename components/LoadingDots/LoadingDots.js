import styles from "./LoadingDots.module.scss";

export default function LoadingDots() {
  return (
    <div className={styles.dots}>
      <span className={styles.dots_1} />
      <span className={styles.dots_2} />
      <span className={styles.dots_3} />
    </div>
  );
}
