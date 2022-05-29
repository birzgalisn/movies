import { format, parseISO } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiStar } from "react-icons/hi";
import shallow from "zustand/shallow";
import { useStore } from "../../app/store";
import CharacterCard from "../../components/CharacterCard";
import Layout from "../../components/Layout/Layout";
import LinkPersons from "../../components/LinkPersons";
import { getFirstSentence, serialize } from "../../lib/helper";
import styles from "../../styles/pages/Event.module.scss";
import { getEventPaths } from "../api/events/paths";
import { getEvent } from "../api/events/[id]";

export async function getStaticPaths() {
  const paths = await getEventPaths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const event = await getEvent(context.params.id);
  return {
    props: {
      event: serialize(event),
    },
  };
}

export default function Event({ event }) {
  const setSelectedGenres = useStore(
    (state) => state.setSelectedGenres,
    shallow
  );
  const router = useRouter();

  const handleGenreClick = (genre) => {
    setSelectedGenres([{ label: genre.name, value: genre.name }]);
    router.replace("/events");
  };

  return (
    <Layout>
      <Head>
        <title>
          _CINEMA &bull; {event.title} (
          {format(parseISO(event.premiere), "yyyy")})
        </title>
        <meta name="description" content={getFirstSentence(event.storyline)} />
      </Head>

      <div className={styles.event_wrapper}>
        <div className={styles.event}>
          <h1>{event.title}</h1>
          <div className={styles.event_media_wrapper}>
            <div className={styles.event_media}>
              <Image
                src={event.posterLink}
                alt={`${event.title} poster`}
                width="243px"
                height="432px"
                objectFit="cover"
              />
              <iframe
                src={event.trailerEmbedLink}
                title={`${event.title} trailer`}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
          <div className={styles.event_about}>
            <p>
              {format(parseISO(event.premiere), "MMMM d, yyyy")} &bull;{" "}
              {event.parentalGuide.short} &bull; {event.length}
            </p>
            <div className={styles.event_about_rating}>
              <p>IMDb rating</p>
              <span className={styles.event_about_rating_stars}>
                <HiStar />
                <span>{event.imdbRating}</span>
                <span>/ 10</span>
              </span>
            </div>
          </div>
          <div className={styles.event_genres}>
            {event.genres.map((genre) => (
              <span
                key={genre.id}
                onClick={() => handleGenreClick(genre)}
                className={styles.event_genres_genre}
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div className={styles.event_storyline}>
            <p>{event.storyline}</p>
          </div>
          <hr className={styles.line} />
          <div className={styles.event_general}>
            <div className={styles.event_general_section}>
              <h2>Directors</h2>
              <LinkPersons persons={event.directors} />
            </div>
            <hr className={styles.line} />
            <div className={styles.event_general_section}>
              <h2>Writers</h2>
              <LinkPersons persons={event.writers} />
            </div>
            <hr className={styles.line} />
            <div className={styles.event_general_section}>
              <h2>Stars</h2>
              <LinkPersons persons={event.stars} />
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.event_cast}>
            <h2>Top cast</h2>
            <div className={styles.event_cast_grid}>
              {event.characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
