import { Resend } from 'resend' //resend API 

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const body = await request.json()
    const { customerEmail, customerName, orderDetails } = body

    await resend.emails.send({
      from: 'Joystick Journey <confirmation@joystickjourney.shop>',
      to: customerEmail,
      subject: 'Your Joystick Journey Order is Confirmed! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            
            <!-- Header -->
            <div style="text-align:center;padding-bottom:32px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <h1 style="font-size:24px;font-weight:700;color:#F5F0E8;margin:0;letter-spacing:-0.02em;">
                Joystick <span style="color:#C8791A;">Journey</span>
              </h1>
            </div>

            <!-- Hero -->
            <div style="padding:40px 0;text-align:center;">
              <div style="font-size:48px;margin-bottom:16px;">🎉</div>
              <h2 style="font-size:28px;font-weight:700;color:#F5F0E8;margin:0 0 12px;letter-spacing:-0.02em;">
                Order Confirmed!
              </h2>
              <p style="font-size:16px;color:rgba(245,240,232,0.5);margin:0;font-weight:300;line-height:1.6;">
                Thank you ${customerName ? customerName : 'for your order'}! Your Joystick Journey is on its way.
              </p>
            </div>

            <!-- Order Details -->
            <div style="background:#111;border:1px solid rgba(245,240,232,0.06);border-radius:8px;padding:24px;margin-bottom:24px;">
              <h3 style="font-size:12px;font-weight:500;color:#C8791A;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 16px;">
                Order Details
              </h3>
              <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(245,240,232,0.06);">
                <span style="font-size:14px;color:rgba(245,240,232,0.6);">${orderDetails.name}</span>
                <span style="font-size:14px;color:#F5F0E8;font-weight:500;">$${orderDetails.price}</span>
              </div>
              <div style="padding:12px 0;border-bottom:1px solid rgba(245,240,232,0.06);">
                <span style="font-size:13px;color:rgba(245,240,232,0.4);">${orderDetails.description}</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding:12px 0;">
                <span style="font-size:14px;color:rgba(245,240,232,0.6);">Shipping</span>
                <span style="font-size:14px;color:#F5F0E8;">$4.21</span>
              </div>
            </div>

            <!-- Shipping Info -->
            <div style="background:#111;border:1px solid rgba(245,240,232,0.06);border-radius:8px;padding:24px;margin-bottom:24px;">
              <h3 style="font-size:12px;font-weight:500;color:#C8791A;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 16px;">
                Shipping Info
              </h3>
              <p style="font-size:14px;color:rgba(245,240,232,0.5);margin:0;line-height:1.6;font-weight:300;">
                📦 Your order will ship within <strong style="color:#F5F0E8;">1-2 weeks</strong>.<br/>
                You'll receive a tracking number once your order ships.
              </p>
            </div>

            <!-- CTA -->
            <div style="text-align:center;margin-bottom:32px;">
              <a href="https://joystickjourney.shop" style="display:inline-block;background:linear-gradient(135deg,#C8791A,#E8A84A);color:#0A0A0A;text-decoration:none;padding:14px 32px;border-radius:2px;font-size:14px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">
                Visit Our Store
              </a>
            </div>

            <!-- Socials -->
            <div style="text-align:center;padding:24px 0;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="font-size:12px;color:rgba(245,240,232,0.3);margin:0 0 12px;letter-spacing:0.06em;text-transform:uppercase;">Follow us</p>
              <p style="font-size:13px;color:rgba(245,240,232,0.4);margin:0;">
                TikTok & Instagram: <span style="color:#C8791A;">@officialjoystickjourney</span>
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align:center;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="font-size:12px;color:rgba(245,240,232,0.2);margin:0;line-height:1.6;">
                Questions? Email us at <a href="mailto:officialjoystickjourney@gmail.com" style="color:#C8791A;text-decoration:none;">joystickjourney@gmail.com</a><br/>
                ⚠️ Choking hazard — contains small parts. Not suitable for children under 3 years.
              </p>
            </div>

          </div>
        </body>
        </html>
      `
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}