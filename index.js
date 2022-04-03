const express = require('express')


const app = express() 

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('home.html', {root: __dirname})
})

app.listen(3000)