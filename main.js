// задание 1
let container = document.getElementById('recipesContainer');
let form = document.getElementById('recipeForm');
let input = document.getElementById('recipeInput');
let errorText = document.getElementById('errorMessage');

let url = 'https://dummyjson.com/recipes';

function showRecipes() {
    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            let list = data.recipes;
            
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                let card = document.createElement('div');
                card.className = 'recipe-card';
                
                card.innerHTML = `
                    <img src="${item.image}" alt="">
                    <h3>${item.name}</h3>
                    <p>Кухня: ${item.cuisine}</p>
                    <button class="delete-btn">Удалить</button>
                `;
                
                let btn = card.querySelector('.delete-btn');
                btn.addEventListener('click', function() {
                    deleteRecipe(item.id, card);
                });
                
                container.appendChild(card);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let text = input.value.trim();

    if (text === '') {
        errorText.className = '';
        return;
    }

    errorText.className = 'error-hidden';

    fetch(url + '/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: text
        })
    })
    .then(function(res) {
        return res.json();
    })
    .then(function(newCard) {
        let card = document.createElement('div');
        card.className = 'recipe-card';
        
        card.innerHTML = `
            <img src="https://placeholder.com" alt="">
            <h3>${newCard.name}</h3>
            <p>Кухня: Домашняя</p>
            <button class="delete-btn">Удалить</button>
        `;
        
        let btn = card.querySelector('.delete-btn');
        btn.addEventListener('click', function() {
            deleteRecipe(newCard.id, card);
        });

        container.appendChild(card);
        input.value = '';
    })
    .catch(function(err) {
        console.log(err);
    });
});

function deleteRecipe(id, htmlElement) {
    fetch(url + '/' + id, {
        method: 'DELETE'
    })
    .then(function(res) {
        return res.json();
    })
    .then(function() {
        htmlElement.remove();
    })
    .catch(function(err) {
        console.log(err);
    });
}

showRecipes();

// Задание2 
let productContainer = document.getElementById('productsContainer');
let productForm = document.getElementById('productForm');
let productInput = document.getElementById('productInput');
let productError = document.getElementById('productError');
let productUrl = 'https://dummyjson.com/products';

function showProducts() {
    fetch(productUrl)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            let list = data.products;
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                let card = document.createElement('div');
                card.className = 'product-card';
                
                card.innerHTML = `
                    <img src="${item.thumbnail}" alt="">
                    <h3>${item.title}</h3>
                    <p>Цена: $${item.price}</p>
                    <button class="delete-btn">Удалить</button>
                `;
                
                let btn = card.querySelector('.delete-btn');
                btn.addEventListener('click', function() {
                    deleteProduct(item.id, card);
                });
                
                productContainer.appendChild(card);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}

productForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let text = productInput.value.trim();

    if (text === '') {
        productError.className = '';
        return;
    }

    productError.className = 'error-hidden';

    fetch(productUrl + '/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: text,
            price: 0
        })
    })
    .then(function(res) {
        return res.json();
    })
    .then(function(newCard) {
        let card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <img src="https://placeholder.com" alt="">
            <h3>${newCard.title}</h3>
            <p>Цена: $${newCard.price}</p>
            <button class="delete-btn">Удалить</button>
        `;
        
        let btn = card.querySelector('.delete-btn');
        btn.addEventListener('click', function() {
            deleteProduct(newCard.id, card);
        });

        productContainer.appendChild(card);
        productInput.value = '';
    })
    .catch(function(err) {
        console.log(err);
    });
});

function deleteProduct(id, htmlElement) {
    fetch(productUrl + '/' + id, {
        method: 'DELETE'
    })
    .then(function(res) {
        return res.json();
    })
    .then(function() {
        htmlElement.remove();
    })
    .catch(function(err) {
        console.log(err);
    });
}

showProducts();
