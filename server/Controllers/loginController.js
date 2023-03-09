

const getUsers = async (req,res,next)=> {
    try{
        const loginUsers= await Login.find({}).select("-password")
        return res.json(loginUsers)
    } catch(err){
        next(err)
    }
}

const registerUser = async (req,res,next)=>{
    try{
        const {name, email, password} = req.body
        if(!(name && email && password)){
            return res.status(400).send("All inputs are required")
        }

        if(userExists){
            return res.status(400).json({error: "user exists"})
        }else{
            const user = await Login.create({
                name,email : email.toLowerCase(),
                password: password
            });
            res.status(201).send(login)
        }

    }catch(err){
        next(err)
    }
}
module.exports= {getUsers,registerUser}

