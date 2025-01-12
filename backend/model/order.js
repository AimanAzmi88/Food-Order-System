import { pool } from "../database/connection.js";

const order = `
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    place VARCHAR(255) NOT NULL,
    order_data JSONB NOT NULL, 
    total_price DECIMAL(10, 2) NOT NULL,  -- Add total price column
    created_at TIMESTAMP DEFAULT NOW()
);
`;

const orderTable = async () => {
    try {
        await pool.query(order);
        console.log('Orders table created successfully.');
    } catch (e) {
        console.error('Error creating orders table:', e.message);
    }
};

export default orderTable;
