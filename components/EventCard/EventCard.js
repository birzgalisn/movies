import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { variants } from "../../lib/framer";
import styles from "./EventCard.module.scss";

export default function EventCard({ movie }) {
  return (
    <Link href={`/events/${movie.id}`} passHref>
      <motion.a
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear" }}
        className={styles.card}
      >
        <Image
          src={movie.posterLink}
          alt={`${movie.title} poster`}
          width={9}
          height={16}
          objectFit="cover"
          layout="responsive"
        />
        <h2>{movie.title}&nbsp;&rarr;</h2>
        <p>{movie.storyline}</p>
      </motion.a>
    </Link>
  );
}
