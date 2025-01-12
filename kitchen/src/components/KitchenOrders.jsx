import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://food-order-system-0fho.onrender.com'); // Connect to the server

const OrderUpdates = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Listening for the 'newOrder' event from the server
    socket.on('newOrder', (order) => {
      console.log("New order received:", order);
      setOrders((prevOrders) => [...prevOrders, order]); // Add the new order to the list
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.off('newOrder');
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-8">Kitchen Orders</h1>
  
      <div id="orders" className="space-y-4">
        {/* Render the orders received */}
        {orders.map((orderData, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-lg rounded-lg border border-gray-200"
          >
            <h3 className="text-xl font-semibold">Place: {orderData.place}</h3>
            <h3 className="text-xl font-semibold">Name: {orderData.name}</h3>
  
            <ul className="list-disc ml-6 space-y-4">
              {Array.isArray(orderData.order_data) &&
                orderData.order_data.map((order, orderIndex) => (
                  <li key={orderIndex} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{order.name}</span>
                      <span>${order.totalPrice.toFixed(2)}</span>
                    </div>
  
                    {/* Addons section */}
                    {Array.isArray(order.addons) && order.addons.length > 0 && (
                      <ul className="list-disc ml-6">
                        {order.addons.map((addon, addonIndex) => (
                          <li key={addonIndex} className="text-gray-700">
                            {addon.name} (+${addon.price ? addon.price.toFixed(2) : '0.00'})
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
            </ul>
  
            <div className="mt-4 flex justify-between">
              <span className="font-bold">Total Price:</span>
              <span>${parseFloat(orderData.total_price).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default OrderUpdates;
