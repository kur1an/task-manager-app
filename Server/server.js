require("dotenv").config();

const app = require("./app");

const db=require("./config/db");
db();

app.listen(process.env.PORT, ()=>{
console.log(`server is running ${process.env.PORT}`);



});