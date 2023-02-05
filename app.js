const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const session = require("express-session");
const companyRouter = require("./routes/companyRouter");
const employeeRouter = require("./routes/employeeRouter");

const app = express();

app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: false }))
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./assets"))
app.use(companyRouter)
app.use(employeeRouter)

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connecté au server");
    }
})
mongoose.set('strictQuery', false)
mongoose.connect(process.env.BDD_URL, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connecté a la base");
    }
})




