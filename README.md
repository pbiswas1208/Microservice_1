# Order Service
Microservice for order management built using NodeJS,ExpressJS, MongoDB , providing endpoints to create, retrieve, update, and delete orders.

## Installation

To install the necessary dependencies, run:

**npm install**

## Start the server

To start running the app:

**node app**

The server will start running on port 3000 by default.

## Application Structure

The application consists of the following main components:

- **app.js**: Entry point of the application. Defines routes for order operations and starts the server.
- **orderController.js**: Contains controllers for handling various order operations such as creating, retrieving, updating, and deleting orders.
- **orderModel.js**: Defines the Mongoose schema for the Order model, including pre-save hooks to calculate the total price before saving the order document.

## API Endpoints

The following API endpoints are available:

- **POST /orders/createOrder**: Create a new order.
- **GET /orders/getAllOrders**: Retrieve all orders.
- **GET /orders/getOrderbyId/:orderId**: Retrieve an order by its ID.
- **PUT /orders/updateOrderById/:orderId**: Update an order by its ID.
- **DELETE /orders/deleteOrderById/:orderId**: Delete an order by its ID.

## Dependencies

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Body-parser**: Node.js body parsing middleware to parse incoming request bodies.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **MongoDB**: MongoDB needs to be running on port 27017 by default but could be changed if needed.
- **Axios**: Promise-based HTTP client for the browser and Node.js, used for making HTTP requests to external APIs.

## Contributing

Contributions are welcome! Please create a new branch for your changes and submit a pull request.



