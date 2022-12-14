const { query } = require("express");
const studentModel = require("../model/student-model");
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//Create API
//Api for creating student detail.
exports.studentCreate = async (req, res) => {
    //validate request
    if (!req.body.name) {
        res.status(400).send()
        return
    }
    console.log(req.body);

    //new User
    const student = new studentModel({
        name: req.body.name,
        class: req.body?.class,
        phoneNumber: req.body.phoneNumber,
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
        student.save(student).then(async data  => {
            const saved_user = await studentModel.findOne({email:email});
            //Generate JWT Token
            const token = jwt.sign({userId: saved_user._id},process.env.JWT_SECRET_KEY, {expiresIn: '60m'});
            res.send({data,'token': token});

        }).catch(err => {
            res.status(500).send(err);
        });
    }

}

exports.loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email && password) {
            const user = await studentModel.findOne({ email: email }).select('+password');
            const token = jwt.sign({userId: user?._id},process.env.JWT_SECRET_KEY, {expiresIn: '60m'});
            if (user != null) {
                const isMatch = await bycrypt.compare(password, user.password);
                if ((user.email === email) && isMatch && (user.isVisiable)) {
                    const userDetails = await studentModel.findOne({ email: email });
                    res.status(200).send({userDetails,'token': token})
                } else {
                    res.status(201).send({message:"Password is wrong"});
                }
            } else {
                res.status(201).send({message:"Email is wrong"});
            }
        } else {
            res.status(500);
        }
    } catch (error) {
        console.log(error);
    }
}

exports.confirmEmail = async (req,res) =>{
    const {email} = req.body;

    const user = await studentModel.findOne({email:email});
    const token = jwt.sign({userId: user?._id},process.env.JWT_SECRET_KEY, {expiresIn: '60m'});
    if(user){
        res.status(200).send({user, 'token':token});
    }else{
        res.status(201).send({message:'Email doesnt Existed'})
    }
}

exports.resetPassword = async (req,res) =>{
    const requestId = req.params.id;
    const {newPassword, confirmPassword} = req.body;
    if(!req.body){
        res.send(400)
    }else{
        if(newPassword === confirmPassword){
           const user = await studentModel.findOne({_id: requestId}).select('+password');
           const newHashPassword = await bycrypt.hash(newPassword,10);
           const isMatch = await bycrypt.compare(newPassword, user.password);
           if(!isMatch){
               const updatedUser= await studentModel.findByIdAndUpdate(user._id,{$set:{password:newHashPassword}});
               updatedUser.depopulate('password');
               res.status(200).send(updatedUser);
           }else{
            res.status(201).send({message: 'This Password is already used'})
           }
        }else{
            res.status(201).send({message:'Password and Confirm Password is not match'})
        }
    }


}


exports.getStudent = (req, res) => {
    const result = [];
    var mysort = { createdDate: -1 };
    studentModel.find().sort(mysort).
        then(data => {
            data.forEach(element => {
                if (element.isVisiable) {
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