const mongoose = require("mongoose");

module.exports = mongoose.model("Rol_Log", new mongoose.Schema({
    user: String, 
    roller: Array
}));