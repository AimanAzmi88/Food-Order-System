import { pool } from "../database/connection.js";

const addMenu = async (req, res) => {
    const { itemType } = req.params; // Extract itemType properly from req.params
    const { name, price } = req.body;

    // Map valid item types to table names
    const validItemTypes = {
        food: "foods",
        drink: "drinks",
        addon: "add_ons",
    };

    const tableName = validItemTypes[itemType]; // Validate and map itemType to table name
    if (!tableName) {
        return res.status(400).json({ error: "Invalid item type" });
    }

    const query = `
        INSERT INTO ${tableName} (name, price)
        VALUES ($1, $2)
        RETURNING *`;

    try {
        const result = await pool.query(query, [name, price]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error executing query:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
};

export default addMenu;
