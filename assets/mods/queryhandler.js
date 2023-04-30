const mysql = require('mysql2');

const inquirer = require('inquirer');

// var { CLI } = require('./menus')
//For some forsaken reason I do not understand, I cannot for the life of me
//Summon the CLI.


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

const departmentQuestions = [
    {
        type: "input",
        name: "departmentName",
        message: "Insert a new department."
    },
];
const roleQuestions = [
    {
        type: "input",
        name: "roleName",
        message: "Insert a role name."
    },
    {
        type: "number",
        name: "roleSalary",
        message: "Insert a salary."
    },
    {
        type: "number",
        name: "roleDepartment",
        message: "Insert a department. (ID)"
    },
];
const employeeQuestions = [
    {
        type: "input",
        name: "employeeFirstName",
        message: "Insert a First Name."
    },
    {
        type: "input",
        name: "employeeLastName",
        message: "Insert a Last Name."
    },
    {
        type: "number",
        name: "employeeRole",
        message: "Insert a Employee Role. (ID)"
    },
    {
        type: "number",
        name: "employeeManager",
        message: "Insert a Manager. (ID)"
    },
];

const updateQuery = (sql) => {

}

const addQuery = (sql, type) => {
        //Determine what questions is being asked based on SQL input.
        let questions;
        let option;
        if(type == "department"){
            questions = departmentQuestions;
            option = 'SELECT * FROM department'
        } else if (type == "role"){
            questions = roleQuestions;
            option = 'SELECT * FROM role'
        } else if (type == "employee"){
            questions = employeeQuestions;
            option = 'SELECT * FROM employee'
        }
        var output;
        //Inquirer Prompt for input, feed into our addQuery.
        //Switch for our question being asked based on type for inquirer question.
        inquirer.prompt(questions)
        .then (answers =>
            {

            //Get the answers object,
            //Extract the values from the object, assign it to output.
            output = (Object.values(answers));

                //output is already an array with 3 items in it.
                //If I don't encase output like [[blah,blah,blah]] IT HATES IT
                //UGH. WHy??

             db.query(sql, [output], function (err, results) {
                if (results) {
                    console.log(`Returned: ${sql}`);
                    viewQuery(option)
                } else if (err) {
                    console.log(sql)
                    console.log(err)
                }
            })

            }
        )
        .catch(error => {
            console.log(error);
        });


};



//Modular function designed to handle simple view functions.
const viewQuery = (sql) => {
    //Gives us a promise

        return db.query(sql, function (err, results) {
        if (results) {
            console.table(results)
            console.log(`Returned: ${sql}`);

        } else if (err) {
            console.log(err)
        }
        db.end();
    })

}

//sets our query to the appropriate query, then hands it off to another
//appropriate function that is handling either views, inserts, updates or deletes.

const queryHandler = (option) => {

    // db.connect();
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

    // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

    // WHEN I choose to view all employees
    } else if (option == 'View All Employees') {
        query = 'SELECT * FROM employee'
        viewQuery(query);
        // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

    // WHEN I choose to add a department
    } else if (option == 'Add a Department') {
        query = 'INSERT INTO department (name) VALUES(?)';
        type = "department";
        addQuery(query, type);
    // THEN I am prompted to enter the name of the department and that department is added to the database

    // WHEN I choose to add a role
    } else if (option == 'Add a Role') {
        query = 'INSERT INTO role (title, salary, department_id) VALUES(?)'
        type = "role";

        addQuery(query, type);
    // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

    }
    // WHEN I choose to add an employee
    else if (option == 'Add An Employee') {
        query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?)'
        type = "employee";

        addQuery(query, type);
        // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    }
    // WHEN I choose to update an employee role
    else if (option == 'Update an Employee') {
        query = ''
        updateQuery();
        // THEN I am prompted to select an employee to update and their new role and this information is updated in the database

    } else if (option == '<-- EXIT & CLOSE CONNECTION -->') {
        db.end()
        return db.close();
    }
    //Once we're done with our table stuff, we leave.
    //TODO: This *SHOULD* start another menu prompt, but that's not playing nice.

}

module.exports = { queryHandler,};
