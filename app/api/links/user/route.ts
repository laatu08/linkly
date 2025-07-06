import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { dbConnect } from "@/lib/dbConnect";
import { Link } from "@/model/Link";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const links = await Link.find({ userId: session.user.email }).sort({
    createdAt: -1,
  });

  return NextResponse.json({ links });
}
