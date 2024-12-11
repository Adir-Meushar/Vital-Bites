const guard = require("../helpers/guard");
const { getUserInfo } = require("../helpers/jwtUtilis");
const User = require("./user-model");


module.exports=app=>{
    app.get('/users/all',guard,async(req,res)=>{

        const userToken=getUserInfo(req,res);

        try{

            if(userToken.isAdmin !== 'admin'){
                return res.status(403).send({ error: 'Permission denied' });
            } 
    
            const users=await User.find();
            res.status(200).send(users)

        }catch(error){
            res.status(500).send({ error: 'Error fetching users'});

        }
    });

    app.delete('/users/:userId',guard,async(req,res)=>{

        const userToken=getUserInfo(req,res);

        try{

            if(userToken.isAdmin !== 'admin'){
                return res.status(403).send({ error: 'Permission denied' });
            } 

            const userToDelete = await User.findOneAndDelete({ _id: req.params.userId });

            if (!userToDelete) {
                return res.status(404).send({ error: 'User not found' });
            }

            return res.status(200).send({
                message: `${userToDelete.userName} was deleted successfully!`,
                User: userToDelete,
            });
        }catch(error){
            res.status(500).send({ error: 'Error fetching users'});

        }
    })
}