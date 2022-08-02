const UserModel = require('../model/user-model')


exports.userCreate = (req,res)=>{
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" })
        return
    }

    //new User
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in the database
    user.save(user).then(data => {
        res.send(data);
       
    })
        .catch(err => {
            res.send(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}