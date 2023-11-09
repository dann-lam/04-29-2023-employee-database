# SQL Employee Content Management Database

## Technology Used

| Technology Used         | Resource URL           |
| ------------- |:-------------:|
| Git | [https://git-scm.com/](https://git-scm.com/)     |
| JS  | [https://www.javascript.com/](https://www.javascript.com/)     |
| Node  | [https://nodejs.org/en](https://nodejs.org/en)     |
| MySQL  | [https://www.mysql.com/](https://www.mysql.com/)     |
| Inquirer  | [https://www.npmjs.com/package/inquirer](https://www.npmjs.com/package/inquirer)     |


## Description

[Visit the Deployed Site](https://dann-lam.github.io/04-29-2023-employee-database/)

This is a CLI app that allows users to read and write departments, roles, and employee information to a SQL database.

Users can add additional departments, roles, and employees, as well as update existing employees.

It's still quite early and not 100% fully fleshed out, later features will be more complete allowing users to delete users or departments or anything else.


## Table of Contents


* [Usage](#usage)
* [Learning Points](#learning-points)
* [Credits](#credits)
* [License](#license)


## Usage

To use this, start by cloning it and installing node.

After installing node, you'll have to run the Mysql schemas located in assets/db
Once complete, run node server.js

https://github.com/dann-lam/04-29-2023-employee-database/assets/15963035/bff200eb-9c89-4f3c-9360-806e87784901



Here is a quick demo of the application, a longer version can be found here


https://github.com/dann-lam/04-29-2023-employee-database/assets/15963035/15e09239-f1f2-4109-a2ad-cc41b67c479a





## Learning Points

Wow, what a fun challenge!
There are still a lot of uncompleted aspects of this project that I don't feel are super properly addressed, however the core functionality of the app is working.

Personally, understanding how mysql2 works and some of the smaller nuances of how to insert values into searches was slightly frustrating.

The SQL statements themselves are the next runner up, with some strange chaining occurring.

Thirdly, the way we're chaining queries with inquirer is quite messy, I'm sure there is a better way of doing it.

Overrall, a great exercise in patience and learning, definitely the hardest one I've encountered so far.

There are still a lot of features that should be included. The top priority would be having the menu loop over once a selection has been chosen. It was not included because of some bugs that were pretty challenging to discover, definitely something to come back upon once time is available. Theoretically it should be an extremely simple fix, but alas.
The code isn't quite dry enough, it could certainly be way more optimized and have the same functionality.


## Credits

Thanks, Bed.


## License

MIT License
