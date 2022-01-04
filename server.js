console.log('May Node be with you')

// Express is a framework for building web applications on top of Node.js.
// It simplifies the server creation process that is already available in Node.
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Create a server that browsers can connect to. Use Express’s `listen` method.
app.listen(3000, function () {
    console.log('listening on 3000')
})

// Make sure you place body-parser before your CRUD handlers!
// Express lets us use middleware with the `use` method.
// The urlencoded method within body-parser tells it to extract data from the <form> element
// and add this data to the body property in the request object.
app.use(bodyParser.urlencoded({ extended: true }))

// (endpoint, callback function(req - request, res - response))
app.get('/', (req, res) => {
    // res.send('Hello World')
    res.sendFile(__dirname + '/index.html')
    // Note: __dirname is the current directory you're in. Try logging it and see what you get!
    // Mine was '/home/xxx/Desktop/code/backend/node_crud' for this app.
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
    console.log('Quote submitted successfully!')
})
