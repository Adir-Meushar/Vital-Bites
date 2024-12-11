import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../App";
import RecipeCard from "./RecipesCard";

function FavoriteRecipes() {
const [myFavorite,setMyFavorite]=useState([]);
    const { user } = useContext(GeneralContext);

    const fetchMyFavorite = async (userId) => {

        try {
            const response = await fetch(`http://localhost:5000/recipe/favorite-recipes/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recipes');
            }

            const data = await response.json();

            setMyFavorite(data)
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }

    }

    useEffect(() => {
        if (user?._id) {
            fetchMyFavorite(user._id);
        }
    }, [user]);

    return (
        <>
        <h1>{user?.fullName} Favorite Recipe's</h1>
        <div className="recipe-container">
            {myFavorite.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
        </div>
    </>

    )
}

export default FavoriteRecipes
