// Express is a framework for building web applications on top of Node.js.
// It simplifies the server creation process that is already available in Node.
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const morgan = require('morgan');

require('dotenv').config();
if (process.env.NODE_ENV == 'test') {
    process.env.USER_DB = 'nodeCrudDBTest';
}
const connectionString = "mongodb+srv://" + process.env.USER_NAME + ":" + process.env.USER_PASS + "@cluster0.ra6ne.mongodb.net/" + process.env.USER_DB + "?retryWrites=true&w=majority"
const app = express();

// Create a server that browsers can connect to. Use Express’s `listen` method.
const PORT = process.env.USER_PORT || 3000;
const HOST = process.env.USER_HOST || '0.0.0.0';
app.listen(PORT, HOST, function () {
    console.log('listening on http://' + HOST + ':' + PORT)
})

// According to https://mongodb.github.io/node-mongodb-native/3.3/reference/unified-topology/, useUnifiedTopology to:
// - fully support the drivers Server Discovery and Monitoring, Server Selection and Max Staleness specifications
// - reduce the maintenance burden of supporting the topology layer in the driver by modeling all supported topology types with a single engine
// - remove confusing functionality which could be potentially dangerous for our users
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')

        // to change the db, use this optio line of code
        const db = client.db('star-wars-quotes')

        // store the quotes into a `quotes` collection. We use db.collection to specify the collection.
        const quotesCollection = db.collection('quotes')

        // tell Express that we’re using EJS as the template engine.
        app.set('view engine', 'ejs')

        // don't show the log when it is test
        if (process.env.NODE_ENV !== 'test') {
            // use morgan to log at command line
            app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
        }

        // Make sure you place body-parser before your CRUD handlers!
        // Express lets us use middleware with the `use` method.
        // The urlencoded method within body-parser tells it to extract data from the <form> element
        // and add this data to the body property in the request object.
        app.use(bodyParser.urlencoded({ extended: true }))

        // tell Express to make this `public` folder accessible to the public by using a built-in middleware called `express.static`
        app.use(express.static('public'))

        // teach the server to accept/read JSON data by adding the body-parser’s json middleware.
        app.use(bodyParser.json())

        // (endpoint, callback function(req - request, res - response))
        app.get('/', (req, res) => {
            // res.send('Hello World')

            const cursor = db.collection('quotes').find()
            // a promise is returned
            cursor.toArray()
                .then(results => {
                    // to render html, use:
                    // res.render(view, locals)
                    // view must be placed inside a views folder.
                    // locals is the data passed into the file.
                    res.render('index.ejs', { quotes: results })
                })
                .catch(error => console.error(error))

            // res.sendFile(__dirname + '/index.html')
            // Note: __dirname is the current directory you're in. Try logging it and see what you get!
            // Mine was '/home/xxx/Desktop/code/backend/node_crud' for this app.
        })

        app.get('/quotes', (req, res) => {
            const cursor = db.collection('quotes').find()
            cursor.toArray()
                .then(results => {
                    return res.json(results)
                })
                .catch(error => console.error(error))
        })

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log('Quote submitted successfully!')
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        // to find and change one item in the database, run
        // quotesCollection.findOneAndUpdate(query, update, options)
        // query lets us filter the collection with key-value pairs. To filter quotes to those written by Yoda, set { name: 'Yoda' } as the query.
        // update tells MongoDB what to change, using MongoDB’s update operators like $set, $inc and $push.
        // options tells MongoDB to define additional options for this update request.
        // it’s possible that no Yoda quotes exist in the database. We can force MongoDB to create a new quote by setting `upsert` to true.
        // upsert means: Insert a document if no documents can be updated.
        app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                { name: 'Yoda' },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result => {
                    res.json('Success')
                })
                .catch(error => console.error(error))
        })

        app.delete('/quotes/one', (req, res) => {
            quotesCollection.deleteOne(
                // we already pass the name `Darth Vadar` via fetch in main.js
                { name: req.body.name }
            )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json({ "message": "No quote to delete'" })
                    }
                    res.json({ "message": "Deleted Darth Vadar's quote" })
                })
                .catch(error => console.error(error))
        })

        app.delete('/quotes', (req, res) => {
            quotesCollection.deleteMany(
                {} // delete all
            )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json({ "message": "No quote to delete" })
                    }
                    res.json()
                })
                .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))

module.exports = app
