import db from "../../lib/db";

export const getGenres = async () => {
  const genres = await db.movieGenre.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return genres;
};

export default async function genresHandler(req, res) {
  const genres = await getGenres();

  res.status(200).json({ genres });
}
