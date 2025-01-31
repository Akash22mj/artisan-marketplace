const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Re-throw the error for the calling function to handle
  }
};

// Create a payment intent
export const fetchPaymentIntent = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payments/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error; // Re-throw the error for the calling function to handle
  }
};