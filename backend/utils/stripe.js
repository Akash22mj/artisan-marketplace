const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a payment intent
const createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
    });
    return paymentIntent;
  } catch (err) {
    console.error('Error creating payment intent:', err);
    throw err;
  }
};

// Handle Stripe webhook events (e.g., payment success, failure)
const handleWebhook = async (payload, sig) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    throw err;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      // Update your database or trigger other actions here
      break;
    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object;
      console.log('Payment failed:', failedPaymentIntent.id);
      // Handle failed payment
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
};

module.exports = { createPaymentIntent, handleWebhook };