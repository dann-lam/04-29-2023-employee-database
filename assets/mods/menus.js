// GIVEN a command-line application that accepts user input
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const app = express();

let questions = [
    {
        type: 'list',
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
        console.log(`You choose ${answers.mainMenu}`);
    })
    .catch(error => {
        console.log(error);
    });

}





// const CLI = () => {
//     inquirer.prompt(questions).then((output) => {
//         console.log(output.mainMenu);
//     })
//     .catch((error)=> {
//         if (error) {
//             console.log(error)
//             throw new Error ("Ohhh nooo");
//         }
//     })
// };

module.exports = {
CLI,
};
