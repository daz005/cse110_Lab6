// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() 
{
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() 
{
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.

  let x= localStorage.getItem('recipes');
  let recipes=[];
  if (!!x)
  {
    recipes = JSON.parse(x);
  }
  return recipes;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) 
{
  // Array.from(document.getElementsByClassName("myElement")).forEach((element) => element.style.size = "100px");

  if(!recipes)
  {
    console.log("no recipes so far!");
    return;
  }

  // A10. TODO - Get a reference to the <main> element
  
  let mainElmt = null;
  for (let i=0; i < document.body.children.length; i++)
  {
    if (document.body.children.item(i).tagName == "MAIN")
    {
      mainElmt = document.body.children.item(i);
      break;
    }
  }  

  if(!mainElmt)
  {
    console.log("no Main tag!!!");
    return;
  }

  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>

  for (let i = 0; i < recipes.length; i++) 
  {
    const recipeCardElmt = document.createElement("recipe-card");
    recipeCardElmt.data = recipes[i];
    mainElmt.append(recipeCardElmt);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) 
{
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.

  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. TODO - Get a reference to the <form> element
  let formElmt = document.getElementById("new-recipe");
  formElmt.removeAttribute("class");
 
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  
  formElmt.addEventListener('submit', function(e){
    // on form submission, prevent default
    e.preventDefault();

    // Steps B4-B9 will occur inside the event listener from step B3
    // B4. TODO - Create a new FormData object from the <form> element reference above
    // construct a FormData object, which fires the formdata event
    let formDataObj = new FormData(this);

    // B5. TODO - Create an empty object (I'll refer to this object as recipeObject to
    //            make this easier to read), and then extract the keys and corresponding
    //            values from the FormData object and insert them into recipeObject
    let recipeObject = new Object();
    for (var [key, value] of formDataObj.entries()) 
    { 
      recipeObject[key] = value;
    }

    // B6. TODO - Create a new <recipe-card> element
    let recipeCardElemt = document.createElement("recipe-card");

    // B7. TODO - Add the recipeObject data to <recipe-card> using element.data
    recipeCardElemt.data = recipeObject;
    
    // B8. TODO - Append this new <recipe-card> to <main>
    let mainElmt = null;
    for (let i=0; i < document.body.children.length; i++)
    {
      if (document.body.children.item(i).tagName == "MAIN")
      {
        mainElmt = document.body.children.item(i);
        mainElmt.append(recipeCardElemt);
        break;
      }
    };  

    // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
    //            then save the recipes array back to localStorage
    let x = localStorage.getItem('recipes');
    let recipes = [];
    if(!!x)
    {
      recipes = JSON.parse(x);
    }

    recipes[recipes.length]=recipeObject;
    saveRecipesToStorage(recipes);

   });

   // B10. TODO - Get a reference to the "Clear Local Storage" button
   let clearBtn = null;
   for (let i=0; i < formElmt.children.length; i++)
   {
     if (formElmt.children.item(i).tagName == "BUTTON" 
     && formElmt.children.item(i).getAttribute("class") == "danger")
     {
       clearBtn = formElmt.children.item(i);
       break;
     }
   } 
   
   // B11. TODO - Add a click event listener to clear local storage button
   clearBtn.addEventListener('click', function(e)
   {
     // Steps B12 & B13 will occur inside the event listener from step B11
     // B12. TODO - Clear the local storage
     localStorage.removeItem('recipes');

     // B13. TODO - Delete the contents of <main>
     let mainElmt = null;
     for (let i=0; i < document.body.children.length; i++)
     {
       if (document.body.children.item(i).tagName == "MAIN")
       {
         mainElmt = document.body.children.item(i);
         mainElmt.innerHTML='';
         break;
       }
     }  

   });

}
