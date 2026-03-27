// v1.0.4 - Direct GHL Integration (Zero-Config Build)
export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    // 1. Mandatory fields validation
    if (!data.fullName || !data.email || !data.phone || !data.company) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Format validation (Email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. Format validation (Phone)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(data.phone)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid phone format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 4. Dispatch ONLY to GoHighLevel (Direct URL)
    const ghlWebhookUrl = "https://services.leadconnectorhq.com/hooks/f23qw5Er9sX7IiGsrvQa/webhook-trigger/67e172b7-cdb4-48f9-935b-2d32173218ef";

    const ghlPayload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      source: "Traderise Website",
      timestamp: new Date().toISOString()
    };

    const ghlResponse = await fetch(ghlWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ghlPayload)
    });

    if (!ghlResponse.ok) {
        const errorText = await ghlResponse.text();
        throw new Error(`GHL Webhook failed: ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true, message: "Lead sent to GHL successfully" }), {
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
