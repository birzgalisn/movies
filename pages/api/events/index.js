import db from "../../../lib/db";

export async function getEvents() {
  const events = await db.movie.findMany({
    select: {
      id: true,
      title: true,
      storyline: true,
      posterLink: true,
      genres: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return events;
}

export default async function handler(_, res) {
  const events = await getEvents();
  res.status(200).json(events);
}
