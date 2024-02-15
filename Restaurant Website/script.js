const text=document.querySelector('.input')
const submitBtn=document.querySelector('.submit')
const recipeDiv=document.querySelector('.recipeDiv')

const recipe=async(food) => {
    recipeDiv.innerHTML="<h2 style='color:#fff;'>Please Wait....</h2>";
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`);
    const data=await response.json();
    recipeDiv.innerHTML=""
    data.meals.forEach(meal=> {
       const recipe=document.createElement('div')
       recipe.classList.add('recipe');
       recipe.innerHTML=`
       <img src="${meal.strMealThumb}">
       <h4><strong>${meal.strMeal}</strong></h4>
       <h4>${meal.strArea}</h4>
       <p>${meal.strCategory}</p>`
    //    <button onclick='recipeDetails(${meal})'><a herf="./recipe.html">Explore Recipe</a></button>
    //    `
      
       const button=document.createElement('button');
       button.textContent="Explore Recipe";
       recipe.appendChild(button);
       recipeDiv.appendChild(recipe);
    //    button.addEventListener('click',()=>{
    //     window.location.href ='recipe.html';
    //     // recipeDetails(meal);
    //    })
    })
}
const recipeDetails=(meal)=>{
    console.log("hello");
    // for (let index = 1; index <= 20; index++) {
    //     const i = `meal.strIngredient${index}`;
    //     const m=`meal.strMeasure${index}`;
    //     console.log(i+m);
    // }
}
submitBtn.addEventListener('click',(e)=>{
      e.preventDefault()
      const food=text.value
      recipe(food)
})