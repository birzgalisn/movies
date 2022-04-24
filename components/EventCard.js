import Image from "next/image";
import Link from "next/link";
import styles from "../styles/modules/EventCard.module.scss";

const EventCard = ({ movie }) => {
  return (
    <Link href={`/events/${movie.id}`}>
      <a className={styles.card}>
        <Image
          src={movie.posterLink}
          alt={`${movie.title} poster`}
          width={9}
          height={16}
          layout="responsive"
        />
        <h2>{movie.title}&nbsp;&rarr;</h2>
        <p>{movie.storyline}</p>
      </a>
    </Link>
  );
};

export default EventCard;
