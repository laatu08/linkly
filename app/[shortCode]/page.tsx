import { redirect } from "next/navigation";

export default function RedirectPage({ params }: { params: { shortCode: string } }) {
  redirect(`/api/links/${params.shortCode}`);
}
