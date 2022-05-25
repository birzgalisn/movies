import db from "../../../lib/db";

export async function getEventPaths() {
  const movies = await db.movie.findMany({
    select: {
      id: true,
    },
  });

  const paths = movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return paths;
}

export default async function handler(_, res) {
  const paths = await getEventPaths();
  res.status(200).json(paths);
}
