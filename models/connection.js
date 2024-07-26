const mongoose = require("mongoose");

mongoose.connect(``)
.then(res => console.log("DB connected")).catch(err => console.log(err));

module.exports = mongoose; 