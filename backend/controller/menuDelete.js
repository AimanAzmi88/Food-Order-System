import { pool } from "../database/connection.js";

const deleteItem = async (req, res) => {
    const { itemType, itemId } = req.params; // Extract itemType and itemId from URL

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
    DELETE FROM ${tableName}
    WHERE id = $1
    RETURNING *`;

    try {
        const result = await pool.query(query, [itemId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: `${itemType} item not found` });
        }

        res.status(200).json({ message: `${itemType} item deleted successfully`, item: result.rows[0] });
    } catch (error) {
        console.error("Error executing query:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
};

export default deleteItem;
