import stripePackage from "stripe";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";

const stripe = stripePackage(process.env.SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (error) {
    console.log("webhook signature failed");
    return res.status(400).send(`webhook error, ${error.message}`);
  }
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("payment succeeded", paymentIntent.id);
      await transactionModel.findOneAndUpdate(
        { stripePaymentId: paymentIntent.id },
        { status: "completed" }
      );
      await userModel.findByIdAndUpdate(paymentIntent.metadata.userId, {
        $inc: { creditBalance: parseInt(paymentIntent.metadata.credits) },
      });
      break;

    case "payment_intent.payment_failed":
      console.log("payment failed", event.data.object.id);
      break;

    default:
      console.log(`unhandled event type: ${event.type}`);
  }
  res.json({ received: true });
};
