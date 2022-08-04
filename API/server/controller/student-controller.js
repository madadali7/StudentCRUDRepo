const { query } = require("express");
const studentModel = require("../model/student-model");
const bycrypt = require('bcrypt');

//Create API
//Api for creating student detail.
exports.studentCreate = async (req, res) => {
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
        createdDate: new Date(),
        updatedDate: req.body.updatedDate,
        isVisiable: true
    })

    const { email } = req.body;

    const user = await studentModel.findOne({ email: email });
    //save user in the database
    if (user) {
        res.status(201).send({message:"The Email Already Existed"});
    } else {
        student.save(student).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

}

exports.loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email && password) {
            const user = await studentModel.findOne({ email: email });
            if (user != null) {
                const isMatch = await bycrypt.compare(password, user.password);
                if ((user.email === email) && isMatch) {
                    res.status(200).send(user)
                } else {
                    res.status(201).send({message:"Password is wrong"});
                }
            } else {
                res.status(500);
            }
        } else {
            res.status(500);
        }
    } catch (error) {
        console.log(error);
    }
}

exports.getStudent = (req, res) => {
    const result = [];
    var mysort = { createdDate: -1 };
    studentModel.find().sort(mysort).
        then(data => {
            data.forEach(element => {
                if (element.isVisiable) {
                    element.password = null;
                    result.push(element);
                }
            });
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })
}

exports.updateStudent = (req, res) => {
    const id = req.params.id;
    studentModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500)
        })
}

exports.deleteStudent = async (req, res) => {
    const id = req.params.id;
    //For Remove Permently
    // studentModel.findByIdAndDelete(id)
    // .then(data=>{
    //     res.status(200).send(data);
    // })
    // .catch(()=>{
    //     res.status(500);
    // })

    await studentModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
}