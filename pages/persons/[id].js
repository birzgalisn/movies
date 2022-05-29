import { format, parseISO } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import EventCard from "../../components/EventCard";
import FilmographySection from "../../components/FilmographySection";
import Layout from "../../components/Layout/Layout";
import { getFirstSentence, serialize } from "../../lib/helper";
import styles from "../../styles/pages/Person.module.scss";
import { getPersonPaths } from "../api/persons/paths";
import { getPerson } from "../api/persons/[id]";

export async function getStaticPaths() {
  const paths = await getPersonPaths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const person = await getPerson(context.params.id);
  return {
    props: {
      person: serialize(person),
    },
  };
}

export default function Person({ person }) {
  return (
    <Layout>
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

          {person.knownFor.length && (
            <div className={styles.person_knownFor}>
              <h2>Known for</h2>
              <div className={styles.person_knownFor_list}>
                {person.knownFor.map((movie) => (
                  <EventCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          )}

          <div className={styles.person_filmography}>
            <h2>Filmography</h2>
            <div className={styles.person_filmography_list}>
              <FilmographySection
                open
                title={"Directed"}
                movies={person.directed}
              />
              <FilmographySection
                open={!person.directed.length}
                title={"Written"}
                movies={person.written}
              />
              <FilmographySection
                open={!(person.directed.length && person.written.length)}
                title={"Starred"}
                movies={person.starred}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
