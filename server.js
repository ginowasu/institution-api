const express = require('express');
var cors = require('cors')
const app = express()
const institution = require('./institution.json')
const framework = require('./framework.json')
const morgan = require('morgan')
const createError = require('http-errors')
// const bodyParser = require('body-parser')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, PATCH, DELETE'); // If needed
//     res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type,Option, Authorization, X-Session-Id");
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// });

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/institution', (req, res) => {
    res.json(institution)
})

app.get('/institution/:id', (req, res) => {
    res.json(institution.find(institution => institution.id === req.params.id))
})

app.post('/institution', (req, res) => {
    // console.log(req);
    institution.push(req.body)
    res.status(201).json(req.body)
})

app.put('/institution/:id', (req, res) => {
    const updateIndex = institution.findIndex(institution => institution.id === req.params.id)
    res.json(Object.assign(institution[updateIndex], req.body))
})

app.delete('/institution/:id', (req, res) => {
    const deleteIndex = institution.findIndex(institution => institution.id === req.params.id)
    institution.splice(deleteIndex, 1)
    res.status(204).send('delete complete')
})

app.get('/framework', (req, res) => {
    res.json(framework)
})

app.get('/framework/:id', (req, res) => {
    res.json(framework.find(framework => framework.id === req.params.id))
})

app.post('/framework', (req, res) => {
    // console.log(req);
    framework.push(req.body)
    res.status(201).json(req.body)
})

app.put('/framework/:id', (req, res) => {
    const updateIndex = framework.findIndex(framework => framework.id === req.params.id)
    res.json(Object.assign(framework[updateIndex], req.body))
})

app.delete('/framework/:id', (req, res) => {
    const deleteIndex = framework.findIndex(framework => framework.id === req.params.id)
    framework.splice(deleteIndex, 1)
    res.status(204).send('delete complete')
})

app.use(async (req, res, next) => {
    next(createError.NotFound())
})


app.listen(4200, () => {
    console.log('Start server at port 4200.')
})