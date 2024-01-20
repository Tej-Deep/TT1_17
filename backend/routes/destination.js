var express = require('express');
const mysql = require("mysql2");
const { append } = require('express/lib/response');
const bodyParser = require("body-parser")
const app = express();
const router = express.Router();

const pool = mysql.createPool({
    connectionLimit:10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'techtrek24'
});

router.use(bodyParser.json())

/*get destinations
request: ItineraryID
response: destinationId, placename, cost, notes*/
router.get('/api/destination', (req, res) => {
    //console.log(req)
    const itineraryId = req.body.itineraryId; 
    console.log(itineraryId)
    if (!itineraryId) {
      res.status(400).json({ error: 'Missing itineraryId in the request' });
      return;
    }
  
    pool.query(
      'SELECT b.id, b.name, b.cost, b.notes, DATE_FORMAT(datetime, "%m/%d/%y %H:%i" datetime)  FROM itinerary_destination a JOIN destination b ON a.destination_id = b.id WHERE itinerary_id = ?',
      [itineraryId],
      (err, result) => {
        if (err) {
          console.error('Error querying database', err);
          res.status(500).json({ error: 'Failed to get data' });
          return;
        }
        res.json(result);
      }
    );
  });


  /*edit destinations
request: destinationId, name, cost, notes
response: destinationId, name, cost, notes*/
router.put('/api/destination', (req, res) => {
    const { destinationId, name, cost, notes, datetime } = req.body;
  
    if (!destinationId) {
      res.status(400).json({ error: 'Missing destinationId in the request' });
      return;
    } else if (!name || !cost) {
        res.status(400).json({ error: 'Place Name/Cost cannot be empty' });
      return;
    }

  
    pool.query(
      'UPDATE destination SET cost = ?, name = ?, notes = ?, datetime = STR_TO_DATE(?, "%m/%d/%y %H:%i") WHERE id = ?'
      [cost, name, notes,destinationId, datetime],
      (err, result) => {
        if (err) {
          console.error('Error updating database', err);
          res.status(500).json({ error: 'Failed to update destination' });
          return;
        }

        if (result.affectedRows > 0) {
        res.json({ success: true });
        } else {
        res.json({ success: false });
      }
      }
    );
  });

  /* Delete Destination */
  router.delete('/api/destination', (req, res) => {
    const destinationId = req.body.destinationId; 
    pool.query('DELETE FROM destination WHERE id = ?; DELETE FROM itinerary_destination WHERE destination_id = ?', 
    [destinationId, destinationId], (err, result) => {
        if (err) {
            console.error("Failed to delete destination", err);
            res.status(500).json({ error: "Failed to delete destination"});
            return;
        }
        res.status(200).json({ message: "Itinerary deleted successfully"});
    })
});

  /* Create Destination 
  request: itineraryId, name, cost, notes*/
  router.put('/api/destination', (req, res) => {
    const { itineraryId, name, cost, notes, datetime } = req.body;
    if (!itineraryId) {
        res.status(400).json({ error: 'Missing itineraryId in the request' });
        return;
      }
    
      pool.query(
        'INSERT INTO destination (country_id, cost, name, notes) SELECT country_id, ?, ?, ?, datetime = STR_TO_DATE(?, "%m/%d/%y %H:%i") FROM itinerary WHERE id = ?;' +
        'INSERT INTO itinerary_destination (destination_id, itinerary_id) SELECT MAX(id), ? FROM destination'
        [cost, name, notes, datetime, itineraryId, itineraryId],
        (err, result) => {
          if (err) {
            console.error('Error creating destination', err);
            res.status(500).json({ error: 'Failed to create new destination' });
            return;
          }
          res.status(200).json({ message: "destination created successfully"});

        }
      );

  });

app.use(router);

app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log("Listening on port 3000");
})