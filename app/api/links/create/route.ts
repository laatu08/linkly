import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { dbConnect } from "@/lib/dbConnect";
import { Link } from "@/model/Link";
import { generateSlug } from "@/lib/generateSlug";
// import {generateSlug} from ""

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { originalUrl } = await req.json();
  if (!originalUrl) {
    return NextResponse.json({ error: "Missing originalUrl" }, { status: 400 });
  }

  await dbConnect();

  const shortCode = generateSlug();

  const newLink = await Link.create({
    userId: session.user.email,
    originalUrl,
    shortCode,
  });

  return NextResponse.json({
    success: true,
    link: {
      shortCode: newLink.shortCode,
      originalUrl: newLink.originalUrl,
    },
  });
}
