var orm = require("../config/orm.js");
var burger = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },

    //adding new burgers to the database
    insertOne: function(cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function(res) {
            cb(res);
        });
    },

    //updating devoured status to true
    updateOne: function(objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    },

    //removing a burger from the database
    deleteOne: function(condition, cb) {
        orm.deleteOne("burgers", condition, function(res) {
            cb(res);
        });
    }
};

module.exports = burger;