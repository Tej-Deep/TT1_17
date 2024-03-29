const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const mysql = require("mysql2");

const pool = require('../db')
const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

async function checkExistAndInsert(table, column, check_value) {
    console.log("hi")
    pool.execute(`SELECT * FROM ${table} WHERE ${column} = "${check_value}"`, (err, result) => {
        console.log(result.length)
        if (!result.length) {
            pool.query(`INSERT INTO ${table} (${column}) VALUES (?)`, [check_value], (err, result)=>{
                if (err){
                    console.log(err)
                }
            });
            console.log('Record inserted');                
        } else {
            console.log('Record already exists');
        }
    });
}

router.get('/:user_id', (req, res) => {
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

router.post('/:user_id', async (req, res) => {
    console.log(req)
    await checkExistAndInsert('country', 'name', req.body.country_name);

    pool.query('SELECT id FROM country WHERE name = ?', [req.body.country_name], (err, result) => {
        console.log(result)
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

router.delete('/', (req, res) => {
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


module.exports = router;
