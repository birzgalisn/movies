import { format, parseISO } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import { getFirstSentence, serialize } from "../../lib/helper";
import styles from "../../styles/pages/Person.module.scss";
import { getPersonsPaths } from "../api/persons/paths";
import { getPerson } from "../api/persons/[id]";

export const getStaticPaths = async () => {
  const paths = await getPersonsPaths();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const person = await getPerson(ctx.params.id);

  return {
    props: {
      person: serialize(person),
    },
  };
};

const Person = ({ person }) => {
  return (
    <>
      <Head>
        <title>_CINEMA &bull; {person.name}</title>
        <meta name="description" content={getFirstSentence(person.bio)} />
      </Head>

      <div className={styles.person_wrapper}>
        <div className={styles.person}>
          <h1>{person.name}</h1>

          <div className={styles.person_grid}>
            <div className={styles.person_image}>
              <Image
                src={person.photoLink}
                alt={`${person.name} photo`}
                width={9}
                height={16}
                layout="responsive"
                objectFit="cover"
              />
            </div>

            <div className={styles.person_bio}>
              <h2>Biography</h2>
              <p>{person.bio}</p>
            </div>

            <div className={styles.person_age}>
              <div>
                <h3>Born</h3>
                <p>
                  {person.dateBorn
                    ? format(parseISO(person.dateBorn), "MMMM d, yyyy")
                    : "Unknown"}
                </p>
              </div>

              {person.dateDied && (
                <div>
                  <h3>Died</h3>
                  <p>{format(parseISO(person.dateDied), "MMMM d, yyyy")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Person;
