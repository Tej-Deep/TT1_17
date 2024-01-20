var express = require('express');
var router_getdestination = express.Router();
var router_editdestination = express.Router();

/*get destinations
request: ItineraryID
response: placename, cost, notes*/
router_getdestination.get('/api/get_destination', (req, res) => {
    const itineraryId = req.query.itineraryId; 
  
    if (!itineraryId) {
      res.status(400).json({ error: 'Missing itineraryId in the request' });
      return;
    }
  
    pool.query(
      'SELECT b.name, b.cost, b.notes FROM ItineraryDestination a JOIN Destination b ON a.destination_id = b.id WHERE itinerary_id = ?',
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
request: destinationId, placeName, cost, notes
response: name, cost, notes*/
router_editdestination.get('/api/edit_destination', (req, res) => {
    const destinationId = req.query.destinationId; 
  
    if (!destinationId) {
      res.status(400).json({ error: 'Missing itineraryId in the request' });
      return;
    } else if (!placeName) {
        res.status(500).json({ error: 'Missing destination name' });
        return;
    }
  
    pool.query(
      'SELECT b.name, b.cost, b.notes FROM ItineraryDestination a JOIN Destination b ON a.destination_id = b.id WHERE itinerary_id = ?',
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


