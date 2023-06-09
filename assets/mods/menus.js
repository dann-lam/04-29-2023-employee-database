// GIVEN a command-line application that accepts user input
const inquirer = require('inquirer');
const { queryHandler } = require("./queryhandler")


    //An array of questions, easier to handle it this way instead of shoving it straight into the prompt.
    const questions = [
        {
            type: "list",
            name: 'mainMenu',
            message: 'Choose an Option',
            choices:
                [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add a Department',
                    'Add a Role',
                    'Add An Employee',
                    'Update an Employee',
                    '<-- EXIT & CLOSE CONNECTION -->'
                ]
        },
    ];


// GIVEN a command-line application that accepts user input
const CLI = () => {
    let enterLoop = true;
    // THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    let assigned;
    inquirer.prompt(questions)
    .then( answers => {
        //queryHandler is being imported, our answer is saved in answers.mainMenu
       assigned = answers.mainMenu;
       queryHandler(assigned);

    })
    .catch(error => {
        console.log(error);
    })
    console.log("hitme");


}

module.exports = { CLI, };
