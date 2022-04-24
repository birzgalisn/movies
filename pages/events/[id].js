import Head from "next/head";
import Image from "next/image";
import { HiStar } from "react-icons/hi";
import CharacterCard from "../../components/CharacterCard";
import db from "../../lib/db";
import { getFirstSentence } from "../../lib/helper";
import styles from "../../styles/modules/Event.module.scss";

export const getStaticPaths = async () => {
  const movies = await db.movie.findMany({
    select: {
      id: true,
    },
  });

  const paths = movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const movie = await db.movie.findFirst({
    where: {
      id: parseInt(ctx.params.id),
    },
    include: {
      parentalGuide: true,
      genres: true,
      directors: true,
      writers: true,
      stars: true,
      characters: {
        include: {
          actor: true,
        },
      },
    },
  });

  return {
    props: { movie },
  };
};

const Event = ({ movie }) => {
  return (
    <>
      <Head>
        <title>_CINEMA &bull; {movie.title}</title>
        <meta name="description" content={getFirstSentence(movie.storyline)} />
      </Head>

      <div className={styles.event_wrapper}>
        <div className={styles.event}>
          <h1>{movie.title}</h1>
          <div className={styles.event_media_wrapper}>
            <div className={styles.event_media}>
              <Image
                src={movie.posterLink}
                alt={`${movie.title} poster`}
                width="243px"
                height="432px"
                objectFit="cover"
              />
              <iframe
                src={movie.youTubeEmbedLink}
                title={`${movie.title} trailer`}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
          <div className={styles.event_about}>
            <p>
              {movie.premiere} &bull; {movie.parentalGuide.short} &bull;{" "}
              {movie.length}
            </p>
            <div className={styles.event_about_rating}>
              <p>IMDb rating</p>
              <span className={styles.event_about_rating_stars}>
                <HiStar />
                <span>{movie.imdbRating}</span>
                <span>/ 10</span>
              </span>
            </div>
          </div>
          <div className={styles.event_genres}>
            {movie.genres.map((genre) => (
              <span key={genre.id} className={styles.event_genres_genre}>
                {genre.name}
              </span>
            ))}
          </div>
          <div className={styles.event_storyline}>
            <p>{movie.storyline}</p>
          </div>
          <hr className={styles.line} />
          <div className={styles.event_general}>
            <div className={styles.event_general_section}>
              <h2>Directors</h2>
              <span>{movie.directors.map(({ name }) => name).join(", ")}</span>
            </div>
            <hr className={styles.line} />
            <div className={styles.event_general_section}>
              <h2>Writers</h2>
              <span>{movie.writers.map(({ name }) => name).join(", ")}</span>
            </div>
            <hr className={styles.line} />
            <div className={styles.event_general_section}>
              <h2>Stars</h2>
              <span>{movie.stars.map(({ name }) => name).join(", ")}</span>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.event_cast}>
            <h2>Top cast</h2>
            <div className={styles.event_cast_grid}>
              {movie.characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
