const mongoose = require('mongoose');
const app = require('./app'); // Import the Express app from app.js

// Manually set MONGODB_URI (temporary workaround)
const MONGODB_URI = 'mongodb://localhost:27017/artisan-marketplace';

// Log the MONGODB_URI to verify it's being read correctly
console.log('MONGODB_URI:', MONGODB_URI);

// Database connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});