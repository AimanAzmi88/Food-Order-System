import { pool } from "../database/connection.js"

const foodList = async (req, res) => {
    const querey = `
    SELECT * FROM foods`

    try {
        const result = await pool.query(querey)
        res.status(200).json(result.rows)
    } catch (error) {
        console.error(error.message)
        res.status(500).json('Server Error')
    }
}

const drinkList = async (req, res) => {
    const querey = `
    SELECT * FROM drinks`

    try {
        const result = await pool.query(querey)
        res.status(200).json(result.rows)
    } catch (error) {
        console.error(error.message)
        res.status(500).json('Server Error')
    }
}

const add_onsList = async (req, res) => {
    const querey = `
    SELECT * FROM add_ons`

    try {
        const result = await pool.query(querey)
        res.status(200).json(result.rows)
    } catch (error) {
        console.error(error.message)
        res.status(500).json('Server Error')
    }
}

const menuList = {
    foodList,
    drinkList,
    add_onsList,
}

export default menuList