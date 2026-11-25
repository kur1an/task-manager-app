const express = require("express");
const cors = require("cors");

const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser());


app.use(cors({
  credentials: true,
  origin: true,

}),

);

app.use(express.json());

app.use(express.urlencoded({ extended: true }))


app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running"

  });

});



const userRoutes = require("./routes/userRoute");
app.use("/api/v1/user", userRoutes);

const taskRoutes = require("./routes/taskRoute");
app.use("/api/v1/tasks", taskRoutes);




app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message

    })


})


module.exports = app;