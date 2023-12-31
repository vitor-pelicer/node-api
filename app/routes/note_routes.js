const endpoint = '/notes'

module.exports = async function(app, db){
  app.get(endpoint, async (req, res) => {
    const cursor = db.collection('notes')
      .find()
    const notes = [];
    for await (const doc of cursor) {
      notes.push(doc);
    }
    res.status(200).send({data: notes})
  })


  app.post(endpoint, async (req, res) => {
    const note = { text: req.body.body, title: req.body.title }
    db.collection('notes').insertOne(note)
      .then((result) => {
        console.log(result);
        res.status(200).send("ok");
      })
      .catch((err)=>{
        console.log(err);
        res.status(200).send("erro");
      });
  })
}
