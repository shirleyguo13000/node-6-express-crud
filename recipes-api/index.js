// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
// import node modules
import express from "express";
import fs from "fs/promises";

// app instance of express
const app = express();

// port
const port = 3000;

// middleware for using JSON
app.use(express.json());

// start server!
app.listen(port, () => {
  console.log(`it's going on port: ${port}`);
});
// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllRecipes()

async function getAllRecipes() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedData = JSON.parse(data);
  return parsedData;
}

// **CLEAN AND COMMENT CODE**
// 2. getOneRecipe(index)
// async function declared with index as its parameter
async function getOneRecipe(index) {
  // waiting for the data to be read in its path and returned as JSON strings
  const data = await fs.readFile("recipes-data.json", "utf8");
  // parses the data from JSON into javascript
  const parsedData = JSON.parse(data);
  // declaring variable recipe for dynamic data filtering via index parameter
  const recipe = parsedData[index];
  // return whatever data is requested via index
  return recipe;
}

// 3. getAllRecipeNames()
async function getAllRecipeNames() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedData = JSON.parse(data);
  const names = parsedData.map((recipe) => recipe.name);
  return names;
}

// 4. getRecipesCount()

async function getRecipesCount() {
  const data = await fs.readFile("recipes-data.json", "utf8");
  const parsedData = JSON.parse(data);
  const count = parsedData.length;
  return count;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes
app.get("/get-all-recipes", async (req, res) => {
  const recipes = await getAllRecipes();
  res.json(recipes);
});

// ** CLEAN AND COMMENT CODE**
// 2. GET /get-one-recipe/:index
// sending GET request to server for get-one-recipe
app.get("/get-one-recipe/:index", async (req, res) => {
// accesses the index via requested parameters delcared in helper function
  const index = Number(req.params.index);
//wait for the helper function to be called 
  const recipe = await getOneRecipe(index);
  // sends the object back as JSON
  res.json(recipe);
});

// 3. GET /get-all-recipe-names
app.get("/get-all-recipe-names", async (req, res) => {
  const names = await getAllRecipeNames();
  res.json(names);
});

// 4. GET /get-recipes-count
app.get("/get-recipes-count", async (req, res) => {
  const count = await getRecipesCount();
  res.json(count);
});
