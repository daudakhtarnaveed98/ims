import { NextResponse } from "next/server";
import { admin } from "@/firebaseAdmin";

export async function POST(request: Request, context: any) {
  const { uid } = context.params;

  try {
    await admin.auth().deleteUser(uid);

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(e);
  }
}
