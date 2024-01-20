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

function checkExistAndInsert(table, column, check_value) {
    try {
        pool.execute(`SELECT * FROM ${table} WHERE ${column} = "${check_value}"`, (err, result) => {
            if (!result) {
                pool.execute(`INSERT INTO ${table} (${column}) VALUES (?)`, [check_value]);
                console.log('Record inserted');                
            } else {
                console.log('Record already exists');
            }
        });
    } catch (err) {
        console.log('Checking Error:', err);
    }
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
    checkExistAndInsert('country', 'name', req.body.country_name);
    pool.query('SELECT id FROM country WHERE name = ?', [req.body.country_name], (err, result) => {
        const country_id = result[0].id;
        pool.query('INSERT INTO itinerary (user_id, country_id, budget, title) VALUES (?, ?, ?, ?)',
        [req.params.user_id, country_id, req.body.budget, req.body.title], (err, result) => {
            if (err) {
                console.error("Failed to add itinerary", err);
                res.status(500).json({ error: 'Failed to add itinerary'});
                return;
            }
            res.status(202).json({ message: "Add itinerary successfully"});
        })
    });
    
});

router.delete('/api/home', (req, res) => {
    pool.query('DELETE FROM itinerary WHERE id = ?', 
    [req.body.id], (err, result) => {
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