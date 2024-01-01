const { ObjectId } = require("mongodb");

const endpoint = '/notes'
const collectionName = 'notes'

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
    const cursor = db.collection(collectionName)
      .find(query);
    const notes = [];
    for await (const doc of cursor) {
      notes.push(doc);
    }
    res.status(200).send(notes)
  })

  app.post(endpoint, async (req, res) => {
    const note = { text: req.body.body, title: req.body.title }
    db.collection(collectionName).insertOne(note)
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
    db.collection(collectionName)
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

  app.patch(endpoint, async (req, res) => {
    if(!req.body.body && !req.body.title){
      res.status(400).send("Body and title is missing");
    }
    const note = { text: req.body.body, title: req.body.title }
    const {id, title} = req.query;
    var query = {}
    if(id){
        query._id = new ObjectId(id);
    }
    if(title){
      query.title = title;
    }
    const collection = db.collection(collectionName);
    var cursor = collection.find(query);
    const notes = [];
    for await (const doc of cursor) {
      notes.push(doc);
    }
    if(notes[0]){
      const document = notes[0]
      if (note.text) document.text = note.text;
      if (note.title) document.title = note.title
      console.log(notes[0]);
      collection.replaceOne(query, document)
        .then((result) => {
          console.log(result);
          res.status(200).send("ok");
        })
        .catch((err)=>{
          console.log(err);
          res.status(400).send("erro");
        });
    } else res.status(400).send("Não encontrado");
  })
}
