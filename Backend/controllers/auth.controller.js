import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export const signup = async(req,res)=>{
    try{
        const {fullName , userName , password , confirmPassword , gender}  = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error: "Password don't Match"});
        }
        const user = await User.findOne({userName});

        if(user){
            return res.status(400).json({error:"User Already Exits !!"});
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        //Hashed password generation
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //User creating and saving in DB
        const newUser = new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic: gender === "male"? boyProfilePic : girlProfilePic
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id , res);
            await newUser.save(); 
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic
        });
        }else{
            res.status(400).json({error: "Failed to Create User"})
        }
    }catch(error){
        console.log("error in signup controller" , error.message);
        res.status(500).json({error: "Server Error"})
    }
    
}
export  const login = async(req,res)=>{
    try{
        const {userName, password } = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password , user?.password || "");

        if(!user ||!isPasswordCorrect){
            return res.status(401).json({error: "Invalid Credentials"})
        }

        generateTokenAndSetCookie(user._id, res);
        res.json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        });

    }catch(error){
        console.log("error in login controller" , error.message);
        res.status(500).json({error: "Server Error"});
    }
};

export const logout = async(req,res)=>{
    try{
        res.clearCookie("jwt");
        res.status(200).json({message: "Logged Out Successfully"})
    }catch(error){
        console.log("error in logout controller" , error.message);
        res.status(500).json({error: "Server Error"});
    }
    
}