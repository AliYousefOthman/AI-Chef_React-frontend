import { useState,useEffect,useRef } from "react";
import Section from "./section.jsx";
import GenerateContent from './model.jsx';


export default function Body() {
    let [elements,setElements] = useState(null);
    let [bo,setbo] = useState(false);
    let [recipe,setRecipe] = useState(null);
    let resultRef = useRef(null);
    console.log("API Key Check:", import.meta.env.VITE_GEMINI_API_KEY);


useEffect(() => {
    if (bo && recipe.current !== null){
        resultRef.current.scrollIntoView();
    }
},[bo])

    async function showRecipe(event){
        event.preventDefault();
        try{
        const SYSTEM_PROMPT = `
            You are an assistant that receives list of ingredients the user has and suggests a recipe they could make with some or all of these ingredients.
            You aren't forced to use every ingredient of the ingredients, you also can add new ingredients to your recipe, but don't add so many extra ingredients.
            Format your response in markdown to make it easier to render to a web page.
            The ingredients are ${elements.join(", ")}
        `
        const result = await GenerateContent(SYSTEM_PROMPT);
        setRecipe(result);
        setbo(!bo);
        } catch(err){
            console.log(err);
        }
    }

    function clearHandler(event) {
        event.preventDefault();
        setElements(null);
    }
    
    function actionData(formData) { // preventDefault and reset automatically
        const newIngredient = formData.get("ingredient");
        console.log(Object.fromEntries(formData));
        if (!newIngredient) return console.log("Empty");
        setElements(prev =>
            prev ? [...prev,newIngredient] : [newIngredient]
        )
    }

    function submitHandler(event) {
        event.preventDefault();
        console.log("Added successfully!");
        const formData = new FormData(event.currentTarget); // Current form of data
        const newIngredient = formData.get("ingredient");
        if (!newIngredient) return console.log("Empty!");
        setElements(prev =>
            prev ? [...prev, newIngredient] : [newIngredient]); // this func should return new list not using push on previous list
        event.currentTarget.reset();
    }

    return (
        <>
        <main>
            <form className="form" onSubmit={submitHandler}>
                <input type="text" aria-label="Add ingredient" placeholder=" e.g. flour" name="ingredient" />
                <input type="submit" value={"+ Add ingredient"} />
            </form>
            <div className="div">
                <button onClick={clearHandler}>Clear</button>
            </div>
            {elements ? (
            <h1 className="h1">
                Ingredients :
            </h1>) : null}
            <ul className="ul">
                {elements && elements.map((element,index) => {
                return (<li key={index}>{element}</li>)})}
            </ul>
            {elements && <div className="recipe-div">
                <h3>Ready for recipe</h3>
                <button onClick={showRecipe}>Get Recipe</button>
                <h5>Generate recipe from list of ingredients.</h5>
            </div>}
            {bo && <Section recipe={recipe} ref={resultRef}/>}
        </main>
        </>
    )
}