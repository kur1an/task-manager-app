const { generateToken } = require("../middlewares/auth");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;


        if (!fullname || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please fil all the fields",
            });
        }
        const user = await User.create(req.body)
        const newUser = user.toObject();
        delete newUser.password;

        res.status(201).json({
            sucess: true,
            message: "User added successfully",
            user: newUser,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,

        });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({

                success: false,
                message: "Please enter the email and password"

            });

        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"

            });

        }
   const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

    }


    if (!user.status) {
      return res.status(401).json({
        success: false,
        message: "User is inactive"

      });

    }

        const token = await generateToken(user._id, user.role);

        const newUser = user.toObject();

        delete newUser.password;

        res.status(200).cookie("token", token, {

            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }).json({
            success: true,
            message: "User Logged Successfully",
            user: newUser,

        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,

        });
    }


};

exports.userLogout = (req, res) => {
  res.status(200).clearCookie("token").json({
    success: true,
    message: "User logout successfully"

  })
}