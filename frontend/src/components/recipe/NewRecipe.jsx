import './recipe-form.css'

function NewRecipe({toggleForm}) {
    return (
        <>
        
          <div onClick={toggleForm} className="modal-overlay">
            <div className="modal-container">
        
              <div className='new-recipe-container' onClick={(ev) => ev.stopPropagation()}>
              <h1>Create a New Recipe</h1>
              <button className="close-btn" onClick={toggleForm}>X</button>

              <form className="new-recipe-form">
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value="Delicious Pasta"
                    required
                  />
                </label>
      
                <label>
                  Description:
                  <textarea
                    name="description"
                    value="A hearty and flavorful pasta dish perfect for dinner."
                    required
                  />
                </label>
      
                <label>Ingredients:</label>
                <div className="ingredient-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Ingredient Name"
                    value="Pasta"
                    required
                  />
                  <input
                    type="text"
                    name="quantity"
                    placeholder="Quantity"
                    value="200g"
                    required
                  />
                  <button type="button">Remove</button>
                </div>
                <button type="button">Add Ingredient</button>
      
                <label>
                  Instructions:
                  <textarea
                    name="instructions"
                    value="Boil the pasta, prepare the sauce, mix them together, and serve hot."
                    required
                  />
                </label>
      
                <label>Time:</label>
                <div className="time-inputs">
                  <input
                    type="number"
                    name="prep"
                    placeholder="Prep Time (min)"
                    value={10}
                    required
                  />
                  <input
                    type="number"
                    name="cook"
                    placeholder="Cook Time (min)"
                    value={20}
                    required
                  />
                  <input
                    type="number"
                    name="total"
                    placeholder="Total Time (min)"
                    value={30}
                    required
                  />
                </div>
      
                <label>Nutrition Info:</label>
                <div className="nutrition-inputs">
                  <input
                    type="number"
                    name="calories"
                    placeholder="Calories"
                    value={300}
                  />
                  <input
                    type="number"
                    name="protein"
                    placeholder="Protein (g)"
                    value={10}
                  />
                  <input
                    type="number"
                    name="carbs"
                    placeholder="Carbs (g)"
                    value={50}
                  />
                  <input
                    type="number"
                    name="fat"
                    placeholder="Fat (g)"
                    value={5}
                  />
                </div>
      
                <label>
                  Servings:
                  <input
                    type="number"
                    name="servings"
                    value={4}
                    required
                  />
                </label>
      
                <label>
                  Difficulty:
                  <select name="difficulty" value="medium" required>
                    <option value="">Select Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </label>
      
                <label>
                  Tags (comma-separated):
                  <input
                    type="text"
                    name="tags"
                    value="pasta, dinner, Italian"
                  />
                </label>
      
                <label>
                  Image URL:
                  <input
                    type="url"
                    name="imageUrl"
                    value="https://example.com/image.jpg"
                  />
                </label>
      
                <button type="submit">Submit Recipe</button>
              </form>
              </div>
            </div>
          </div>
        </>
      );
      
}

export default NewRecipe




// import React, { useState } from "react";
// import "./new-recipe.css";

// function NewRecipe() {
//     const [recipe, setRecipe] = useState({
//         title: "",
//         description: "",
//         ingredients: [{ name: "", quantity: "" }],
//         instructions: "",
//         time: { prep: "", cook: "", total: "" },
//         nutritionInfo: { calories: "", protein: "", carbs: "", fat: "" },
//         servings: "",
//         difficulty: "",
//         tags: "",
//         imageUrl: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setRecipe((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleNestedChange = (e, parentKey) => {
//         const { name, value } = e.target;
//         setRecipe((prev) => ({
//             ...prev,
//             [parentKey]: {
//                 ...prev[parentKey],
//                 [name]: value
//             }
//         }));
//     };

//     const handleIngredientChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedIngredients = [...recipe.ingredients];
//         updatedIngredients[index][name] = value;
//         setRecipe((prev) => ({
//             ...prev,
//             ingredients: updatedIngredients
//         }));
//     };

//     const addIngredient = () => {
//         setRecipe((prev) => ({
//             ...prev,
//             ingredients: [...prev.ingredients, { name: "", quantity: "" }]
//         }));
//     };

//     const removeIngredient = (index) => {
//         const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
//         setRecipe((prev) => ({
//             ...prev,
//             ingredients: updatedIngredients
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Submitting recipe:", recipe);
//         // Add logic to send the data to the server here
//     };

//     return (
//         <div className="new-recipe-container">
//             <h1>Create a New Recipe</h1>
//             <form onSubmit={handleSubmit} className="new-recipe-form">
//                 <label>
//                     Title:
//                     <input
//                         type="text"
//                         name="title"
//                         value={recipe.title}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>

//                 <label>
//                     Description:
//                     <textarea
//                         name="description"
//                         value={recipe.description}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>

//                 <label>Ingredients:</label>
//                 {recipe.ingredients.map((ingredient, index) => (
//                     <div key={index} className="ingredient-row">
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Ingredient Name"
//                             value={ingredient.name}
//                             onChange={(e) => handleIngredientChange(index, e)}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="quantity"
//                             placeholder="Quantity"
//                             value={ingredient.quantity}
//                             onChange={(e) => handleIngredientChange(index, e)}
//                             required
//                         />
//                         <button type="button" onClick={() => removeIngredient(index)}>
//                             Remove
//                         </button>
//                     </div>
//                 ))}
//                 <button type="button" onClick={addIngredient}>
//                     Add Ingredient
//                 </button>

//                 <label>
//                     Instructions:
//                     <textarea
//                         name="instructions"
//                         value={recipe.instructions}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>

//                 <label>Time:</label>
//                 <div className="time-inputs">
//                     <input
//                         type="number"
//                         name="prep"
//                         placeholder="Prep Time (min)"
//                         value={recipe.time.prep}
//                         onChange={(e) => handleNestedChange(e, "time")}
//                         required
//                     />
//                     <input
//                         type="number"
//                         name="cook"
//                         placeholder="Cook Time (min)"
//                         value={recipe.time.cook}
//                         onChange={(e) => handleNestedChange(e, "time")}
//                         required
//                     />
//                     <input
//                         type="number"
//                         name="total"
//                         placeholder="Total Time (min)"
//                         value={recipe.time.total}
//                         onChange={(e) => handleNestedChange(e, "time")}
//                         required
//                     />
//                 </div>

//                 <label>Nutrition Info:</label>
//                 <div className="nutrition-inputs">
//                     <input
//                         type="number"
//                         name="calories"
//                         placeholder="Calories"
//                         value={recipe.nutritionInfo.calories}
//                         onChange={(e) => handleNestedChange(e, "nutritionInfo")}
//                     />
//                     <input
//                         type="number"
//                         name="protein"
//                         placeholder="Protein (g)"
//                         value={recipe.nutritionInfo.protein}
//                         onChange={(e) => handleNestedChange(e, "nutritionInfo")}
//                     />
//                     <input
//                         type="number"
//                         name="carbs"
//                         placeholder="Carbs (g)"
//                         value={recipe.nutritionInfo.carbs}
//                         onChange={(e) => handleNestedChange(e, "nutritionInfo")}
//                     />
//                     <input
//                         type="number"
//                         name="fat"
//                         placeholder="Fat (g)"
//                         value={recipe.nutritionInfo.fat}
//                         onChange={(e) => handleNestedChange(e, "nutritionInfo")}
//                     />
//                 </div>

//                 <label>
//                     Servings:
//                     <input
//                         type="number"
//                         name="servings"
//                         value={recipe.servings}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>

//                 <label>
//                     Difficulty:
//                     <select
//                         name="difficulty"
//                         value={recipe.difficulty}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Select Difficulty</option>
//                         <option value="easy">Easy</option>
//                         <option value="medium">Medium</option>
//                         <option value="hard">Hard</option>
//                     </select>
//                 </label>

//                 <label>
//                     Tags (comma-separated):
//                     <input
//                         type="text"
//                         name="tags"
//                         value={recipe.tags}
//                         onChange={handleChange}
//                     />
//                 </label>

//                 <label>
//                     Image URL:
//                     <input
//                         type="url"
//                         name="imageUrl"
//                         value={recipe.imageUrl}
//                         onChange={handleChange}
//                     />
//                 </label>

//                 <button type="submit">Submit Recipe</button>
//             </form>
//         </div>
//     );
// }

// export default NewRecipe;
