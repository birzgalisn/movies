import db from "../../lib/db";

export default async function imFeelingLuckyHandler(req, res) {
  const aggregations = await db.movie.aggregate({
    _count: {
      id: true,
    },
  });

  const id = Math.ceil(Math.random() * aggregations._count.id);

  res.status(200).json({ id });
}
