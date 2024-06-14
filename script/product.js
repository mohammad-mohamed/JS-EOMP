// Footer year
document.querySelector('#current-year').textContent = new Date().getFullYear();

// The product wrapper being made
let storedProducts = localStorage.getItem('products');
if (!storedProducts) {
    const defaultProducts = [
        {
            id: 1,
            productName: 'Falafel',
            image: 'https://mohammad-mohamed.github.io/hostedImages/images/JS_EOMP/product/raw-falafel.jpg',
            category: 'Food',
            amount: 50
        },
        {
            id: 2,
            productName: 'Hummus',
            image: 'https://mohammad-mohamed.github.io/hostedImages/images/JS_EOMP/product/hummus.webp',
            category: 'Food',
            amount: 60
        },
        {
            id: 3,
            productName: 'Tzatziki',
            image: 'https://mohammad-mohamed.github.io/hostedImages/images/JS_EOMP/product/tzatziki.jpg',
            category: 'Food',
            amount: 60
        },
        {
            id: 4,
            productName: 'Pita',
            image: 'https://mohammad-mohamed.github.io/hostedImages/images/JS_EOMP/product/pitas.jpg',
            category: 'Food',
            amount: 25
        },
        {
            id: 5,
            productName: 'Shata',
            image: 'https://mohammad-mohamed.github.io/hostedImages/images/JS_EOMP/product/Shata.jpeg',
            category: 'Sauce',
            amount: 15
        },
        {
            id: 6,
            productName: 'Lemonade',
            image: 'https://mohammad-mohamed.github.io/hostedImages/images/JS_EOMP/product/lemonade.jpg',
            category: 'Drink',
            amount: 10
        },
        
    ];
    localStorage.setItem('products', JSON.stringify(defaultProducts));
    storedProducts = JSON.stringify(defaultProducts);
}
let products = JSON.parse(storedProducts);

let productWrapper = document.querySelector('[data-products]');

function displayProducts(args) {
    productWrapper.innerHTML = "";
    try {
        if (args.length) {
            args.forEach((product) => {
                productWrapper.innerHTML += `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.id}">
                        <div class="card-body">
                            <h5 class="card-title">${product.productName}</h5>
                            <p class="card-text">${product.category}</p>
                            <p class="card-text">R${product.amount}</p>
                            <a class="btn btn-secondary" id="cart" onclick='addToCart(${JSON.stringify(product)})'>Add To Cart</a>
                        </div>
                    </div>
                </div>`;
            });
        } else {
            productWrapper.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status"></div>
                <p>No Products Found</p>
            </div>`;
        }
    } catch (e) {
        alert('Error Loading Products');
    }
}

displayProducts(products);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#counter').textContent = cart.length || 0
})


let productSearch = document.querySelector('[data-search-product]');
productSearch.addEventListener('input', () => {
    try {
        let searchItem = products.filter(item => {
            return item.productName.toLowerCase().includes(productSearch.value.toLowerCase());
        });
        displayProducts(searchItem);
    } catch (e) {
        alert('Function is under maintenance');
    }
});


let productSort = document.querySelector('.btn');
let highest = false;
productSort.addEventListener('click', () => {
    try {
        if (!highest) {
            products.sort((a, b) => b.amount - a.amount);
            highest = true;
        } else {
            products.sort((a, b) => a.amount - b.amount);
            highest = false;
        }
        displayProducts(products);
    } catch (e) {
        alert('This Function is under maintenance');
    }
});

let categoryFilter = document.getElementById('category-filter');
categoryFilter.addEventListener('change', () => {
    try {
        let category = categoryFilter.value;
        let filteredProducts = category === 'all' ? products : products.filter(item => item.category === category);
        displayProducts(filteredProducts);
    } catch (e) {
        alert('Error Filtering Products');
    }
});

let cart = JSON.parse(localStorage.getItem('checkout')) || [];
function addToCart(product) {
    try {
        cart.push(product);
        localStorage.setItem('checkout', JSON.stringify(cart));
        document.querySelector('#counter').textContent = 
        cart.length || 0
    } catch (e) {
        alert('The Checkout is under maintenance');
    }
}

