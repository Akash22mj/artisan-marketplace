import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const products = [
  {
    id: 1,
    name: 'Handmade Necklace',
    description: 'Beautiful handmade necklace with natural stones.',
    price: 45,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 2,
    name: 'Eco-Friendly Bag',
    description: 'Eco-friendly tote bag made from recycled materials.',
    price: 30,
    image: 'https://via.placeholder.com/300',
  },
  // Add more products here
];

const Home = () => {
  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                ${product.price}
              </Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;