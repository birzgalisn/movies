import styles from "./LoadingDots.module.scss";

const LoadingDots = () => {
  return (
    <div className={styles.dots}>
      <span className={styles.dots_1} />
      <span className={styles.dots_2} />
      <span className={styles.dots_3} />
      {/* <span className={styles.dots_4} /> */}
    </div>
  );
};

export default LoadingDots;
