import { NextResponse } from "next/server";
import type { z } from "zod";

export async function parseJson<TSchema extends z.ZodType>(
  req: Request,
  schema: TSchema
): Promise<{ data: z.infer<TSchema>; error: null } | { data: null; error: NextResponse }> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return { data: null, error: NextResponse.json({ error: "Request tidak valid" }, { status: 400 }) };
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return {
      data: null,
      error: NextResponse.json(
        { error: "Payload tidak valid", details: result.error.flatten().fieldErrors },
        { status: 400 }
      ),
    };
  }

  return { data: result.data, error: null };
}
