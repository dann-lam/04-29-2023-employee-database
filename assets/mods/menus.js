// GIVEN a command-line application that accepts user input
const inquirer = require('inquirer');
const { queryHandler } = require("./queryhandler")

let questions = [
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
                'Update an Employee'
            ]
    },
]
const CLI = () => {

    return inquirer.prompt(questions)
    .then(answers => {
        queryHandler(answers.mainMenu);
    })
    .catch(error => {
        console.log(error);
    });

}


module.exports = {
CLI,
};
