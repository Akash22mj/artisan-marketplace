import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import { fetchProductById } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        console.log('Fetching product with ID:', id); // Debugging log
        const data = await fetchProductById(id);
        console.log('Product data:', data); // Debugging log
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    getProduct();
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ marginTop: 4 }}>
      <Card>
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="400"
              image={product.image}
              alt={product.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
                {product.description}
              </Typography>
              <Typography variant="h5" sx={{ marginTop: 2 }}>
                ${product.price}
              </Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Add to Cart
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default ProductDetail;