import { format, parseISO } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { variants } from "../../lib/framer";
import styles from "./FilmographySection.module.scss";

export default function FilmographySection({ title, movies, open }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(open || false);

  if (!movies || !movies.length) {
    return null;
  }

  const handleDropdownClick = () => {
    setIsDropdownOpen((prev) => !prev);
    if (!isDropdownOpen) {
      document.getElementById(title).scrollIntoView();
    }
  };

  return (
    <div className={styles.filmography_section}>
      <div className={styles.filmography_section_head}>
        <h3 id={title}>{title}</h3>
        <button onClick={handleDropdownClick}>
          {isDropdownOpen ? (
            <>
              <HiOutlineChevronUp /> Hide
            </>
          ) : (
            <>
              <HiOutlineChevronDown /> Show
            </>
          )}
        </button>
      </div>
      <AnimatePresence exitBeforeEnter initial={false}>
        {isDropdownOpen && (
          <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ type: "linear" }}
            className={styles.filmography_section_list}
          >
            {movies.map((movie) => (
              <Link key={movie.id} href={`/events/${movie.id}`} passHref>
                <a className={styles.filmography_section_movie}>
                  <h4>
                    {movie.title} ({format(parseISO(movie.premiere), "yyyy")})
                  </h4>
                  <p>
                    {movie.characters
                      ? movie.characters
                          .map((character) => character.name)
                          .join(", ")
                      : movie.storyline}
                  </p>
                </a>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
