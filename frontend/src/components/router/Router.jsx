import { Route, Routes } from "react-router-dom"
import { GeneralContext } from "../../App";
import { useContext } from "react";
import RecipeGrid from "../recipe/RecipeGrid";
import MyAccount from "../user/my-account/MyAccount";
import MyRecipes from "../recipe/MyRecipes";
import FavoriteRecipes from "../recipe/FavoriteRecipes";

function Router() {
    const { user, recipes } = useContext(GeneralContext);

    return (
        <div>
            <Routes>
                <Route path="/" element={<RecipeGrid recipes={recipes} />} />
                <Route path="/my-account" element={<MyAccount/>} />
                <Route path="/my-recipes" element={<MyRecipes/>} />
                <Route path="/favorite-recipes" element={<FavoriteRecipes/>} />
            </Routes>
        </div>
    )
}

export default Router
