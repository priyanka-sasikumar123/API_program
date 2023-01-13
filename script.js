const searchform=document.querySelector('form');
const searchresultdiv=document.querySelector('.search-result');
const container=document.querySelector('.container');
let searchQuery='';
const APP_ID='3de90066';
const APP_KEY='e31bf318ab18d2709143d972ac4584ab'; 


searchform.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery=e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI(){
    const baseurl=`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
    const response=await fetch(baseurl);
    const data=await response.json();
    generatehtml(data.hits);
    console.log(data);
}
function generatehtml(results){
    container.classList.remove('initial');
    let generatedhtml='';
    results.map(result => {
        generatedhtml+=`
        <div class="item">
                    <img src="${result.recipe.image}" alt="">
                   <div class="imagecontent1">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
                   </div>
                   <p class="ptag_imgcntnt">Calories:${result.recipe.calories.toFixed(2)}</p>
                   <p class="ptag_imgcntnt">Cuisine Type:${result.recipe.cuisineType}</p>
                </div>
                `
    })
    searchresultdiv.innerHTML=generatedhtml;
}