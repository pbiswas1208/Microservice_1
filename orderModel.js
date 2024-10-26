// orderModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product: {
    type: Object,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

// Define virtual property for price
productSchema.virtual('price').get(function() {
  // Compute price by multiplying productPrice and quantity
  return this.product.productPrice * this.quantity;
});

// Enable virtuals to be included in JSON.stringify()
productSchema.set('toJSON', { virtuals: true });

const orderSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  productList: [productSchema], // Array of product items
  totalPrice: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'confirmed'
  }
});

// Calculate total price before saving the order document
orderSchema.pre('save', function(next) {
  // Sum up the prices of all products in the productList
  const totalPrice = this.productList.reduce((acc, product) => acc + product.price, 0);
  this.totalPrice = totalPrice; // Update the totalPrice field
  next();
});

module.exports = mongoose.model('Order', orderSchema);
