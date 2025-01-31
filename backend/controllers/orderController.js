const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  const { products, totalAmount, customer } = req.body;

  try {
    const order = new Order({ products, totalAmount, customer });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.userId }).populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};