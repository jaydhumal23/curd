const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Mongoose connected")
}).catch((err) => {
    console.log("Bhai nai hua connect bete")

})
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    imgurl: { type: String, required: true }
});

const Users = mongoose.model("User", userSchema);
module.exports = Users;