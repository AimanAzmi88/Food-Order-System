import { useState, useEffect, useRef } from "react";

const KitchenOrders = () => {
  const [data, setData] = useState([]); // State to store the received data
  const socketRef = useRef(null); // Using useRef to persist the WebSocket connection

  // Function to create WebSocket connection
  const createWebSocketConnection = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      return socketRef.current; // If WebSocket is already open, return the existing connection
    }

    socketRef.current = new WebSocket("ws://localhost:8080");

    socketRef.current.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });

    socketRef.current.addEventListener("message", (event) => {
      try {
        const receivedData = JSON.parse(event.data); // Parse the received data

        // Add the new order to state if it doesn't exist already
        setData((prevData) => {
          const isDuplicate = prevData.some(
            (item) => item.id === receivedData.id // Check if the order with the same id exists
          );

          if (!isDuplicate) {
            return [...prevData, receivedData]; // Add the new order if it's unique
          }

          return prevData; // Return previous data if the order is a duplicate
        });
      } catch (error) {
        console.error("Error parsing received data:", error);
      }
    });

    socketRef.current.addEventListener("error", (error) => {
      console.error("WebSocket Error:", error);
    });

    socketRef.current.addEventListener("close", () => {
      console.log("WebSocket closed. Reconnecting...");
      setTimeout(createWebSocketConnection, 3000); // Reconnect on close
    });

    return socketRef.current;
  };

  // Setup WebSocket connection when the component mounts
  useEffect(() => {
    createWebSocketConnection();

    // Cleanup the WebSocket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        console.log("WebSocket connection closed");
      }
    };
  }, ); // Empty dependency array ensures it runs once when the component mounts

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-8">Kitchen Orders</h1>

      <div id="orders" className="space-y-4">
        {/* Render the orders received */}
        {data.map((orderData, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-lg rounded-lg border border-gray-200"
          >
            <h3 className="text-xl font-semibold">Place: {orderData.place}</h3>
            <h3 className="text-xl font-semibold">Name: {orderData.name}</h3>

            <ul className="list-disc ml-6 space-y-4">
              {Array.isArray(orderData.order_data) && orderData.order_data.map((order, orderIndex) => (
                <li key={orderIndex} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{order.name}</span>
                    <span>${order.totalPrice.toFixed(2)}</span>
                  </div>
                  {Array.isArray(order.addons) && order.addons.length > 0 && (
                    <ul className="list-disc ml-6">
                      {order.addons.map((addon, addonIndex) => (
                        <li key={addonIndex} className="text-gray-700">
                          {addon.name} (+${addon.price.toFixed(2)})
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

export default KitchenOrders;
