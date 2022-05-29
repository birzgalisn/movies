import Link from "next/link";
import styles from "./LinkPersons.module.scss";

export default function LinkPersons({ persons }) {
  return (
    <div className={styles.link_wrapper}>
      {persons
        .map((person) => (
          <Link key={person.id} href={`/persons/${person.id}`}>
            <a className={styles.link}>{person.name}</a>
          </Link>
        ))
        .reduce((prev, curr) => [prev, ", ", curr])}
    </div>
  );
}
