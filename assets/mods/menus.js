// GIVEN a command-line application that accepts user input
const inquirer = require('inquirer');
// const { queryHandler } = require("./queryhandler")


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
                    'Exit'
                ]
        },
    ];



    // console.log("Hi~!");
    // inquirer.prompt(questions, function( answers) {})
    // .then(answers => {
    //     //queryHandler is being imported, our answer is saved in answers.mainMenu
    //     console.log(answers.mainMenu);
    //     // queryHandler(answers.mainMenu);
    // })
    // .catch(error => {
    //     console.log(error);
    // })


// GIVEN a command-line application that accepts user input
const CLI = () => {
    // THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

    inquirer
    .prompt({
      type: 'input',
      name: 'name',
      message: 'What is your name?',
    })
    .then((answers) => {
      console.log(`Hello, ${answers.name}!`);
    })
    .catch((error) => {
      console.log(`An error occurred: ${error}`);
    });
};

//Export this so we can use it on the
module.exports = {
CLI,
};
