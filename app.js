const Model = require("./model/model.js")
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT;
dotenv.config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/home", (req, res) => {
    res.render("index");

})
app.get("/read", async (req, res) => {

    try {

        const users = await Model.find();
        res.render("read", { allUsers: users })

    }
    catch (err) {
        console.log("Buddy error is here qt " + err)
    }
})

app.post("/create", async (req, res) => {
    try {
        await Model.create({
            name: req.body.name,
            email: req.body.email,
            imgurl: req.body.imgurl,
        })
        res.redirect("/read");

    } catch (err) {
        res.send("err baby at create " + err);
    }

})
app.get("/edit/:id", async (req, res) => {
    try {
        const user = await Model.findOne({ _id: req.params.id });
        res.render("edit", { user })
    }
    catch (err) {
        console.log("laga error edit get pe" + err)
    }
})
app.post("/update/:id", async (req, res) => {
    const { name, email, imgurl } = req.body;
    try {
        await Model.findOneAndUpdate({ _id: req.params.id }, { name, email, imgurl }, { new: true });
        res.redirect("/read");
    }
    catch (err) {
        console.log("nahi hua post update buddy " + err);
    }
})


app.get("/delete/:id", async (req, res) => {
    try {
        await Model.findOneAndDelete({ _id: req.params.id });
        res.redirect("/read");
    }
    catch (err) {
        console.log("err laga delete pe buddy" + err);
    }
})
app.listen(PORT, () => {
    console.log("Your server is live at port : " + PORT);
});