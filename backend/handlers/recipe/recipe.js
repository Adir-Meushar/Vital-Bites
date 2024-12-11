const Recipe=require('../recipe/recipe-model');
const User=require('../user/user-model');
const guard=require('../helpers/guard');
const { getUserInfo } = require('../helpers/jwtUtilis');
const recipeValidationSchema = require('./recipeValidation');
const mongoose = require('mongoose');


module.exports=app=>{

    //Create New Recipe//
    app.post('/recipe',guard,async(req,res)=>{

     try{
        const userToken = getUserInfo(req, res);
        if (!userToken) { 
            return; // The response is already handled in getUserInfo
        }

        const{title,description,ingredients,instructions,imageUrl,time,servings,difficulty,tags,nutritionInfo}=req.body;

        const {error,value}=recipeValidationSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ error: error.details.map(detail => detail.message) }); 
          }

        const recipe= new Recipe({
          title,
          description,
          ingredients,
          instructions,
          imageUrl,
          time,
          servings,
          difficulty,
          tags,
          nutritionInfo,
          createdBy: userToken.userId  
        });
  
        const newRecipe = await recipe.save();
       
 // Update the user's recipes array with the new recipe ID
      await User.findByIdAndUpdate(userToken.userId, {
       $push: { recipes: newRecipe._id }
      });

        res.status(200).send(newRecipe);

     }catch(error){
        console.error('Error creating recipe:', error);
        res.status(500).send('Internal Server Error'); 
     }
    });


    //Get All Recipes//
    app.get('/recipe/all',async(req,res)=>{

        try{
            const recipes=await Recipe.find();
 
            res.status(200).send(recipes);

        }catch(error){
            res.status(500).send({ error: 'Error fetching recipes'});
        }
    });


   //Get My Recipes//
   app.get('/recipe/my-recipes/:userId', guard, async (req, res) => {
       try {
           const userToken = getUserInfo(req, res);
   
           if (userToken.userId !== req.params.userId) { 
               return res.status(403).send({ error: 'Permission denied' });
           }
   
           // Convert userId to ObjectId for querying if needed
           const myRecipes = await Recipe.find({ createdBy: new mongoose.Types.ObjectId(req.params.userId) });
   
           if (!myRecipes.length) {
               return res.status(404).send({ error: 'Recipe not found' });
           }
         
           res.status(200).send(myRecipes);
       } catch (error) {
           console.error(error);
           res.status(500).send({ error: 'Error fetching recipe' });
       }
   });
   
   //Get My Recipes//
   app.get('/recipe/favorite-recipes/:userId', guard, async (req, res) => {
    try {
        const userToken = getUserInfo(req, res);

        if (userToken.userId !== req.params.userId) { 
            return res.status(403).send({ error: 'Permission denied' });
        }

        // Convert userId to ObjectId for querying if needed
        const favoriteRecipes = await Recipe.find({ favoritedBy: new mongoose.Types.ObjectId(req.params.userId) });

        if (!favoriteRecipes.length) {
            return res.status(404).send({ error: 'Recipe not found' });
        }
      
        res.status(200).send(favoriteRecipes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error fetching recipe' });
    }
});

    //Delete Recipe//
    app.delete('/recipe/:id', guard, async (req, res) => {
        try {
            const userToken = getUserInfo(req, res);
            
            const recipe = await Recipe.findById(req.params.id);
            if (!recipe) {
                return res.status(404).send({ error: 'Recipe not found' });
            }
            
            if (userToken.userId !== recipe.createdBy.toString() && userToken.isAdmin !== 'admin') { 
                return res.status(403).send({ error: 'Permission denied' });
            }
            
            const recipeToDelete = await Recipe.findByIdAndDelete(req.params.id);

            await User.findByIdAndUpdate(recipe.createdBy, {
                $pull: { recipes: recipeToDelete._id }
            });

            return res.status(200).send({
                message: `${recipeToDelete.title} was deleted successfully!`,
                Recipe: recipeToDelete,
            });

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error deleting recipe' });
        }
    });


    //Favorite Recipe//
    app.patch('/recipe/favorite/:id', guard, async (req, res) => {
        
        try{
            const userToken = getUserInfo(req, res);
            const recipeId = req.params.id;

            const recipe = await Recipe.findById(recipeId);
            if (!recipe) {
                return res.status(404).send({ error: 'Recipe not found' });
            }

            const user = await User.findById(userToken.userId);
            const isFavorite = user.favoriteRecipes.includes(recipeId);
 
            if (isFavorite) {
                await User.findByIdAndUpdate(userToken.userId, { $pull: { favoriteRecipes: recipeId } });
                await Recipe.findByIdAndUpdate(recipeId, { $pull: { favoritedBy: userToken.userId } });

                return res.status(200).send({ message: 'Recipe removed from favorites' });
            } else {
                await User.findByIdAndUpdate(userToken.userId, { $addToSet: { favoriteRecipes: recipeId } });
                await Recipe.findByIdAndUpdate(recipeId, { $addToSet: { favoritedBy: userToken.userId } });

                return res.status(200).json({ message: 'Recipe added to favorites' });

            }
        }catch(error){
            console.error('Error updating favorites:', error);
            res.status(500).send({ error: 'Error updating favorites' });
            console.log(`Response Sent: ${isFavorite ? 'Removed' : 'Added'} favorite for user ${userToken.userId}`);

        }

    });
    
}