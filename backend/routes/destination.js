var express = require('express');
var router_getdestination = express.Router();
var router_editdestination = express.Router();

/*get destinations
request: ItineraryID
response: destinationId, placename, cost, notes*/
router_getdestination.get('/api/get_destination', (req, res) => {
    const itineraryId = req.query.itineraryId; 
  
    if (!itineraryId) {
      res.status(400).json({ error: 'Missing itineraryId in the request' });
      return;
    }
  
    pool.query(
      'SELECT b.id, b.name, b.cost, b.notes FROM itinerary_destination a JOIN destination b ON a.destination_id = b.id WHERE itinerary_id = ?',
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
router_editdestination.put('/api/edit_destination', (req, res) => {
    const { destinationId, name, cost, notes } = req.body;
  
    if (!destinationId) {
      res.status(400).json({ error: 'Missing destinationId in the request' });
      return;
    } 

  
    pool.query(
      'UPDATE destination SET cost = ?, name = ?, notes = ? WHERE id = ?'
      [cost], [name],[notes], [destinationId]

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


