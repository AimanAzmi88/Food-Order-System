import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import database from './database/connection.js';
import addMenu from './controller/menuUpdate.js';
import menuList from './controller/menuList.js';
import deleteItem from './controller/menuDelete.js';
import {saveOrder, getAllOrders} from './controller/order.js'; 

const app = express();
const PORT = 3000;

const wss = new WebSocketServer({ port: 8080 });

app.use(cors());
app.use(bodyParser.json());

// Initialize database connection
database();

// In-memory cart and orders
let cart = [];
let orders = [];

// WebSocket broadcast function
const broadcastOrder = (order) => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // Check if the connection is open
      client.send(JSON.stringify(order)); // Send the order to the kitchen
    }
  });
};

// WebSocket connection event
wss.on('connection', (ws) => {
  console.log('A kitchen client connected');

  ws.on('message', (message) => {
    console.log('Received message from kitchen:', message);
  });

  ws.on('close', () => {
    console.log('A kitchen client disconnected');
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

    // Broadcast the saved order
    broadcastOrder(savedOrder);

    console.log("Order saved and broadcasted:", savedOrder);
    res.json({ success: true, message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
});

app.get('/orders', getAllOrders)
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
