const mysql = require('mysql2');
const inquirer = require('inquirer');


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
    //Yeah, yeah, I know. the password is shown. not good.
    //it's temporary, mmmkaaay??
);
//Question set for specific inquirer prompts.
//Move these into their own file in future.
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


//Modular function designed to handle simple view functions.
const viewQuery = (sql) => {

        return db.query(sql, function (err, results) {
        if (results) {
            console.table(results)
            //Ends the connection.
            db.end();

        } else if (err) {
            console.log(err)
        }
    })

}

//Modular function designed to handle adding of objects with a prompt.
const addQuery = (sql, type) => {
    //Determine what questions is being asked based on SQL input.
    let questions;
    let option;
    //The way I'm handling our type selection is suboptimal RN.
    //I could use it to directly influence our "option" which we chose, could DRY up the code here.
    if(type == "department"){
        questions = departmentQuestions;
        //I set the option here so once we've added our new content we can immediately re-draw the relevent content.
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
            //encase output like E.G. : [[blah,blah,blah]] for this to work for a mysterious reason :)


         db.query(sql, [output], function (err, results) {
            if (results) {
                console.log(`Returned: ${sql}`);
                //redraws our final output.
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

//Function designed to handle updating.
//It is not modular, but can be setup to be.

const updateQuery = (sql) => {

    let employeeList;
    let roleList;

//First query will get a list of Employees, saves it to a variable.
//Second query does the same with a list of roles.
//Point is to get a list of IDs of names and Roles to be available for selection with the Inquirer CLI prompt.

        db.query("SELECT * FROM employee", function (err, results) {
        if (results) {
            //Store our results from query to employeeList
           employeeList = results;
           //Store our results from query to roleList.
           db.query("SELECT * FROM role", function (err, results) {
            if (results) {
               roleList = results;


               //Initialize empty arrays for our inquirer prompt questions.
               let employeeListArr = [];
               let roleListArr = [];


                //Goes through the employee list, grabs details, pushes it into an array as a string.

               for(let i = 0; i < employeeList.length; i++){

                let employeeListStr=(`ID - ${employeeList[i].id} - ${ employeeList[i].first_name} - ${employeeList[i].last_name }`)

                employeeListArr.push(employeeListStr)
               }
               //Goes through the RoleList object, grabs the details, pushes it into an array as a string.
               for(let i = 0; i < roleList.length; i++){

                let roleListStr=(`ID - ${roleList[i].id} - ${ roleList[i].title} - ${roleList[i].salary }`)

                roleListArr.push(roleListStr)
               }

            //Promp user with our freshly minted choices list.
               inquirer.prompt(
                [
                    {
                        type: "list",
                        name: "chooseEmployee",
                        message: 'Choose your Employee',
                        choices: employeeListArr
                    },
                    {
                        type: "list",
                        name: "chooseRole",
                        message: 'Choose your Role to Change',
                        choices: roleListArr
                    },
                ]
             )
             .then (answer => {

                //Get the ID from our Strings
                //(E.G. "ID - 3 - Moe - Wogan") simply becomes "3".)
                let empID = answer.chooseEmployee.split(" - ")[1];
                let roleID = answer.chooseRole.split(" - ")[1];

                //DB QUERY to change our Employee based on ID to role based on ID.

                //SQL = 'UPDATE employee SET role_id = ? WHERE employee.id = ?'
                db.query(sql, [roleID,empID], function (err, results) {
                    if (results) {
                        console.table(results);
                        console.log("Results updated!!");
                        //Show us the employee table.
                        viewQuery('SELECT * FROM employee')

                    } else if (err) {
                        console.log(err)
                    }
                })
             })

            } else if (err) {
                console.log(err)
            }
        })

        } else if (err) {
            console.log(err)
        }
    })

}


//sets our query to the appropriate query, then hands it off to another
//appropriate function that is handling either views, inserts, updates or deletes.

const queryHandler = (option) => {

    // db.connect();
    let query;
    console.log(`You choose ${option}`);

    if (option == 'View All Departments') {
        query = 'SELECT * FROM department';
        viewQuery(query);

    // WHEN I choose to view all roles
    } else if (option =='View All Roles' ) {
        query = 'SELECT * FROM role LEFT JOIN department on department_id = department.id'
        viewQuery(query);



    } else if (option == 'View All Employees') {
        //These are UTTERLY illegible. I'm sorry.
        query = "SELECT employee.first_name, employee.last_name, role.title ,role.salary, department.name as department_name,  manager.first_name AS manager_first_name FROM employee JOIN role ON role.id = employee.role_id LEFT JOIN employee manager ON employee.manager_id = manager.id LEFT JOIN department ON role.department_id = department.id"
        viewQuery(query);


    } else if (option == 'Add a Department') {
        query = 'INSERT INTO department (name) VALUES(?)';
        type = "department";
        addQuery(query, type);


    } else if (option == 'Add a Role') {
        query = 'INSERT INTO role (title, salary, department_id) VALUES(?)'
        type = "role";

        addQuery(query, type);

    }

    else if (option == 'Add An Employee') {
        query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?)'
        type = "employee";

        addQuery(query, type);
    }

    else if (option == 'Update an Employee') {
        query = 'UPDATE employee SET role_id = ? WHERE employee.id = ?'
        updateQuery(query);


    } else if (option == '<-- EXIT & CLOSE CONNECTION -->') {
        db.end()
        return db.close();
    }

    //Once we're done with our table stuff, we leave.
    //TODO: This *SHOULD* start another menu prompt, but that's not playing nice.
    return;
}

module.exports = { queryHandler,};
