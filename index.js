const database = require('./src/data_service')
const express = require('express')

const app = express() 

app.use(express.static('public'));
app.use(express.json()) 

app.get('/', (req, res) => {
    res.sendFile('public\\home.html', {root: __dirname})
})

app.get('/getTasks', (req, res) => {
    database.getTasks((data) => {
        res.json(data)
    })
})

app.post('/addTask', (req, res) => {
    console.log(req.body)
    database.addTask(req.body ,(data) => {
        console.log(data)
        res.send("OK")
    })
})
 
app.post('/changeTask', (req, res) => {
    console.log(req.body)
    database.changeTask(req.body ,(data) => {
        console.log(data)
        res.send("OK")
    })
})

app.post('/deleteTask', (req, res) => {
    console.log(req.body)
    database.deleteTask(req.body ,(data) => {
        console.log(data)
        res.send("OK")
    })
})

app.listen(3000)