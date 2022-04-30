import db from "../../../lib/db";

export const getPerson = async (id) => {
  const selectMovieInfo = {
    select: {
      id: true,
      title: true,
      posterLink: true,
      storyline: true,
    },
  };

  const actor = await db.person.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      characters: {
        select: {
          name: true,
          movie: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      directed: selectMovieInfo,
      written: selectMovieInfo,
      starred: selectMovieInfo,
    },
  });

  return actor;
};

export default async function personHandler(req, res) {
  const person = await getPerson(req.query.id);

  res.status(200).json(person);
}
