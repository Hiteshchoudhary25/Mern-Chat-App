import mongoose from "mongoose";

// Connect to MongoDB
const connectToMongoose = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to MongoDB");
    }catch(error){
        console.error("Failed to connect to MongoDB", error.message);
    }
}

export default connectToMongoose;