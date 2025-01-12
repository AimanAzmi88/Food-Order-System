import { pool } from "../database/connection.js";

export const saveOrder = async (orderData) => {
    const { name, place, order, total_price } = orderData; // Destructure the order data, including total_price
    
    // Convert the order array/object into a JSON string
    const orderJson = JSON.stringify(order);

    const query = `
      INSERT INTO orders (name, place, order_data, total_price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
  
    try {
      // Pass the orderJson as the third parameter
      const result = await pool.query(query, [name, place, orderJson, total_price]);
      return result.rows[0]; // Return the inserted row
    } catch (error) {
      console.error("Error saving order:", error.message);
      throw error; // Propagate the error for further handling
    }
};


export const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database ordered by created_at (most recent first)
    const result = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");

    // Send the response with the fetched orders
    res.json({ success: true, orders: result.rows });
  } catch (error) {
    console.error("Error fetching all orders:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch all orders" });
  }
};

