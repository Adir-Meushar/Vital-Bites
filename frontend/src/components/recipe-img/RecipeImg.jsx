import './recipe-img.css';

function RecipeImg({ recipe, isImage }) {

    
    return (
        <>
            {isImage && (
                <div className="recipe-big-img-modal">
                    <img src={recipe?.imageUrl} alt={recipe?.title} className="recipe-big-img" />
                </div>
            )}
        </>
    );
}

export default RecipeImg;
