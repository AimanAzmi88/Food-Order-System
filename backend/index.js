import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';  // Import http for socket.io integration
import { Server } from 'socket.io';  // Correct import for socket.io in ES modules
import database from './database/connection.js';
import addMenu from './controller/menuUpdate.js';
import menuList from './controller/menuList.js';
import deleteItem from './controller/menuDelete.js';
import { saveOrder, getAllOrders } from './controller/order.js'; 

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

database();

io.on('connection', (socket) => {
  console.log('A kitchen client connected');

  socket.on('disconnect', () => {
    console.log('A kitchen client disconnected');
  });
});

app.post('/menu/:itemType', addMenu);
app.delete('/menu/:itemType/:itemId', deleteItem);
app.get('/menu/food', menuList.foodList);
app.get('/menu/drink', menuList.drinkList);
app.get('/menu/addon', menuList.add_onsList);


app.post('/order', async (req, res) => {
  const { order, userName, place, totalPrice } = req.body;

  const data = { name: userName, place, order, total_price: totalPrice };

  try {
    const savedOrder = await saveOrder(data);
    io.emit('newOrder', savedOrder); 
    console.log("Order saved and broadcasted:", savedOrder);
    res.json({ success: true, message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
});

app.get('/orders', getAllOrders);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
