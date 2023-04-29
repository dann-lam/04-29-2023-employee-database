const mysql = require('mysql2')

const queryHandler = (option) => {
    console.log(`You choose ${option}`);
    return;
}


module.exports = { queryHandler }
