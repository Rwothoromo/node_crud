# Node CRUD

A simple CRUD API with Node based on this [blog](https://zellwk.com/blog/crud-express-mongodb/).

## Key frameworks and libraries

- Express - a framework for building web applications on top of Node.js. It simplifies the server creation process that is already available in Node. (`npm install express --save`).
- Nodemon - restarts the server automatically when you save a file that’s used by the server.js. (`npm install nodemon --save-dev`).
- Body-parser - a middleware for reading data from html `form` since Express doesn't read from `form` on its own. (`npm install body-parser --save`).
- MongoDB - a No-SQL database. (`npm install mongodb --save`).
- Embedded JavaScript (EJS) - a template engine that generates HTML. (`npm install ejs --save`).

## Set Up

- Run `touch .env` and set values:

```env
USER_NAME=username
USER_PASS=password
USER_DB=nodeCrudDB
```

- Run `npm run dev` or `node server.js`.
