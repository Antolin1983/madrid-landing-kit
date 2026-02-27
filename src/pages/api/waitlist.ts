import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Intentamos leer como JSON, y si falla, leemos como FormData
    let email = "";
    const contentType = request.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const body = await request.json();
      email = body.email;
    } else {
      const formData = await request.formData();
      email = formData.get("email")?.toString() || "";
    }

    if (!email) {
      return new Response(JSON.stringify({ error: "Email missing" }), { status: 400 });
    }

    const env = (locals as any).runtime?.env;

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
        // Si Brevo falla, devolvemos 500 para saber que el problema es la API Key
        return new Response(JSON.stringify({ error: "Brevo API error" }), { status: 500 });
      }
    }

    // SI TODO VA BIEN -> EL ANSIADO 202
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 202,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};