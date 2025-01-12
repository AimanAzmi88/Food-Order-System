import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http'; // Required for integrating with socket.io
import { Server } from 'socket.io'; // Correct import for socket.io in ES modules
import database from './database/connection.js';
import addMenu from './controller/menuUpdate.js';
import menuList from './controller/menuList.js';
import deleteItem from './controller/menuDelete.js';
import { saveOrder, getAllOrders } from './controller/order.js'; 

const app = express();
const server = http.createServer(app); // Create the HTTP server for Express
const io = new Server(server, {
  cors: {
    origin: "*",  // Allow this origin
    methods: ["GET", "POST"],        // Allow these HTTP methods
    allowedHeaders: ["Content-Type"], // Allow headers like Content-Type
  },
});

const PORT = 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Initialize database connection
database();

// In-memory cart and orders
let cart = [];
let orders = [];

// Socket.io event handling and broadcasting
io.on('connection', (socket) => {
  console.log('A kitchen client connected');

  socket.on('disconnect', () => {
    console.log('A kitchen client disconnected');
  });

  socket.on('order', (order) => {
    console.log('Received order from kitchen:', order);
    // Broadcast order to all clients (you can broadcast it to a specific room if necessary)
    io.emit('newOrder', order);
  });
});

// Routes for menu operations
app.post('/menu/:itemType', addMenu);
app.delete('/menu/:itemType/:itemId', deleteItem);
app.get('/menu/food', menuList.foodList);
app.get('/menu/drink', menuList.drinkList);
app.get('/menu/addon', menuList.add_onsList);

// Handle placing orders
app.post('/order', async (req, res) => {
  const { order, userName, place, totalPrice } = req.body; // Get details from the request body

  const data = { name: userName, place, order, total_price: totalPrice }; // Structure data for saving

  try {
    // Save the order using saveOrder function
    const savedOrder = await saveOrder(data);

    // Broadcast the saved order via socket.io to all connected clients
    io.emit('newOrder', savedOrder);

    console.log("Order saved and broadcasted:", savedOrder);
    res.json({ success: true, message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
});

app.get('/orders', getAllOrders);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
