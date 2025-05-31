const express = require("express")
const cors = require('cors');
const mongoose = require("mongoose")
const ConnDB = require("./config/dbconfig")
const router = require("./routes/userRoute")
// dot evnfile
require('dotenv').config()
const app = express()

// middleware use
app.use(cors());
app.use(express.json());
// connect database
 ConnDB();
app.use("/api",router)
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

    console.log(`server is running on ${PORT}`)
})