import db from "../../lib/db";

const handler = async (req, res) => {
  const genres = await db.movieGenre.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  res.status(200).json({ genres });
};

export default handler;
