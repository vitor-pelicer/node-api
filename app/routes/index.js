const notesRoute = require('./note_routes');

module.exports = function(app, db){
  notesRoute(app, db)
  app.use((req, res) => {
    res.status(404).send('Rota não encontrada');
  })
}