Joystick Journey

A premium e-commerce website for a joystick-controlled marble maze with swappable boards built with Next.js, Stripe API, and Resend API.
Live demo at https://www.joystickjourney.shop

Quick Start
Visit the live site — no install needed.
To run locally:
bashgit clone https://github.com/arhanlev/joystick-journey-public

cd joystick-journey-public

npm install

npm run dev

Features:

Full e-commerce store with Stripe checkout — real payments, shipping address collection, and order confirmation
Branded confirmation emails via Resend sent automatically after every purchase
Color customization — choose maze color and joystick color at checkout
Swappable maze boards gallery — click to browse all available maze designs
Bundle options — Starter Kit (4 mazes) or Bundle (9 mazes)
YouTube tutorial page embedded directly on the site
Fully responsive — works on mobile, tablet, and desktop
Dark premium UI with Framer Motion scroll animations throughout

How It Works:

The site is built on Next.js App Router with a fully serverless backend. When a customer clicks "Add to Cart", a POST request hits /api/checkout which dynamically creates a Stripe Checkout session with the selected product options (color, joystick color, bundle) passed as metadata. Stripe handles all card processing and address collection securely.
After a successful payment, Stripe redirects to /success which fetches the session details via /api/get-session and triggers /api/send-confirmation to send a branded HTML email through Resend from confirmation@joystickjourney.shop.
Rather than pre-creating products in Stripe's dashboard, all product data is generated dynamically at checkout time — keeping the codebase as the single source of truth for pricing and product details.
