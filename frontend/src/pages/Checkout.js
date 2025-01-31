import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { fetchPaymentIntent } from '../services/api';

const Checkout = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);

  const cartItems = [
    { id: 1, name: 'Handmade Necklace', price: 45, quantity: 1 },
    { id: 2, name: 'Eco-Friendly Bag', price: 30, quantity: 2 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Fetch payment intent from the backend
      const { clientSecret } = await fetchPaymentIntent({ amount: total * 100 });

      // Initialize Stripe
      const stripe = await loadStripe('your_stripe_publishable_key');

      // Confirm the payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            number: cardNumber,
            exp_month: expiry.split('/')[0],
            exp_year: expiry.split('/')[1],
            cvc: cvc,
          },
        },
      });

      if (error) {
        alert('Payment failed. Please try again.');
      } else {
        alert('Payment successful! Thank you for your purchase.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Total: ${total}
      </Typography>

      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Payment Details
      </Typography>
      <TextField
        label="Card Number"
        fullWidth
        margin="normal"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <TextField
        label="Expiry Date (MM/YY)"
        fullWidth
        margin="normal"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
      />
      <TextField
        label="CVC"
        fullWidth
        margin="normal"
        value={cvc}
        onChange={(e) => setCvc(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </Button>
    </Container>
  );
};

export default Checkout;