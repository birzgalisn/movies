import Image from "next/image";
import Link from "next/link";
import styles from "./CharacterCard.module.scss";

const CharacterCard = ({ character }) => {
  return (
    <Link href={`/persons/${character.actor.id}`}>
      <a className={styles.character}>
        <Image
          src={character.actor.photoLink}
          alt={`${character.actor.name} photo`}
          width={"100px"}
          height={"100px"}
          layout={"fixed"}
          objectFit={"cover"}
        />
        <div className={styles.character_about}>
          <h3>{character.actor.name}</h3>
          <span>as {character.name}</span>
        </div>
      </a>
    </Link>
  );
};

export default CharacterCard;
