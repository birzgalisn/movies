import db from "../../../lib/db";

export const getEvents = async () => {
  const events = await db.movie.findMany({
    select: {
      id: true,
      title: true,
      storyline: true,
      posterLink: true,
    },
  });

  return events;
};

export default async function eventsHandler(req, res) {
  const events = await getEvents();

  res.status(200).json(events);
}
