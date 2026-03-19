export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.fullName || !data.email || !data.company) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // SMTP2GO API Endpoint
    const endpoint = "https://api.smtp2go.com/v3/email/send";
    
    // Construct the email payload
    const payload = {
      api_key: env.SMTP2GO_API_KEY,
      to: ["traderisemarketing@outlook.com"],
      sender: "info@dtreeind.com",
      subject: "New Strategy Session Request - Traderise",
      html_body: `
        <h2>New Strategy Session Request</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company}</p>
      `,
      text_body: `Name: ${data.fullName}\nEmail: ${data.email}\nCompany: ${data.company}`
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.data.error || "Failed to send email via SMTP2GO");
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
