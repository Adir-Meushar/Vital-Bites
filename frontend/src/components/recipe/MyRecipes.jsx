import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../App";
import RecipeCard from "./RecipesCard";
import NewRecipe from "./NewRecipe";

function MyRecipes() {
    const [newRecipe, setNewRecipe] = useState(false)

    const { user, myRecipes, setMyRecipes } = useContext(GeneralContext);

    const fetchMyRecipes = async (userId) => {

        try {
            const response = await fetch(`http://localhost:5000/recipe/my-recipes/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recipes');
            }

            const data = await response.json();

            setMyRecipes(data)
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }

    }

    useEffect(() => {
        if (user?._id) {
            fetchMyRecipes(user._id);
        }
    }, [user]);

    const toggleForm = () => {
        setNewRecipe(!newRecipe)
    }

    return (
        <>
            <h1>{user?.fullName} Recipe's</h1>

            <div className="recipe-container">
                {myRecipes.map((recipe) => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
            </div>

            <button onClick={toggleForm}>New Recipe</button>

            {
                newRecipe &&
                <NewRecipe toggleForm={toggleForm} />
            }
        </>

    )
}

export default MyRecipes
