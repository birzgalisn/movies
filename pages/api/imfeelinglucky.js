import db from "../../lib/db";

export default async function handler(_, res) {
  const aggregations = await db.movie.aggregate({
    _count: {
      id: true,
    },
  });

  const event = Math.ceil(Math.random() * aggregations._count.id);

  res.status(200).json(event);
}
