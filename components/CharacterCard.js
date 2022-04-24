import Image from "next/image";
import styles from "../styles/modules/CharacterCard.module.scss";

const CharacterCard = ({ character }) => {
  return (
    <div key={character.id} className={styles.character}>
      <Image
        src={character.actor.photoLink}
        alt={`${character.actor.name} photo`}
        width={"100px"}
        height={"100px"}
        layout={"fixed"}
        objectFit={"cover"}
      />
      <div className={styles.character_about}>
        <h2>{character.actor.name}</h2>
        <p>as {character.name}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
