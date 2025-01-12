import { pool } from '../database/connection.js';

const food = `
CREATE TABLE IF NOT EXISTS foods (

  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
`

export const foodTable = async () => {
    try {
        await pool.query(food);
        console.log('Menus table created successfully.');
    } catch (e) {
        console.error('Error creating menus table:', e.message);
    
}}

const drink = `
CREATE TABLE IF NOT EXISTS drinks (

  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
`

export const drinkTable = async () => {
    try {
        await pool.query(drink);
        console.log('Drinks table created successfully.');
    } catch (e) {
        console.error('Error creating drinks table:', e.message);
    }
}

const addOn = `
CREATE TABLE IF NOT EXISTS add_ons (

  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
`
export const addOnTable = async () => {
    try {
        await pool.query(addOn);
        console.log('Add-ons table created successfully.');
    } catch (e) {
        console.error('Error creating add-ons table:', e.message);
    }
}