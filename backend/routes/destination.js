var express = require('express');
const bodyParser = require("body-parser")
const router = express.Router();
const pool = require('../db')


// function checkExistAndInsert(table, column, check_value) {
//   try {
//       pool.execute(`SELECT * FROM ${table} WHERE ${column} = "${check_value}"`, (err, result) => {
//           if (!result) {
//               pool.execute(`INSERT INTO ${table} (${column}) VALUES (?)`, [check_value]);
//               console.log('Record inserted');                
//           } else {
//               console.log('Record already exists');
//           }
//       });
//   } catch (err) {
//       console.log('Checking Error:', err);
//   }
// }


router.use(bodyParser.json())

/*get destinations
request: ItineraryID
response: destinationId, placename, cost, notes*/
router.get('/', (req, res) => {
    const itineraryId = req.body.itineraryId; 
    if (!itineraryId) {
      res.status(400).json({ error: 'Missing itineraryId in the request' });    
    }
    
    pool.query(
      'SELECT b.id destinationId, b.name, b.cost, b.notes, DATE_FORMAT(datetime, "%m/%d/%y %H:%i") datetime  FROM itinerary_destination a JOIN destination b ON a.destination_id = b.id WHERE itinerary_id = ?',
      [itineraryId],
      (err, result) => {
        if (err) {
          console.error('Error querying database', err);
          res.status(500).json({ error: 'Failed to get data' });
        
        }
        res.json(result);
      }
    );
  });


  /*edit destinations
request: destinationId, name, cost, notes
response: destinationId, name, cost, notes*/
router.put('/', (req, res) => {
    const { destinationId, name, cost, notes, datetime } = req.body;
  
    if (!destinationId) {
      res.status(400).json({ error: 'Missing destinationId in the request' });
      return;
    } else if (!name || !cost) {
        res.status(400).json({ error: 'Place Name/Cost cannot be empty' });
      return;
    }

  
    pool.query(
      'UPDATE destination SET cost = ?, name = ?, notes = ?, datetime = STR_TO_DATE(?, "%m/%d/%y %H:%i") WHERE id = ?',
      [cost, name, notes, datetime, destinationId],
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
  router.delete('/', (req, res) => {
    const destinationId = req.body.destinationId; 
    pool.query('DELETE FROM destination WHERE id = ?', 
    [destinationId], (err, result) => {
        if (err) {
            console.error("Failed to delete destination", err);
            res.status(500).json({ error: "Failed to delete destination"});
            return;
        }
        // res.status(200).json({ message: "Itinerary deleted successfully"});
    })
    pool.query('DELETE FROM itinerary_destination WHERE destination_id = ?', 
    [destinationId], (err, result) => {
        if (err) {
            console.error("Failed to delete itinerary_destination", err);
            res.status(500).json({ error: "Failed to delete itinerary_destination"});
            return;
        }
        res.status(200).json({ message: "Itinerary deleted successfully"});
    })
});

  /* Create Destination 
  request: itineraryId, name, cost, notes*/
  router.post('/', (req, res) => {
    const { itineraryId, name, cost, notes, datetime } = req.body;
    if (!itineraryId) {
        res.status(400).json({ error: 'Missing itineraryId in the request' });
        return;
      } else if (!name || !cost) {
        res.status(400).json({ error: 'Place name and cost cannot be empty' })
      }
      // checkExistAndInsert('country', 'name', req.body.country_name)
      pool.query('select country_id from itinerary where id = ?', [itineraryId], (err, result) => {
          // console.log(result)
          const country_id = result[0].country_id;

          pool.query("INSERT into destination (country_id, cost, name, notes, datetime) VALUES (?,?,?,?,STR_TO_DATE(?, '%m/%d/%y %H:%i'))",
           [country_id, cost, name, notes, datetime],(err, result) => {
                if (err) {
                  console.error('Error creating destination', err);
                  res.status(500).json({ error: 'Failed to create new destination' });
                  return;
                }})
          pool.query("INSERT INTO itinerary_destination (destination_id, itinerary_id) SELECT MAX(id), ? FROM destination",
                [itineraryId],(err, result) => {
                     if (err) {
                       console.error('Error creating destination', err);
                       res.status(500).json({ error: 'Failed to create new destination' });
                       return;
                     }
                     res.status(202).json({ message: "Add itinerary successfully"});        
                    })
            
        })
    });
    
      // pool.query(
      //   'INSERT INTO destination (country_id, cost, name, notes) SELECT country_id, ?, ?, ?, STR_TO_DATE(?, "%m/%d/%y %H:%i") FROM itinerary WHERE id = ?;' +
      //   'INSERT INTO itinerary_destination (destination_id, itinerary_id) SELECT MAX(id), ? FROM destination',
      //   [cost, name, notes, datetime, itineraryId, itineraryId],
      //   (err, result) => {
      //     if (err) {
      //       console.error('Error creating destination', err);
      //       res.status(500).json({ error: 'Failed to create new destination' });
      //       return;
      //     }
      //     res.status(200).json({ message: "destination created successfully"});

      //   }
      // );

  // });

// app.use(router);

// app.listen(3000, (err) => {
//     if (err) console.log(err);
//     console.log("Listening on port 3000");
// })

module.exports = router;
