const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table');

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Redmaple33!",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;

    console.log("Connected: ", connection.threadId);
    initializeStore();
});

function initializeStore() {

    // Running this application will first display all of the items available for sale. 
    // Include the ids, names, and prices of products for sale.
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(results);
        // use trivia game for each loop through results array to build the table 

        customerPrompt();
    })
};


function TableBuilder(item_id, name, deptartment_name, price, quantity) {
    this.id = item_id,
        this.name = name,
        this.dept = deptartment_name,
        this.price = price,
        this.quant = quantity
};
let dog = new TableBuilder(11, "action figure", "toys", 20, 20);
console.log(dog);

function customerPrompt() {
    inquirer.prompt([{
        // everything will come back as a string, must parse for int or validate the input.
        // * The first should ask them the ID of the product they would like to buy.
        name: "customerSearch",
        type: "input",
        message: "What is the ID of the Item you would like to search for?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
        //   * The second message should ask how many units of the product they would like to buy.
    },
    {
        name: "searchValue",
        type: "input",
        message: "How many Units would you like to buy?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function (answers) {
        console.log(answers);
        // get id go to database. get stock number to see if there is enough.
        let id = parseInt(answers.customerSearch);
        let quantity = parseInt(answers.searchValue);
        connection.query(`SELECT * FROM products WHERE item_id = ${id}`, function (err, results) {
            // if (results === []) { // not working as expected.
            //     console.log("That is not a valid item ID");
            // }
            if (err) throw err;
            console.log("Results: ", results);
            let table = new Table({
                chars: {
                    'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                    , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                    , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                    , 'right': '║', 'right-mid': '╢', 'middle': '│'
                }
            });

            table.push(
                ['foo', 'bar', 'baz', 'blam', 'boom']
                , ['frob', 'bar', 'quuz', 'nom', 'bang']
            );

            console.log(table.toString());

            // validate if the stock is enough and respond acordingly with: order complete, not enough / want something else?
            // practice with ternary 
            //result = (condition) ? 'something' : 'somethingelse'; 
            results[0].quantity > quantity ? proccessOrder(id, quantity, results[0].quantity, results[0].price) : orderFail();
        });
    });
};


function proccessOrder(id, quantity, dbQuantity, dbPrice) {
    let newQuantity = dbQuantity - quantity;
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                quantity: newQuantity
            },
            {
                item_id: id
            }
        ],
        function (error) {
            if (error) throw err;
            console.log(`Order placed successfully!`);
            console.log('Total Price is: ', quantity * dbPrice);
            customerPrompt();
        }
    );
};

function orderFail() {
    console.log("Sorry but we don't have that many in stock.")
}






 // don't forget to close the connection.
// connection.end();
// process.exit();