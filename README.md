# Node CRUD

A simple CRUD API with Node based on this [blog](https://zellwk.com/blog/crud-express-mongodb/).

## Key frameworks and libraries

- [Node.js and npm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04).
- Express - a framework for building web applications on top of Node.js. It simplifies the server creation process that is already available in Node. (`npm install express --save`).
- Nodemon - restarts the server automatically when you save a file that’s used by the server.js. (`npm install nodemon --save-dev`).
- Body-parser - a middleware for reading data from html `form` since Express doesn't read from `form` on its own. (`npm install body-parser --save`).
- MongoDB - a No-SQL database. (`npm install mongodb --save`). Also, set up [MongoDB account](mongodb.com) and be sure to add your IP via the `Network Access` section. See [1](https://www.whatismyip.com/), [2](https://whatismyipaddress.com/) and [3](https://nordvpn.com/what-is-my-ip/).
- Embedded JavaScript (EJS) - a template engine that generates HTML. (`npm install ejs --save`).
- Docker - put the node web app into a docker container like [this](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/).
- [Morgan](https://www.npmjs.com/package/morgan) - logger middleware.

## Set Up

- Run `touch .env` and set values:

```env
USER_NAME=username
USER_PASS=password
USER_DB=nodeCrudDB
USER_PORT=8080
USER_HOST=0.0.0.0
NODE_ENV=dev
```

- Run `node server.js`. For port 3000, run `./node_modules/.bin/nodemon server.js` or `npm run dev`.

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

## Tests

- Run `docker run <username>/node_crud npm test`. Alternative is `npm test`.
- Info based on [1](https://blog.logrocket.com/unit-and-integration-testing-for-node-js-apps/) and [2](https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai).
- [Mocha](https://mochajs.org/#getting-started) - a test runner that enables you to exercise your Node.js code. It follows the basic [Jasmine](https://jasmine.github.io/2.0/introduction.html) syntax. (`npm install mocha`). Then run `npm test`.
- [Chai](https://www.chaijs.com/) - offers an assertion library for Node.js. (`npm install chai`).
- [Chai-http](https://www.chaijs.com/plugins/chai-http/) - a plugin that offers a full-fledged test runner that will actually run your application and test its endpoints directly. (`npm install chai-http`).
