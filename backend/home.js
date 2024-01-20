const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const dotenv = require("dotenv");

const app = express();
const router = express.Router();

dotenv.config();

const pool = mysql.createPool({
    connectionLimit:10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'techtrek24'
});

router.use(cors());
router.use(bodyParser.json());

async function checkExistAndInsert(table, columnName, ) {
    const [rows, fields] = await pool.execute("SELECT * FROM country WHERE id = ?", [country_id]);
    return rows.length > 0
}

router.get('/api/home/:user_id', (req, res) => {
    pool.query('SELECT * FROM itinerary WHERE user_id = ?', 
    [req.params.user_id], (err, result) => {
        if (err) {
            console.error("Failed to load itinerary", err);
            res.status(500).json({ error: 'Failed to add itinerary'});
            return;
        }
        res.json(result);
    })
});

router.post('/api/home/:user_id', (req, res) => {
    pool.query('INSERT INTO itinerary SET (user_id, ?)',
    [req.params.user_id, req.body], (err, result) => {
        if (err) {
            console.error("Failed to add itinerary", err);
            res.status(500).json({ error: 'Failed to add itinerary'});
            return;
        }
        res.status(202).json({ message: "Add itinerary successfully"});
    })
});

router.delete('/api/home', (req, res) => {
    pool.query('DELETE FROM itinerary WHERE user_id = ? and id = ?', 
    [req.body], (err, result) => {
        if (err) {
            console.error("Failed to delete itinerary", err);
            res.status(500).json({ error: "Failed to delete itinerary"});
            return;
        }
        res.status(200).json({ message: "Itinerary deleted successfully"});
    })
});

app.use(router);

app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log("Listening on port 3000");
})