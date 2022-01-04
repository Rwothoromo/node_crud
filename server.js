console.log('May Node be with you')

// Express is a framework for building web applications on top of Node.js.
// It simplifies the server creation process that is already available in Node.
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

require('dotenv').config();
const connectionString = "mongodb+srv://" + process.env.USER_NAME + ":" + process.env.USER_PASS + "@cluster0.ra6ne.mongodb.net/" + process.env.USER_DB + "?retryWrites=true&w=majority"
const app = express();

// Create a server that browsers can connect to. Use Express’s `listen` method.
app.listen(3000, function () {
    console.log('listening on 3000')
})


// MongoClient.connect(connectionString, (err, client) => {
//     if (err) return console.error(err)
//     console.log('Connected to Database')
// })

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')

        // to change the db, use this optio line of code
        const db = client.db('star-wars-quotes')

        // store the quotes into a `quotes` collection. We use db.collection to specify the collection.
        const quotesCollection = db.collection('quotes')

        // tell Express that we’re using EJS as the template engine.
        app.set('view engine', 'ejs')

        // Make sure you place body-parser before your CRUD handlers!
        // Express lets us use middleware with the `use` method.
        // The urlencoded method within body-parser tells it to extract data from the <form> element
        // and add this data to the body property in the request object.
        app.use(bodyParser.urlencoded({ extended: true }))

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

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(req.body)
                    console.log('Quote submitted successfully!')
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))
