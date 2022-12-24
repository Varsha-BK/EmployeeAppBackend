// Task1: initiate app and run server at 3000

const express = require("express");
const fs = require("fs");
const Bodyparser = require("body-parser");
const Mongoose = require("mongoose");
const Cors = require("cors");
const { EmployeeModel } = require("./model/employee");

var app = new express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended :false}));

app.use(Cors());


const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 

Mongoose.set("strictQuery",true);
Mongoose.connect("mongodb+srv://varsha:varsha95@cluster0.etbicey.mongodb.net/EmployeeDB?retryWrites=true&w=majority",
{ useNewURlParser: true });


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below



//TODO: get data from db  using api '/api/employeelist'

app.get("/api/employeelist",(req,res)=>{
    EmployeeModel.find(
        (err,data)=>{
            if(err){
                res.json({"Status":"Error","Error":err})
            }
            else{
                res.json(data);
            }
        }
    );
});


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get("/api/employeelist/:id",(req,res)=>{
    var id = req.params.id;
    EmployeeModel.findById({_id: id},function(err,data){
        if(err) res.json(err);
        else{
            res.json(data);
        }
    })

});



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist",async(req,res)=>{
    var data = req.body;
    var employee = new EmployeeModel(data);
    await employee.save(
        (err,data)=>{
            if(err){
                res.json({"Status":"Error","Error":err})
            }
            else{
                res.json(data)
            }
        }
    );
});



//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete("/api/employeelist/:id",(req,res)=>{
    var id = req.body.id;    
    var data = req.body;
    EmployeeModel.findOneAndDelete(
        {"id": id},data,(err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json({"Status":"Success","Data":data});
            }
        }
    )
});



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put("/api/employeelist",(req,res)=>{
    var id = req.body._id;    
    var data = req.body;
    EmployeeModel.findByIdAndUpdate(
        {_id: id},data,(err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json({"Status":"Success","Data":data});
            }
        }
    )
});



//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000);


