import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import styles from "./FilmographySection.module.scss";

export default function FilmographySection({ title, movies, open }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(open || false);

  if (!movies || !movies.length) {
    return null;
  }

  return (
    <div className={styles.filmography_section}>
      <div className={styles.filmography_section_head}>
        <h3>{title}</h3>
        <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
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
      {isDropdownOpen && (
        <div className={styles.filmography_section_list}>
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
        </div>
      )}
    </div>
  );
}
