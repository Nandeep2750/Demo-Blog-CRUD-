var express = require('express');
var router = express.Router();

const status = require('../config/statuscode').status;

var adminApiRouter = require("./admin-api");

module.exports = app => {
    app.use("/admin_api", adminApiRouter);

    /*
    * NO URL FOUND
    */
    app.get('*', function (req, res) {
        return res.json({
            status: status.not_found_code,
            message: "Sorry, this is an invalid Api",
            success: false,
        });
    });

    app.post('*', function (req, res) {
        return res.json({
            status: status.not_found_code,
            message: "Sorry, this is an invalid Api",
            success: false,
        });
    });
  
    app.put('*', function (req, res) {
        return res.json({
            status: status.not_found_code,
            message: "Sorry, this is an invalid Api",
            success: false,
        });
    });

}



