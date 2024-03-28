import type { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { z } from "zod";
import assert from "assert";
import { supabase } from "@/lib/supabase.server";

const schema = z.object({
  custom_url: z.string().optional(),
  destination: z.string().url(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const validation = schema.safeParse(req.body);
  if (validation.success === false) {
    return res.status(400).json({ message: validation.error });
  }

  const { custom_url, destination } = validation.data;
  const { data, error } = await supabase
    .from("redirection_url")
    .insert({ source: custom_url ?? nanoid(6), destination })
    .select()
    .single();

  if (error?.code === "23505") {
    return res.status(409).json({ message: "Custom URL already exists" });
  }

  if (error) {
    return res.status(500).json({ message: "Failed to create short link", error });
  }

  assert(data, "Data should not be null");
  res.status(201).json({
    shortLink: `${process.env.NEXT_PUBLIC_BASE_URL}/s/${data.source}`,
  });
}
