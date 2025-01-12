import pkg from 'pg';
const { Pool } = pkg;
import { foodTable, drinkTable, addOnTable } from '../model/menu.js';
import orderTable from '../model/order.js';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

const database = async () => {
    try {
        const dbName = await pool.query('SELECT current_database()')
        const name = dbName.rows[0].name;
        const dbRes = await pool.query('SELECT NOW()')
        const time = dbRes.rows[0].now
        console.log(`Connected to ${name} database at ${time}`);

        await foodTable()
        await drinkTable()
        await addOnTable()
        await orderTable()

    } catch (err) {
        console.error('Error connecting to the database:', err.stack);
    }
};

export default database

