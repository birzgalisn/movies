import db from "../../../lib/db";

export const getPersonsPaths = async () => {
  const persons = await db.person.findMany({
    select: {
      id: true,
    },
  });

  const paths = persons.map((person) => ({
    params: { id: person.id.toString() },
  }));

  return paths;
};

export default async function personsPathsHandler(req, res) {
  const paths = await getPersonsPaths();

  res.status(200).json(paths);
}
