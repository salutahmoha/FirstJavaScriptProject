const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

const PORT = 5500;

const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();


// Enable CORS
app.use(cors());

app.post("/signup", async(req, res) =>{
    const {firstname, lastname, email, password} = req.body;

    try{
        const user = await prisma.user.create({
            data:{
                firstname,
                lastname,
                email,
                password
            }
        })
        res.status(201).json({message: "User created successfuly", user})
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})

// login route
app.post("/login", async(req, res)=>{
    const {email, password} = req.body;
    
    try{
        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        if(user.password !== password){
            return res.status(401).json({message: "password incorrect"})
        }
        res.status(200).json({Message: "login successful", user})
    }catch(error){
        console.error('Sign In Error', error)
        res.status(500).json({message: "something went wrong", error:error.message})
    }
})