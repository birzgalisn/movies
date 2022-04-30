import db from "../../../lib/db";

export const getEventsPaths = async () => {
  const movies = await db.movie.findMany({
    select: {
      id: true,
    },
  });

  const paths = movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return paths;
};

export default async function eventsPathsHandler(req, res) {
  const paths = await getEventsPaths();

  res.status(200).json(paths);
}
