const mongoose = require("mongoose")

require("dotenv").config()

const ConnDB = async () => {
    try{
         const connect = await mongoose.connect( process.env.MONGOURL)
         console.log("Database is successfully connected")
        
    } catch {

        console.log ("Database is not successfully connected ")
    }
}
module.exports = ConnDB;