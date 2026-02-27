import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { email } = body;

    // Cloudflare sitúa las variables de entorno en locals.runtime.env cuando usas el adaptador
    const env = (locals as any).runtime?.env;

    console.log("New waitlist signup:", email);

    if (env?.BREVO_API_KEY && env?.BREVO_LIST_ID) {
      const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          email,
          listIds: [Number(env.BREVO_LIST_ID)],
          updateEnabled: true,
        }),
      });

      if (!brevoRes.ok) {
        const text = await brevoRes.text();
        console.error("Brevo error:", text);
        return new Response(JSON.stringify({ error: "Brevo error" }), { status: 500 });
      }
    } else {
      console.warn("API Keys missing in environment");
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 202,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
};