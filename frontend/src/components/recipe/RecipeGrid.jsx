import { useContext } from "react";
import RecipeCard from "./RecipesCard";
import { GeneralContext } from "../../App";
import GridLoader from "../loaders/grid-loader/GridLoader";

const RecipeGrid = ({ recipes }) => {
    const{gridLoader,searchQuery}=useContext(GeneralContext);

    const filteredRecipes = recipes?.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    );

    return (
        <>
            {/* <h1 className="site-title">Vital Bites</h1> */}
            <div className="recipe-container">
                {gridLoader ? (
                   <GridLoader/>
                ) : (
                    filteredRecipes?.length ? (
                        filteredRecipes.map(recipe => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))
                    ) : (
                        <p>No recipes found</p>
                    )
                )}
            </div>
        </>

    );
};

export default RecipeGrid;
