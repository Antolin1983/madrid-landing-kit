export const onRequestPost = async ({ request, env }: any) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email");

    if (!email || typeof email !== "string") {
      return new Response("Missing email", { status: 400 });
    }

    console.log("New waitlist signup:", email);

    // 🚧 Brevo solo si existe la API key (en prod)
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
        return new Response("Brevo error", { status: 500 });
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
};