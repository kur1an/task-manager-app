const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    fullname: { type: String, minlength: [2, "user name should contian min 2 characters"], required: [true, "Please enter the full name "] },

    email: {
        type: String, unique: [true, "Email already exits"], required: [true, "Please enter the email"]
    },
    password: {
        type: String,
        minlength: [6, "password should contain 6 characters"],
        required: [true, "Pleaase enter the password"],
        select: false
    },

role:{
type:String,
enum:["admin","user"],
default:"user"
},

status:{
type:Boolean,
default:true
},



});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);

}


const User = mongoose.model("User", userSchema);

module.exports = User;