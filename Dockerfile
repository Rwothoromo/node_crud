# Image to build from - latest LTS (long term support) version 16 of node available from the Docker Hub.
# It comes with Node.js and NPM already installed
FROM node:16

# Create the working app directory to hold the application code inside the image
WORKDIR /usr/src/app

# Install your app dependencies using the npm binary
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# For npm version 4 or earlier, a package-lock.json file will not be generated.
# Rather than copy the entire working directory, we are only copying the package.json file.
# This allows us to take advantage of cached Docker layers.
# (See http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/).
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# The npm ci command helps provide faster, reliable, reproducible builds for production environments.

# Bundle your app's source code inside the Docker image
COPY . .

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon:
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime e.g. `node server.js`
# CMD [ "node", "server.js" ]
CMD [ "npm", "run", "dev" ]