const  User  = require("../user/user-model");
const {userSignupSchema} = require("../user/userValidation");



module.exports=app=>{
    app.post('/users/signup',async(req,res)=>{

        const{fullName,email,password}=req.body;

        const {error,value}=userSignupSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ error: error.details.map(detail => detail.message) }); 
          }
          
          const existingUser = await User.findOne({ email });
  
          if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
          }

          try{
            const user = new User({ 
                fullName, 
                email, 
                password
             })
    
             const newUser=await user.save();

             res.status(200).send(newUser);

          }catch(error){
            res.status(500).send({ error: 'Error creating user' });
          }

    })
}