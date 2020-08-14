import React from 'react'

function Home() {
  return (
    <div className="container col-md-10 my-2 ">
      <h1 className="text-center">
        Welcome to My Bookshop !
      </h1>

      <div className="row mt-2">
        <div className="col-md-3 col-lg border-blue">
          <h3>React APP</h3>
          <ul>
            <li>This React uses Hooks and runs on Port 3000</li>
            <li>Please make sure to change ther Server API URL from here</li><b>app > public > config.js </b>
            <li>When you start the Node REST API, bydefault it will run on</li> <b>http://localhost:4000/api</b>
            <li>
              Here are some features of this app
               <ul>
                <li>Books and Authors List</li>
                <li>List with Pagination, Search and Filter</li>
                <li>Edit button against each row</li>
                <li>Add and Edit Forms</li>
                <li>REST API Notification by Tostr notification</li>
              </ul>
            </li>
            <li> <b>Author Router </b>
              <ul>
                <li> <b> /authors</b> => List View of the Authors</li>
                <li> <b>/authors/add</b> => Form to add a new Author</li>
                <li> <b>authors/edit/:id</b> => Form to edit a Author</li>
              </ul>
            </li>
            <li> <b>Book Router</b>
              <ul>
                <li> <b> /books</b> => List View of the Books</li>
                <li> <b>/books/add</b> => Form to add a new Book</li>
                <li> <b>/books/edit/:id</b> => Form to edit a Book</li>
              </ul>
            </li>
            <li> <b> /</b> => Home Page</li>
            <li> <b> /404</b> or any route that is not registered => Page not found</li>
          </ul>


        </div>
        <div className="col-md-6 col-lg">
          <h3>Node Rest API</h3>
          <ul>
            <li>This Node App uses TypeScript, Express and Mongo DB and runs on Port 4000</li>
            <li>Please make sure to change the MongoDB connection settings from here e</li><b>app > .env </b>
            <li>App built using Separation of Concerns principals</li>
            <li>I have added the <b> /api </b> from suggested API endpoints to make it more conventional</li>
            <li>
              Here are some features of this app
               <ul>
                <li>Docker Compose to run MongoDB Server </li>
                <li>TypeScript for types protection</li>
                <li>Proper Classes, Interfaces and DTOs</li>
                <li>Error and DTO Validation Middlewares</li>
                <li>Protection against HTTP Parameter Pollution attacks</li>
                <li>Securing app by adding additional HTTP headers</li>
              </ul>
            </li>
            <li> <b>Author API Endpoints</b>
              <ul>
                <li> <b>GET /api/authors</b> => To get all the authors in DB</li>
                <li> <b>GET /api/author/lookup</b> => To get all the authors Lookup, to be shown in Book's Add/Edit Form</li>
                <li> <b>GET /api/author/:id</b> => To get a author by Id from DB</li>
                <li> <b>POST /api/author</b> => To create a author in DB</li>
                <li> <b>PUT /api/author</b> => To update a author in DB</li>
              </ul>
            </li>
            <li> <b>Book API Endpoints</b>
              <ul>
                <li> <b>GET /api/books</b> => To get all the books in DB</li>
                <li> <b>GET /api/book/:id</b> => To get a book by Id from DB</li>
                <li> <b>POST /api/book</b> => To create a book in DB</li>
                <li> <b>PUT /api/book</b> => To update a book in DB</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
