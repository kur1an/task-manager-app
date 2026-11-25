const express = require("express");
const { createUser, userLogin, userLogout } = require("../Controllers/userController");
const { userAuthenticate } = require("../middlewares/auth");

const router = express.Router()

router.route("/signup").post(createUser);
router.route("/login").post(userLogin);

router.route("/logout").post(userAuthenticate,userLogout);

module.exports = router;