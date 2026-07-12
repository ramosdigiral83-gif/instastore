import express from "express";
import path from "path";
import Stripe from "stripe";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Use a simulated payment mode if Stripe key is not present
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  let stripe: Stripe | null = null;
  if (stripeKey) {
    stripe = new Stripe(stripeKey);
  } else {
    console.warn("STRIPE_SECRET_KEY not found. Operating in simulated payment mode.");
  }

  // API routes
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { items } = req.body;
      const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;

      if (!stripe) {
        // Simulated checkout
        return res.json({ 
          url: `${appUrl}/success?simulated=true` 
        });
      }

      const lineItems = items.map((item: any) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${appUrl}/success`,
        cancel_url: `${appUrl}/cart`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
