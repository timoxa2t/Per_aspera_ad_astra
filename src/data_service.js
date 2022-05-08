import digitalOceanConfig from '../config/digital_ocean_config.json'

const { Pool} = require('pg')

const pool = new Pool(digitalOceanConfig)

const getTasks = () => { 
    const tasksRef = ref(database, 'tasks');
    onValue(tasksRef, (snapshot) => {
        console.log(snapshot.val());
      
    });
}

export {getTasks}