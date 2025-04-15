import { Types } from "mongoose";

import { Team } from "@/models";
import { db } from "@/lib";
import { tournamentActions } from "@/server/actions";

const ObjectId = Types.ObjectId;

export async function GET() {
  try {
    await db.connect();
    const teams = await Team.find({});

    return Response.json(
      { result: teams, meta: { message: "Teams found" } },
      { status: 200 },
    );
  } catch (e: any) {
    return Response.json(
      {
        error: "Unable to get teams",
        meta: { message: (e as Error).message },
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await db.connect();
    const data = await req.json();
    const team = {
      name: data.name,
      players: data.players.map((p: string) => new ObjectId(p)),
    };

    const result = await Team.create(team);
    return Response.json(
      { result, meta: { message: "Team created" } },
      { status: 201 },
    );
  } catch (e: any) {
    return Response.json(
      {
        error: "Something went wrong",
        meta: { message: (e as Error).message },
      },
      { status: 500 },
    );
  }
}
