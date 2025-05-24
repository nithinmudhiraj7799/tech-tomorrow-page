const mongoose = require("mongoose")

const Database = async ()=>{
    mongoose.connect("mongodb+srv://nithin:NUD86cESbahBt8cr@cluster0.ix4d965.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Database Success")
    }).catch((error) => {
        console.log("Database Failed", error)
    })
}

module.exports = Database