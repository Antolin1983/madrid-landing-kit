import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email missing" }), { status: 400 });
    }

    const env = (locals as any).runtime?.env;

    // Solo llamamos a Brevo si las credenciales existen
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
        const errorText = await brevoRes.text();
        console.error("Brevo error:", errorText);
        return new Response(JSON.stringify({ error: "API Error" }), { status: 500 });
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 202,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Error" }), { status: 500 });
  }
};