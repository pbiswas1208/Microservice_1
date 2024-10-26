// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const orderController = require('./orderController');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB database
const argv = require('minimist')(process.argv.slice(2));

// Read MongoDB connection options from command line arguments
const mongodbHost = argv.host || 'localhost';
const mongodbPort = argv.port || '27017';
const mongodbDatabase = argv.database || 'order_service';

// Construct MongoDB connection string
const connectionString = `mongodb://${mongodbHost}:${mongodbPort}/${mongodbDatabase}`;

// Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Define routes for order operations
app.post('/orders/createOrder', orderController.createOrder);
app.get('/orders/getAllOrders', orderController.getAllOrders);
app.get('/orders/getOrderbyId/:orderId', orderController.getOrderById);
app.put('/orders/updateOrderById/:orderId', orderController.updateOrder);
app.delete('/orders/deleteOrderById/:orderId', orderController.deleteOrder);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Order Service is running on port ${PORT}`);
});
