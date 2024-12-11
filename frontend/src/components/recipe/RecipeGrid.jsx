import { useContext } from "react";
import RecipeCard from "./RecipesCard";
import { GeneralContext } from "../../App";
import GridLoader from "../loaders/grid-loader/GridLoader";

const RecipeGrid = ({ recipes }) => {
    console.log(recipes);
    const{gridLoader}=useContext(GeneralContext)

    return (
        <>
            <h1 className="site-title">Vital Bites</h1>
            <div className="recipe-container">
                {gridLoader ? (
                   <GridLoader/>
                ) : (
                    recipes?.map(recipe => (
                        <RecipeCard
                            key={recipe._id}
                            recipe={recipe}
                        />
                    ))
                )}
            </div>
        </>

    );
};

export default RecipeGrid;
