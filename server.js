const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./Routes/route");
app.use(express.json());
app.use("/",routes);
//Db connection
mongoose.connect("mongodb+srv://akshithrai2k3:Akshith007@cluster0.xrdc1zn.mongodb.net/")
.then(()=>{
    console.log("DB Connected");
})
.catch((err) => {
    console.log(err, "Something went wrong");

});



app.get("/test", (req, res)=>{
    res.send("Test Api")
})

app.listen(4000, ()=>{
    console.log("server is connected");

});
