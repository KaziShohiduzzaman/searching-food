document.getElementById('spinner').style.display = 'none';
const searchFood = () => {
    const inputSearch = document.getElementById('input-search');

    const inputText = inputSearch.value;
    if (inputText != '') {
        inputSearch.value = '';
        document.getElementById('spinner').style.display = 'block';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                document.getElementById('spinner').style.display = 'none';
                displaySearchResult(data.meals);
            })
    }

}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('card-div');
    searchResult.textContent = ' ';
    const errorMsg = document.getElementById('error-msg');
    errorMsg.innerText = ''
    if (meals == null) {
        errorMsg.innerText = 'এই নামে কোন খাবার নেই'
    }
    else {
        meals.forEach(meal => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col')
            colDiv.innerHTML = `
                <div onclick="mealDetails('${meal.idMeal}')" class="col">
                  <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                    </div>
                  </div>
                </div>
                `
            searchResult.appendChild(colDiv);
        });
    }



}
const mealDetails = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(res => res.json())
        .then(data => showMealDetails(data.meals[0]))
}

const showMealDetails = details => {
    const cardDetails = document.getElementById('details-card');
    cardDetails.textContent = '';
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
    <div class="card-header">
    Featured
    </div>
        <div class="card-body">
             <h5 class="card-title">${details.strMeal}</h5>
             <img class="my-5 img-fluid" src="${details.strMealThumb}" alt="">
            <a href="${details.strYoutube}" target=_blank; class="btn btn-primary">Go youtube for details</a>
        </div>
        <div class="card-footer text-muted">
             Catagory: ${details.strCategory}
        </div>
    `
    cardDetails.appendChild(newDiv)
}