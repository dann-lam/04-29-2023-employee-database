// GIVEN a command-line application that accepts user input
// const express = require('express');
// const inquirer = require('inquirer');
// const mysql = require('mysql2');
// const app = express();
const { CLI } = require('./assets/mods/menus')


// WHEN I start the application
const init = () => {
    // THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    CLI();

}




init();
