import Head from "next/head";
import { useEffect } from "react";
import shallow from "zustand/shallow";
import { useStore } from "../../app/store";
import EventCard from "../../components/EventCard";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/pages/Events.module.scss";
import { getEvents } from "../api/events";
import { getGenres } from "../api/genres";

export async function getStaticProps() {
  const events = await getEvents();
  const genres = await getGenres();
  return {
    props: { events, genres },
  };
}

export default function Events({ events, genres }) {
  const [selectedGenres, setAvailableGenres] = useStore(
    (state) => [state.selectedGenres, state.setAvailableGenres],
    shallow
  );

  useEffect(() => {
    setAvailableGenres(genres);
  }, [setAvailableGenres, genres]);

  const eventsToShow = selectedGenres.length
    ? events.filter((event) =>
        event.genres.some(
          ({ name }) =>
            selectedGenres.findIndex(({ label }) => label === name) !== -1
        )
      )
    : events;

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
              <h1>Events</h1>

              <div className={styles.events_content_grid}>
                {eventsToShow.map((movie) => (
                  <EventCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
