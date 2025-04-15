import { Types } from "mongoose";
import { TournamentStage } from "@/models";
import { db } from "@/lib";

const ObjectId = Types.ObjectId;

export async function GET() {
  try {
    await db.connect();
    const tournamentStages = await TournamentStage.find({});

    return Response.json(
      {
        result: tournamentStages,
        meta: { message: "Tournament Stages found" },
      },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    return Response.json(
      {
        error: "Unable to get tournament stages",
        meta: { message: (e as Error).message },
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await db.connect();
    const { tournamentId, ...data } = await req.json();
    const tournamentStage = {
      tournamentId: new ObjectId(tournamentId as string),
      ...data,
    };

    const result = await TournamentStage.create(tournamentStage);
    return Response.json(
      {
        result,
        meta: { message: "Tournament stage created" },
      },
      { status: 201 },
    );
  } catch (e: any) {
    return Response.json(
      {
        error: "Unable to create tournament stage",
        meta: { message: (e as Error).message },
      },
      { status: 500 },
    );
  }
}
