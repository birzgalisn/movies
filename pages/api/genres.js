import db from "../../lib/db";

export async function getGenres() {
  const genres = await db.movieGenre.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      NOT: {
        movies: {
          none: {},
        },
      },
    },
    orderBy: [{ name: "asc" }],
  });
  return genres;
}

export default async function handler(_, res) {
  const genres = await getGenres();
  res.status(200).json(genres);
}
