const { query } = require("express");
const studentModel = require("../model/student-model");
const bycrypt = require('bcrypt');

//Create API
//Api for creating student detail.
exports.studentCreate = (req, res) => {
    console.log(req.body.class);
    //validate request
    if (!req.body.name) {
        res.status(400).send()
        return
    }
    
    //new User
    const student = new studentModel({
        name: req.body.name,
        class: req.body.class,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        createdDate: req.body.createdDate,
        updatedDate: req.body.updatedDate,
        isVisiable: req.body.isVisiable
    })

    //save user in the database
    student.save(student).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.send(500).send();
        });
}

exports.getStudent = (req,res)=>{
    const result = [];
    studentModel.find().then(data=>{
        data.forEach(element => {
            if(element.isVisiable){
                result.push(element);
            }
        });
        res.send(result)
    })
    .catch(err=>{
        res.send(err)
    })
}

exports.updateStudent = (req,res)=>{
    const id = req.params.id;
    studentModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data=>{
        res.status(200).send(data);
    })
    .catch(err=>{
        res.status(500)
    })
}

exports.deleteStudent = (req,res)=>{
    const id = req.params.id;
    // studentModel.findByIdAndDelete(id)
    // .then(data=>{
    //     res.status(200).send(data);
    // })
    // .catch(()=>{
    //     res.status(500);
    // })

    studentModel.findByIdAndUpdate(id,req.body, { useFindAndModify: false })
    .then(data=>{
        res.status(200).send(data);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
}