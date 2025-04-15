import { playerActions } from "@/server/actions";

export async function GET() {
  try {
    const players = await playerActions.getAll();
    return Response.json(
      { result: players, meta: { message: "Players found" } },
      { status: 200 },
    );
  } catch (e: any) {
    return Response.json(
      {
        error: "Something went wrong",
        meta: {
          message: (e as Error).message,
        },
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    let result: any;
    if (data.name) {
      result = await playerActions.create({ name: data.name });
    } else {
      result = await playerActions.createMany({ names: data.names });
    }

    return Response.json(
      {
        result,
        meta: {
          message: "Player(s) Created",
        },
      },
      { status: 201 },
    );
  } catch (e: any) {
    return Response.json(
      {
        error: "Unable to create player(s)",
        meta: {
          message: (e as Error).message,
        },
      },
      { status: 500 },
    );
  }
}
