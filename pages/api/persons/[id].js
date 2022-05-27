import db from "../../../lib/db";

export async function getPerson(id) {
  const parsedActorId = parseInt(id);

  const movieInfo = {
    id: true,
    title: true,
    storyline: true,
  };

  const actor = await db.person.findFirst({
    where: {
      id: parsedActorId,
    },
    include: {
      // characters: {
      //   select: {
      //     id: true,
      //     name: true,
      //     movie: {
      //       select: {
      //         id: true,
      //         title: true,
      //       },
      //     },
      //   },
      // },
      knownFor: {
        select: {
          ...movieInfo,
          posterLink: true,
        },
      },
      directed: {
        select: {
          ...movieInfo,
          premiere: true,
        },
      },
      written: {
        select: {
          ...movieInfo,
          premiere: true,
        },
      },
      starred: {
        select: {
          ...movieInfo,
          premiere: true,
          characters: {
            select: {
              name: true,
            },
            where: {
              actorId: parsedActorId,
            },
          },
        },
      },
    },
  });

  return actor;
}

export default async function handler(req, res) {
  const person = await getPerson(req.query.id);
  res.status(200).json(person);
}
