// Import the MySQL connection object
var connection = require ('./connection.js');

// Helper function for generating MySQL syntax
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}

	return arr.toString();
}

function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
	}

	return arr.toString();
}

// Create the ORM object to perform SQL queries
var orm = {
	// shows all burgers in the database
	selectAll: function(tableInput, cb) {
		var queryString = "SELECT * FROM " + tableInput + ";";

		// Perform the database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	},

	// add a new buger
	insertOne: function(table, cols, vals, cb) {
		// Construct the query string that inserts a single row into the target table
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		// console.log(queryString);
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	},

	// updating burger devoured status to true
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		// console.log(queryString);
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
    },
    
    //deleting a burger from the database
    deleteOne: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        //console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err
            }
            cb(result);
        });
    }
};

// Export the orm object for use in other modules
module.exports = orm;