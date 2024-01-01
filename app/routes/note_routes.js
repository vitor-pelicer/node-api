const { ObjectId } = require("mongodb");

const endpoint = '/notes'
const collection = 'notes'

module.exports = function(app, db){
  app.get(endpoint, async (req, res) => {
    const {id, title} = req.query;
    var query = {}
    if(id){
        query._id = new ObjectId(id);
    }
    if(title){
      query.title = title;
    }
    const cursor = db.collection(collection)
      .find(query);
    const notes = [];
    for await (const doc of cursor) {
      notes.push(doc);
    }
    res.status(200).send(notes)
  })

  app.post(endpoint, async (req, res) => {
    const note = { text: req.body.body, title: req.body.title }
    db.collection(collection).insertOne(note)
      .then((result) => {
        console.log(result);
        res.status(200).send("ok");
      })
      .catch((err)=>{
        console.log(err);
        res.status(200).send("erro");
      });
  })

  app.delete(endpoint, async (req, res) => {
    const {id, title} = req.query;
    var query = {}
    if(id){
        query._id = new ObjectId(id);
    }
    if(title){
      query.title = title;
    }
    db.collection(collection)
      .deleteOne(query)
        .then((result) => {
          console.log(result);
          res.status(200).send("ok");
        })
        .catch((err)=>{
          console.log(err);
          res.status(400).send("erro");
        });
  })
}
