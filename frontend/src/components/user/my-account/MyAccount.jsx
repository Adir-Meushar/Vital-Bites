import { useContext } from "react";
import { GeneralContext } from "../../../App";
import './my-account.css'
import { Link } from "react-router-dom";

function MyAccount() {
    const { user } = useContext(GeneralContext);
    console.log(user);

    return (
        <div>
            <h1>User Profile</h1>
            <p>Hello & Welcome {user?.fullName} here you can find your recipes and your favorites</p>
            <div className="profile-img-box">
            </div>




            <div className="image-link-container">
                <Link to="/my-recipes" className="image-link">
                <img src="/images/my-recipe.webp" alt="my-recipe" />
                    <span>My Recipes</span>
                </Link>
                <Link to="/favorite-recipes" className="image-link">
                <img src="/images/favorite-recipes.webp" alt="favorite" />
                    <span>Favorites</span>
                </Link>
            </div>
        </div>
    )
}
export default MyAccount
