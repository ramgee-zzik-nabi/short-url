import type { GetServerSidePropsContext } from "next";
import { supabase } from "@/lib/supabase.server";

export default function ShortLinkPage() {
  return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const shortLinkId = context.params?.shortLinkId;

  if (typeof shortLinkId !== "string") {
    return { notFound: true };
  }

  const { data } = await supabase.from("redirection_url").select().eq("source", shortLinkId).throwOnError();

  if (!data?.[0]) {
    return { notFound: true };
  }

  await supabase
    .from("redirection_url")
    .update({ count: (data[0].count ?? 0) + 1 })
    .eq("source", shortLinkId);

  return {
    redirect: {
      destination: data[0].destination,
      permanent: false,
    },
  };
}
