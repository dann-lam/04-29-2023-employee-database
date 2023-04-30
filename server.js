const inquirer = require('inquirer');
// const { CLI } = require('./assets/mods/menus')
// var figlet = require("figlet");

// figlet("Employee Tracker CMS", function (err, data) {
//     if (err) {
//       console.log("Something went wrong...");
//       console.dir(err);
//       return;
//     }
//     console.log(data);
//   });

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

  CLI();
// WHEN I start the application
// const init = () => {


//     CLI();

// }




// init();
