import db from "../../../lib/db";

export async function getPersonPaths() {
  const persons = await db.person.findMany({
    select: {
      id: true,
    },
  });

  const paths = persons.map((person) => ({
    params: { id: person.id.toString() },
  }));

  return paths;
}

export default async function handler(_, res) {
  const paths = await getPersonPaths();
  res.status(200).json(paths);
}
