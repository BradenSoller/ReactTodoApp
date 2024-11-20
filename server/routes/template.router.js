const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const getTodoList = `SELECT * FROM "todos"`
  pool.query(getTodoList)
  .then(result => {
    console.log("results.rows", result.rows);
    res.send(result.rows);
   
  })
  .catch((err) => {
    console.log("ERROR: Get all appointments", err);
    res.sendStatus(500);
  });

})

router.post('/', (req, res) => {
  const query = `
  INSERT INTO "todos" ("text")
    VALUES ($1);
  `
  const values = [
    req.body.text
  ]

  console.log("dssdcsdc")
  pool
    .query(query, values)
    .then(result => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.error('POST route failed:', err)
      res.sendStatus(500)
    })
   
});


router.put('/:id', (req, res) => {

const sqlText = `
UPDATE "todos"
 SET "isComplete" = NOT "isComplete"
 WHERE "id" = ${req.params.id};
  `

pool.query(sqlText)
.then((dbResult) =>{
    res.sendStatus(200);
})
.catch((dbError)=>{
    console.log('PUT /status:id failed', dbError)
    res.sendStatus(500);
})
});

module.exports = router;
