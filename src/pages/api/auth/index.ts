import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import assert from "assert";
import { supabase } from "@/lib/supabase.public";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const validation = schema.safeParse(req.body);
  if (validation.success === false) {
    return res.status(400).json({ message: validation.error });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: validation.data.email,
    password: validation.data.password,
  });

  if (error) {
    console.error(error);
    return res.status(403).json({ message: "Failed to sign in", error });
  }

  assert(data, "No data in response");
  res.setHeader("Set-Cookie", `access_token=${data.session.access_token}; Path=/; HttpOnly; Secure; SameSite=Strict`);
  res.status(200).json({ message: "Success", accessToken: data.session.access_token });
}
