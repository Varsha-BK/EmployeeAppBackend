var Mongoose = require("mongoose");

const employeeSchema = Mongoose.Schema({
    name: String,
    location: String,
    position: String,
    salary: Number
});

var EmployeeModel = Mongoose.model("Employees",employeeSchema);
module.exports= {EmployeeModel};
