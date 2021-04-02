const stripe = require("stripe")(
  "sk_test_51IIi2qHCVzebv36SElQ0NYBVe4LoX9qeG8ZeJBLbxc0H8cgx8TzhGF2UNx7s4XMhCvUz9SMwPyUFDqpLkK2Ysk3700ZsOr2jex"
);
const express = require("express");
const app = express();
const models = require("../models");
const router = express.Router();
app.use(express.static("."));

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Stubborn Attachments",
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // success_url: `${localhost:3000}/success.html`,
    // cancel_url: `${localhost:3000}/cancel.html`,
  });

  res.json({ id: session.id });
});

module.exports = router;
