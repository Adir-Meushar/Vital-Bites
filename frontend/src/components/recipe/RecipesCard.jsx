import React, { useContext, useState } from 'react';
import { GeneralContext } from '../../App';
import { BsTrash3 } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import './recipe-card.css'
import { CiReceipt } from "react-icons/ci";
import RecipeImg from '../recipe-img/RecipeImg';

function RecipeCard({ recipe }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [favoritedBy, setFavoritedBy] = useState(recipe.favoritedBy); //icon toggle
    const [recipeBigImg, setRecipeBigImg] = useState(false)
    const { user, showToastMessage, setMyFavorite, setMyRecipes, setRecipes } = useContext(GeneralContext);
    const location = useLocation();

    const toggleExpand = () => {
        setIsExpanded(prevState => !prevState);
    };

    const handleFavorite = async (recipeId) => {
        if (!user) {
            return showToastMessage('Please Login In Order To Add This Recipe To Favorite List', 'red')
        }
        try {
            const response = await fetch(`http://localhost:5000/recipe/favorite/${recipeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (favoritedBy.includes(user?._id)) {
                    setFavoritedBy(prev => prev.filter(id => id !== user?._id));
                    setMyFavorite(prev => prev.filter(recipe => recipe._id !== recipeId));
                    showToastMessage(`${recipe?.title} was removed from your favorite list`, '#4CAF50')
                } else {
                    setFavoritedBy(prev => [...prev, user?._id]);
                    showToastMessage(`${recipe?.title} was added to your favorite list`, '#4CAF50')
                }
                console.log(data.message);

            } else {
                const error = await response.json();
                console.error('Error:', error.error);
            }
        } catch (error) {
            console.error('Error while toggling favorite:', error);
        }
    };

    const handleDelete = async (recipeId) => {

        if (!window.confirm('Are you sure you want to delete this recipe?')) {
            return
        }

        if (user._id !== recipe.createdBy) {
            return showToastMessage('Acsess Denied', 'red')
        }

        try {
            const response = await fetch(`http://localhost:5000/recipe/${recipeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }
            setMyRecipes(prev => prev.filter(recipe => recipe._id !== recipeId));
            showToastMessage('Recipe Deleted Sucssesfuly!', '#4CAF50')

        } catch (error) {
            console.error("Error deleting recipe:", error);
        }

    }
    // const toggleImg= () => {
    //     setRecipeBigImg(!recipeBigImg)
    // }
    return (
        <div className="recipe-card">
            <img src={recipe.imageUrl} alt={recipe.title} className="recipe-img"  />
            {/* {recipeBigImg&& (
                <RecipeImg recipe={recipe} isImage={toggleImg}/>
            )} */}
            <div className="recipe-details">
                <h3 className="recipe-title">{recipe.title}</h3>
                <div className="recipe-meta">
                    <div className='tags-box'>
                        {recipe.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                    <p>Difficulty: {recipe.difficulty}</p>

                    <p>Prep: {recipe.time.prep} | Cook: {recipe.time.cook}</p>
                    <p>Servings: {recipe.servings}</p>
                    {user?._id == recipe.createdBy ? <CiReceipt className='card-owner-icon' /> : ''}
                    <div className='rating-box'>
                        {favoritedBy.length}
                        <button
                            className="favorite-btn"
                            onClick={() => handleFavorite(recipe._id)}>
                            <i className={`fa${favoritedBy.includes(user?._id) ? 's' : 'r'} fa-heart`}></i>
                        </button>
                    </div>
                    {user && location.pathname === '/my-recipes' && (
                        <button className='delete-btn' onClick={() => handleDelete(recipe._id)}>
                            <BsTrash3 />
                        </button>
                    )}
                </div>
                <button className="expand-btn" onClick={toggleExpand}>
                    {isExpanded ? 'See Less' : 'See More'}
                </button>
                <div className={`expandable ${isExpanded ? 'open' : ''}`}>
                    <p className="description">{recipe.description}</p>
                    <ul className="ingredients">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.quantity} {ingredient.name}
                            </li>
                        ))}
                    </ul>
                    <p className="nutrition">
                        {recipe?.nutritionInfo && (
                            <>
                                Calories: {recipe.nutritionInfo.calories} | Protein: {recipe.nutritionInfo.protein}g
                                | Carbs: {recipe.nutritionInfo.carbs}g | Fat: {recipe.nutritionInfo.fat}g
                            </>
                        )}
                    </p>
                    <p className="instructions">{recipe.instructions}</p>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;
