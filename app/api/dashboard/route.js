import { supabase } from "../../../lib/supabaseClient";

export async function POST(req) {
  const body = await req.json();
  const { user_id, name, img, last_watered, status } = body;

  const { data, error } = await supabase
    .from("plants")
    .insert([
      {
        user_id,
        name,
        img,
        last_watered,
        status,
      },
    ])
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data[0]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
