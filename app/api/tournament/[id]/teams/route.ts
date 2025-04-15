import { db } from "@/lib";
import { Team } from "@/models";
import { Types } from "mongoose";

const ObjectId = Types.ObjectId;

export async function GET(_, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tournamentId = new ObjectId(id);
    await db.connect();

    const teams = await Team.find({ tournamentId });

    return Response.json(
      {
        result: teams,
        meta: { message: "Teams found" },
      },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    return Response.json(
      { error: "Unable to get teams", meta: { message: (e as Error).message } },
      { status: 500 },
    );
  }
}
