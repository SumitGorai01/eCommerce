/**
 * This will be the starting file of the project
 */

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt =require("bcryptjs")

/**
 * to convert json object in js object
 */
app.use(express.json())



/**
 * Connection with database
*/
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.once("open",()=>{
    console.log("Connected to the MongoDB")

    init()
})

db.on("error",()=>{
    console.log("Error while connecting to the MongoDB")
   
})

/**
 * Create a admin user at the startnig of the application if not already present
 */

async function init(){
    try{
        let user  = await user_model.findOne({userId : "admin"})

       if(user){
        // user_model.deleteMany();
          console.log("Admin is already present")
          return
        }

    }catch(error){
        console.log("Error while reading the data", error)
    }
    
    try {
        user =await user_model.create({
            name : "Sumit",
            userId : "admin",
            email : "sumit@gmail.com",
            userType : "ADMIN",
            password :bcrypt.hashSync("welcome1",8)
        })
        console.log("Admin Created",user)
        
    } catch (error) {
        console.log("Error while creating admin",error)
    }
}

/**
 * Stich the route to the server
 */

require("./routes/auth.route")(app)

/**
 * Strat the server
 */
app.listen(server_config.PORT,()=>{
    console.log("Server Started at port number : ",server_config.PORT)
})