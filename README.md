# Node API with Express and MongoDB

This is a Node.js API project using Express to create, retrieve, update, and delete notes in a MongoDB database.

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine. Additionally, you need to have a configured MongoDB database.

## Cloning the Project

```
git clone https://github.com/vitor-pelicer/node-api.git
cd node-api
```

## Installing Dependencies

```
npm install
```

## Database Configuration

Make sure to have a MongoDB server running. Configure the connection information in the `config/db.js` file.

```
// config/db.js

module.exports = {
  url: process.env.MONGO_URL,
  databaseName: process.env.DATABASE,
};
```

Remember to create environment variables with the URL and the database name. You can do this before running the server.

## Running the Server

To start the server on port 8000, use the following command:

```
node server
```

The server will be running at [http://localhost:8000](http://localhost:8000).

## API Routes

### GET /notes

Returns all notes stored in the database.

### POST /notes

Adds a new note to the database. Make sure to include the `body` and `title` parameters in the request body.

### PATCH /notes/id={id}&title={title}

Updates a specific note identified by its ID. Include the `body` or `title` parameter in the request body to modify the corresponding fields.

### DELETE /notes/id={id}&title={title}

Deletes a specific note identified by its ID or title.


This is a simple but functional project to help you get started with creating a Node.js API with Express and MongoDB for managing notes. Feel free to expand and customize as needed to meet the specific requirements of your application.
