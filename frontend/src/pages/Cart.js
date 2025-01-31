import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const Cart = () => {
  const cartItems = [
    { id: 1, name: 'Handmade Necklace', price: 45, quantity: 1 },
    { id: 2, name: 'Eco-Friendly Bag', price: 30, quantity: 2 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
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
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Proceed to Checkout
      </Button>
    </Container>
  );
};

export default Cart;