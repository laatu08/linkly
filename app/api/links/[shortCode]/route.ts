import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Link } from "@/model/Link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: { shortCode: string } }
) {
  const shortCode = params.shortCode;
  const userAgent = req.headers.get("user-agent") || "";

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown";

  await dbConnect();

  const link = await Link.findOne({ shortCode });
  if (!link) {
    return NextResponse.json(
      { error: "Short link not found" },
      { status: 404 }
    );
  }

  //   log the click
  link.clicks.push({
    timestamp: new Date(),
    ip,
    userAgent,
  });
  link.clickCount += 1;
  await link.save();

  // Redirect to original url
  return NextResponse.redirect(link.originalUrl);
}


export async function DELETE(
  req: Request,
  { params }: { params: { shortCode: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const link = await Link.findOne({ shortCode: params.shortCode });

  if (!link) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 });
  }

  if (link.userId !== session.user.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await Link.deleteOne({ shortCode: params.shortCode });

  return NextResponse.json({ success: true });
}