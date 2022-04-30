import Head from "next/head";
import EventCard from "../../components/EventCard";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/pages/Events.module.scss";
import { getEvents } from "../api/events";

export const getStaticProps = async () => {
  const movies = await getEvents();

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
