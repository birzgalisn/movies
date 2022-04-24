import Head from "next/head";
import EventCard from "../../components/EventCard";
import Sidebar from "../../components/Sidebar";
import db from "../../lib/db";
import styles from "../../styles/modules/Events.module.scss";

export const getStaticProps = async () => {
  const movies = await db.movie.findMany({
    select: {
      id: true,
      title: true,
      storyline: true,
      posterLink: true,
    },
  });

  return {
    props: { movies },
  };
};

const Events = ({ movies }) => {
  return (
    <>
      <Head>
        <title>_CINEMA &bull; Events</title>
        <meta name="description" content="Now playing exclusively in _CINEMA" />
      </Head>

      <div>
        <div className={styles.events_sidebar_wrapper}>
          <Sidebar />
        </div>

        <div className={styles.events}>
          <section className={styles.events_wrapper}>
            <div className={styles.events_content}>
              <h1>Films</h1>

              <div className={styles.events_content_grid}>
                {movies.map((movie) => (
                  <EventCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Events;
