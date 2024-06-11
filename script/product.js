// Footer year
document.querySelector('#current-year').textContent = new Date().getFullYear();

// The product wrapper being made
let storedProducts = localStorage.getItem('products');
if (!storedProducts) {
    const defaultProducts = [
        {
            id: 1,
            productName: 'Raw Falafel mix',
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
            productName: 'Shata',
            image: 'https://mohammad-mohamed.github.io/hostedImages/images/JS_EOMP/product/Shata.jpeg',
            category: 'Food',
            amount: 15
        },
        {
            id: 5,
            productName: 'Pita',
            image: 'https://mohammad-mohamed.github.io/hostedImages/images/JS_EOMP/product/pitas.jpg',
            category: 'Food',
            amount: 25
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
                <div class="col">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top h-50 w-50 img-fluid align-self-center" alt="${product.id}">
                        <div class="card-body">
                            <h5 class="card-title">${product.productName}</h5>
                            <p class="card-text">${product.category}</p>
                            <p class="card-text">${product.amount}</p>
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
};

displayProducts(products);

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

let cart = JSON.parse(localStorage.getItem('checkout')) || [];
function addToCart(product) {
    try {
        cart.push(product);
        localStorage.setItem('checkout', JSON.stringify(cart));
    } catch (e) {
        alert('The Checkout is under maintenance');
    }
}

