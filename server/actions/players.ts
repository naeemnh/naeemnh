import { db } from "@/lib";
import { Player } from "@/models";

async function getAll() {
  try {
    await db.connect();
    const players = await Player.find();

    return players;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function create(data: { name: string }) {
  try {
    await db.connect();
    const result = await Player.create(data);
    return result;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function createMany(data: { names: string[] }) {
  try {
    const players = data.names.map((name) => {
      name;
    });
    await db.connect();
    const result = await Player.insertMany(players);
    return result;
  } catch (e: any) {
    throw new Error(e);
  }
}

export const playerActions = {
  getPlayers: getAll,
  create,
  createMany,
};
