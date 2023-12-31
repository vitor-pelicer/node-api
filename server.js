const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dbConfig = require('./config/db');

const app = express();

const port = 8000;

app.use( bodyParser.urlencoded({ extended: true }))
const routes = require('./app/routes')

MongoClient.connect( dbConfig.url)
.then((client) => {
  console.log('Conectado ao mongo');
  const db = client.db(dbConfig.databaseName);
  routes(app, db);
})
.catch((err) => console.log("erro ao conectar ao mongo", err));

app.listen(port, ()=>{
  console.log("Servidor ativo");
})
