import Head from "next/head";
import Link from "next/link";
import styles from "../styles/modules/Home.module.scss";

const Home = () => {
  return (
    <>
      <Head>
        <title>_CINEMA &bull; Home</title>
        <meta
          name="description"
          content="Next generation cinema experience website"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.home}>
        <section className={styles.home_wrapper}>
          <div className={styles.home_content}>
            <h1 className={styles.home_content_title}>
              Welcome to{" "}
              <Link href={"/events"}>
                <a>_FILMS</a>
              </Link>
              !
            </h1>

            <p className={styles.home_content_description}>
              _CINEMA helps you find the best and most reviewed films. View the
              best films for the day and filter down to exactly what you&apos;re
              searching for.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
