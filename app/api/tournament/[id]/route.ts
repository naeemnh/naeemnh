import { tournamentActions } from "@/server/actions";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const data = await req.json();
    // console.log(data);
    const { id } = await params;
    const result = await tournamentActions.update(id, data);
    return Response.json(
      { result, meta: { message: "Tournament Updated" } },
      { status: 200 },
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
