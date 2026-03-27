// v1.0.1 - Triggering build with new environment variables
export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.fullName || !data.email || !data.phone || !data.company) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(data.phone)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid phone format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 1. Dispatch to GoHighLevel (If configured)
    if (env.GHL_WEBHOOK_URL) {
      try {
        const ghlPayload = {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          company: data.company,
          source: "Traderise Website",
          timestamp: new Date().toISOString()
        };

        const ghlResponse = await fetch(env.GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ghlPayload)
        });

        if (!ghlResponse.ok) {
          console.error("GHL Webhook failed:", await ghlResponse.text());
        }
      } catch (ghlError) {
        console.error("GHL Error:", ghlError.message);
      }
    }

    // 2. Dispatch to Resend (Primary Inbox Backup)
    const resendEndpoint = "https://api.resend.com/emails";
    const resendPayload = {
      from: "Traderise <info@dtreeind.com>",
      to: ["traderisemarketing@outlook.com"],
      subject: `New Strategy Lead: ${data.fullName}`,
      html: `
        <h2>New Strategy Session Request</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><small>Sent from Traderise Marketing System</small></p>
      `,
      text: `Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company}`
    };

    const response = await fetch(resendEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify(resendPayload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send email via Resend");
    }

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
