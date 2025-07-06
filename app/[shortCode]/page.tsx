import { redirect } from "next/navigation";

type ShortCodePageProps = {
  params: {
    shortCode: string;
  };
};


export default function RedirectPage({ params }: ShortCodePageProps) {
  redirect(`/api/links/${params.shortCode}`);
}
