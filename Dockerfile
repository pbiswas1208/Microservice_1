# Use the official Node.js 14 image as a base
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Clone your Express.js application repository from GitHub
RUN git clone https://github.com/almightyzeus/order-service.git .

# Install dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["node", "app.js", "--host", "mongodb.default.svc.cluster.local", "--port", "27017", "--database", "order-service"]
