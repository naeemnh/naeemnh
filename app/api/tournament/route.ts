import { db } from "@/lib";
import { Tournament } from "@/models";

export async function GET() {
  try {
    await db.connect();
    const tournaments = await Tournament.find({});

    return Response.json(
      {
        result: tournaments,
        meta: { message: "Tournaments found" },
      },
      {
        status: 200,
      },
    );
  } catch (e: any) {
    return Response.json(
      {
        error: "Unable to get tournaments",
        meta: { message: (e as Error).message },
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: Request) {
  try {
    await db.connect();
    const data = await req.json();

    const result = await Tournament.create(data);
    return Response.json(
      { result, meta: { message: "Tournament created" } },
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
