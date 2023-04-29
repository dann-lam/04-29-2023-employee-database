const mysql = require('mysql2');
const inquirer = require('inquirer');

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
const viewEmployees = () => {

}

// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewRoles = () => {

}

// THEN I am presented with a formatted table showing department names and department ids
const viewDepartments = () => {

}


const queryHandler = (option) => {

    console.log(`You choose ${option}`);

    // WHEN I choose to view all departments
    if (option == 'View All Departments') {
        viewDepartments();

    // WHEN I choose to view all roles
    } else if (option =='View All Roles' ) {
        viewRoles();

    // WHEN I choose to view all employees
    } else if (option == 'View All Employees') {
        viewEmployees();

    // WHEN I choose to add a department
    } else if (option == 'Add a Department') {
        addDepartment();

    // WHEN I choose to add a role
    } else if (option == 'Add a Role') {
        addRole();

    }
    // WHEN I choose to add an employee
    else if (option == 'Add An Employee') {
        addEmployee();

    }
    // WHEN I choose to update an employee role
    else if (option == 'Update an Employee') {
        updateEmployeeRole();

    }else {
        return console.log("I don't know how you did this, but congratulations.");
    }

}

module.exports = { queryHandler,};
