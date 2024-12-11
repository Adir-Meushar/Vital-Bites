const Recipe  = require('../recipe/recipe-model');
const  User  = require('../user/user-model');
const { recipes } = require('./json-filse/recipesData.json');
const { users } = require('./json-filse/usersData.json');

const initialDataStart = async () => {
  try {
    // Check if the User collection is empty
    const userCount = await User.find().countDocuments();
    if (!userCount) {
      console.log("Populating users...");
      for (const userData of users) {
        const user = new User(userData);
        await user.save();
      }
      console.log("Users added successfully!");
    } else {
      console.log("Users already exist, skipping population.");
    } 

    // Check if the Recipe collection is empty
    const recipeCount = await Recipe.find().countDocuments();
    if (!recipeCount) {
      console.log("Populating recipes...");
      for (const recipeData of recipes) {
        const recipe = new Recipe(recipeData);
        await recipe.save();
      }
      console.log("Recipes added successfully!");
    } else {
      console.log("Recipes already exist, skipping population.");
    }
  } catch (error) {
    console.error("Error populating initial data:", error);
  }
};

// Call the function
initialDataStart();
