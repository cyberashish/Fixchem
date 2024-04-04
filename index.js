const express = require("express");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const productRouter = require("./routes/product.js")
const cors = require("cors");
const userRouter = require("./routes/contact.js");

const server = express();

// database connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected")
};



// Middleware
server.use(cors());
server.use(express.static(path.join(__dirname,process.env.PUBLIC_DIR)));
server.use("/uploads",express.static(path.join(__dirname,"uploads")));
server.use(express.json());
server.use("/products",productRouter.router);
server.use("/contacts",userRouter.router);





server.listen(process.env.PORT,()=>{
    console.log(`server started at ${process.env.PORT}`);
})