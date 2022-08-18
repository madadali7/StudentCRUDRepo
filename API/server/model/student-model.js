const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

var studentSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: {type: String, select: false},
    address: String,
    city: String,
    class: String,
    phoneNumber: String,
    createdDate: Date,
    updatedDate: Date,
    isVisiable: Boolean
});

studentSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const studentModel = mongoose.model('Student Collection',studentSchema);

module.exports = studentModel;