import path from 'path';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import usersRoutes from "./routes/user.routes.js";


import connectToMongoose from "./db/connectToMongoose.js";
import {app, server} from "./socket/socket.js"

dotenv.config(); 


const PORT = process.env.PORT || 5000;
const __dirname =  path.resolve();



app.use(express.json()); 
app.use(cookieParser()); 

app.use("/api/auth" , authRoutes);
app.use("/api/message" , messageRoutes);
app.use("/api/users" , usersRoutes);

app.use(express.static(path.join(__dirname,"/Frontend/dist")));

app.get("*" ,(req,res) =>{
  res.sendFile(path.join(__dirname,"Frontend" ,"dist" , "index.html"));
})

// app.get("/", (req, res) => {
//   res.send("Hello, World! hitesh");
// });


server.listen(PORT ,() => {
  connectToMongoose();
  console.log(`Server is running on port ${PORT}`)
});