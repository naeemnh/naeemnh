import { db } from "@/lib";
import { Tournament } from "@/models";
import { Types } from "mongoose";

async function getAll() {
  try {
    await db.connect();
    const tournaments = await Tournament.find();
    return tournaments;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function update(id: string, data: any) {
  try {
    await db.connect();
    const teamsId = data.teams.map((team: string) => new Types.ObjectId(team));
    const result = await Tournament.updateOne({
      id: new Types.ObjectId(id),
      ...data,
      participatingTeams: teamsId,
    });
    return result;
  } catch (e: any) {
    throw new Error(e);
  }
}

export const tournamentActions = {
  getAll,
  update,
};
