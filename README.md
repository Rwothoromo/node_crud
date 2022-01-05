# Node CRUD

A simple CRUD API with Node based on this [blog](https://zellwk.com/blog/crud-express-mongodb/).

## Key frameworks and libraries

- Express - a framework for building web applications on top of Node.js. It simplifies the server creation process that is already available in Node. (`npm install express --save`).
- Nodemon - restarts the server automatically when you save a file that’s used by the server.js. (`npm install nodemon --save-dev`).
- Body-parser - a middleware for reading data from html `form` since Express doesn't read from `form` on its own. (`npm install body-parser --save`).
- MongoDB - a No-SQL database. (`npm install mongodb --save`). Also, set up [MongoDB account](mongodb.com) and be sure to add your IP via the `Network Access` section. See [1](https://www.whatismyip.com/), [2](https://whatismyipaddress.com/) and [3](https://nordvpn.com/what-is-my-ip/).
- Embedded JavaScript (EJS) - a template engine that generates HTML. (`npm install ejs --save`).
- Docker - put the node web app into a docker container like [this](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/).

## Set Up

- Run `touch .env` and set values:

```env
USER_NAME=username
USER_PASS=password
USER_DB=nodeCrudDB
USER_PORT=8080
USER_HOST=0.0.0.0
```

- Run `npm run dev` or `node server.js`.

## The Docker Way

- The [.dockerignore](.dockerignore) file prevents your local modules and debug logs from being copied onto your Docker image and possibly overwriting modules installed within your image.
- Run `docker build . -t <username>/node_crud` to build the Docker image. The `-t` flag lets you tag your image so it's easier to find later using the `docker images` command.
- Run `docker run -p 49160:8080 -d <username>/node_crud` to run the image.
  - `-d` runs the container in detached mode, leaving the container running in the background.
  - `-p` flag redirects a public port to a private port inside the container,
- Run `docker ps` to see you container ID.
- Run `docker logs <container-id>` to get app output.
- Run `docker container ls` to know the current container.
- Run `docker stop <container-id>` to stop the container.
- Run `docker exec -it <container-id> /bin/bash` if you want to go inside the container.
- Run `curl -i localhost:49160` to call the app.
