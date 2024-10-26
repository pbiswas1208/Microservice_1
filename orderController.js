// orderController.js
const Order = require('./orderModel');
const axios = require('axios');

exports.createOrder = async (req, res) => {
  try {
    // const userApiUrl = 'https://dummyuserapi.com/api/users/';

    const { userId, productList} = req.body;

    // // Check if the user exists
    // const userResponse = await axios.get(`${userApiUrl}${userId}`);

    // if (!userResponse.data) {
    //   return res.status(404).json({ error: 'User not found' });
    // }

    // Fetch product details for each product in the productList
    const productDetailsPromises = productList.map(async (product) => {
      const productResponse = await axios.get(`http://localhost:5000/product/list/${product.productId}`);
      return {
        product: productResponse.data,
        quantity: product.quantity
      };
    });

    // Wait for all product detail requests to finish
    const productDetails = await Promise.all(productDetailsPromises);

    // Create order with product details
    const order = new Order({ userId, productList: productDetails});
    // const order = new Order({ userId, productList });
    await order.save();
    const emailUrl = 'http://localhost:7148/api/SendEmailFunction';

    // Dummy data to be sent in the HTTP POST request
    const orderData = {order};

    // Send HTTP POST request to the dummy URL with the order object
    axios.post(emailUrl, orderData)
  .then(response => {
    console.log('Email sent successfully:', response.data);
  })
  .catch(error => {
    console.error('Error sending email:', error);
  });

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  };

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};


exports.updateOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order' });
    }
  };
  
exports.deleteOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete order' });
    }
  };
  
