const { ObjectId } = require("mongodb");

const endpoint = '/notes'
const collectionName = 'notes'

module.exports = function(app, db){
  app.get(endpoint, async (req, res) => {
    const {id, title} = req.query;
    var query = {}
    if(id){
      try{
        query._id = new ObjectId(id);
      }
      catch(err){
        res.status(400).send("input must be a 24 character hex string, 12 byte Uint8Array, or an integer");
        console.log(err);
        return
      }
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
    if((id || title) && !notes[0]) res.status(400).send("Note not found");
    else res.status(200).send(notes);
  })

  app.post(endpoint, async (req, res) => {
    if(!req.body.body || !req.body.title){
      res.status(400).send("Body or title are missing");
      return;
    }
    const note = { text: req.body.body, title: req.body.title };
    
    db.collection(collectionName).insertOne(note)
      .then((result) => {
        console.log(result);
        res.status(200).send("ok");
      })
      .catch((err)=>{
        console.log(err);
        res.status(200).send("error");
      });
  })

  app.delete(endpoint, async (req, res) => {
    const {id, title} = req.query;
    if(!id && !title){
      res.status(400).send("Id or title are missing");
      return;
    }
    var query = {};
    if(id){
      try{
        query._id = new ObjectId(id);
      }
      catch(err){
        res.status(400).send("input must be a 24 character hex string, 12 byte Uint8Array, or an integer");
        console.log(err);
        return
      }
    }
    if(title){
      query.title = title;
    }
    db.collection(collectionName)
      .deleteOne(query)
        .then((result) => {
          console.log(result);
          if(result.deletedCount>0) res.status(200).send("ok");
          else res.status(400).send("Note not found");
        })
        .catch((err)=>{
          console.log(err);
          res.status(400).send("error");
        });
  })

  app.patch(endpoint, async (req, res) => {
    if(!req.body.body && !req.body.title){
      res.status(400).send("Body and title are missing");
      return;
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
      const document = notes[0];
      if (note.text) document.text = note.text;
      if (note.title) document.title = note.title;
      console.log(notes[0]);
      collection.replaceOne(query, document)
        .then((result) => {
          console.log(result);
          res.status(200).send("ok");
        })
        .catch((err)=>{
          console.log(err);
          res.status(400).send("error");
        });
    } else res.status(400).send("Note not found");
  })
}
