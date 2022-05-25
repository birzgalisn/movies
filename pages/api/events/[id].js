import db from "../../../lib/db";

export async function getEvent(id) {
  const selectPersonInfo = {
    select: {
      id: true,
      name: true,
      photoLink: true,
    },
  };

  const event = await db.movie.findFirst({
    where: {
      id: parseInt(id),
    },
    select: {
      title: true,
      posterLink: true,
      trailerEmbedLink: true,
      storyline: true,
      premiere: true,
      length: true,
      imdbRating: true,
      parentalGuide: {
        select: {
          id: true,
          short: true,
        },
      },
      genres: {
        select: {
          id: true,
          name: true,
        },
      },
      directors: selectPersonInfo,
      writers: selectPersonInfo,
      stars: selectPersonInfo,
      characters: {
        select: {
          id: true,
          name: true,
          actor: selectPersonInfo,
        },
      },
    },
  });

  return event;
}

export default async function handler(req, res) {
  const event = await getEvent(req.query.id);
  res.status(200).json(event);
}
