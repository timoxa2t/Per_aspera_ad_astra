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

            if(sqlres && sqlres.hasOwnProperty("rows")){
                callback(sqlres.rows)
            } else {
                callback([])
            }
            
    })

}

module.exports.addTask = (task, callback) => {
    const values = [task.text, task.creation_date]
    client.query(
        'INSERT INTO Tasks(text, creation_date) VALUES ($1, $2)', 
        values, 
        (err, res) => {
            if(err){
                console.log(err)
                callback(err)
            }else{
                callback(res)
            }
        }
    )
}

module.exports.changeTask = (task, callback) => {
    const values = [task.id, task.text, task.completed]
    client.query(
        'UPDATE Tasks SET text = $2, completed = $3 WHERE id = $1', 
        values, 
        (err, res) => {
            if(err){
                console.log(err)
                callback(err)
            }else{
                callback(res)
            }
        }
    )
}

module.exports.deleteTask = (task, callback) => {
    const values = [task.id]
    client.query(
        'DELETE FROM Tasks WHERE id = $1', 
        values, 
        (err, res) => {
            if(err){
                console.log(err)
                callback(err)
            }else{
                callback(res)
            }
        }
    )
}