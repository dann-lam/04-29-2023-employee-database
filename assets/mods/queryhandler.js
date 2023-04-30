const mysql = require('mysql2');

const inquirer = require('inquirer');
// var { CLI } = require('./menus')
var CLI = require('./menus')

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);



// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
const updateEmployeeRole = () => {

}

// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const addEmployee = () => {

}

// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const addRole = () => {

}

// THEN I am prompted to enter the name of the department and that department is added to the database
const addDepartment = () => {

}

// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to


// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role



//Modular function designed to handle simple view functions.
const viewQuery = (sql) => {
    //Gives us a promise

        db.query(sql, function (err, results) {
        if (results) {
            console.table(results)
            console.log(`Returned: ${sql}`);

        } else if (err) {
            console.log(err)
        }
    })



}

//sets our query to the appropriate query, then hands it off to another
//appropriate function that is handling either views, inserts, updates or deletes.

const queryHandler = (option) => {
    db.connect();
    let query;
    console.log(`You choose ${option}`);
    // WHEN I choose to view all departments
    if (option == 'View All Departments') {
        query = 'SELECT * FROM department';
        viewQuery(query);

    // WHEN I choose to view all roles
    } else if (option =='View All Roles' ) {
        query = 'SELECT * FROM role'
        viewQuery(query);
    // WHEN I choose to view all employees
    } else if (option == 'View All Employees') {
        query = 'SELECT * FROM employee'
        viewQuery(query);
    // WHEN I choose to add a department
    } else if (option == 'Add a Department') {
        query = ''
        addQuery();

    // WHEN I choose to add a role
    } else if (option == 'Add a Role') {
        query = ''
        addQuery();
    }
    // WHEN I choose to add an employee
    else if (option == 'Add An Employee') {
        query = ''
        addQuery();
    }
    // WHEN I choose to update an employee role
    else if (option == 'Update an Employee') {
        query = ''
    } else if (option == '<-- EXIT & CLOSE CONNECTION -->') {
        return db.end();
    }
    //Once we're done with our table stuff, we leave.
    //TODO: This *SHOULD* start another menu prompt, but that's not playing nice.

    return db.end();

}

module.exports = { queryHandler,};
