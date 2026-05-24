import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { sessionId } = await request.json()

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items']
    })

    const lineItem = session.line_items?.data[0]

    return Response.json({
      email: session.customer_details?.email,
      name: session.customer_details?.name,
      productName: lineItem?.description || 'Joystick Journey',
      total: (session.amount_total / 100).toFixed(2),
      description: session.metadata?.color ? 
        `Color: ${session.metadata.color} | Joystick: ${session.metadata.joystickColor}` : '',
    })
  } catch (error) {
    console.error('Session error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}