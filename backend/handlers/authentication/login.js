const User = require("../user/user-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userLoginSchema } = require("../user/userValidation");

module.exports=app=>{
    app.post('/users/login',async(req,res)=>{

        const {email,password}=req.body;

        const { error, value } = userLoginSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ error: error.details.map(detail => detail.message) });
          }

        try{
            const user=await User.findOne({email});

            if(!user){
                return res.status(401).send('Email or password is incorrect.');
            }
    
            const passwordMatch=await bcrypt.compare(password, user.password);
  
            if(!passwordMatch){
                return res.status(401).send('Email or password is incorrect.');
            }

            const currentUser = await User.findOne({ email }).select('-password -createdTime -email');

            const token = jwt.sign({ 
                userId: user._id,  
                isAdmin: user.role, //remove later?
                currentUser,
              },
                process.env.JWT_SECRET, { expiresIn: '4h' });
    
                res.status(200).json({
                  token,
                  user:currentUser
                })
                
        }catch(error){
            res.status(500).send({ error: 'Error creating user' });
        }
    })
}

