const digitalOceanConfig = require('../config/digital_ocean_config.json')

const { Client} = require('pg')
const res = require('express/lib/response')

const client = new Client(digitalOceanConfig)
client.connect()


module.exports.getTasks = (callback) => { 
    client.query(
        'SELECT id, text, creation_date, completed FROM Tasks', 
        (err, sqlres) => {
            if(err) console.log(err) 
            callback(sqlres.rows)
    })

}
