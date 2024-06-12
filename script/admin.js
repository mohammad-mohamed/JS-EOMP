// Footer year
document.querySelector('#current-year').textContent = new Date().getFullYear();

// Reference to table content
let tableContent = document.querySelector('#table-products');

// Retrieve products from localStorage or initialize with default products
let products = JSON.parse(localStorage.getItem('products')) || [];

// Reference to the "Sort" button
let sortedProducts = document.getElementById('adminSortProduct');

// Function to display products in the admin table with a modal for editing
function adminContent(args) {
    try {
        tableContent.innerHTML = "";
        args?.forEach((product, i) => {
            tableContent.innerHTML += `
            <tr>
                <td>${product.productName}</td>
                <td>${product.category}</td>
                <td><img src="${product.image}" alt="${product.id}" class="img-thumbnail h-25 w-25"></td>
                <td>R${product.amount}</td>
                <td>
                <div class="d-flex justify-content-around">
                    <button class="btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#updateProduct${product.id}">Update</button>
                    <button class="btn btn-secondary ms-2" onclick="deleteProduct(${i})">Delete</button>
                    <div class="modal fade" id="updateProduct${product.id}" tabindex="-1" aria-labelledby="updateProduct${product.id}" aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="updateProduct${product.id}">Update Product</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <form>
                          <div class="container">
                          <input class="form-control m-2" type="text" placeholder="Enter a Product Name" value="${product.productName}" name="admin-name" id="admin-name${product.id}" required>
                          <input class="form-control m-2" type="text" placeholder="Enter Image URL" value="${product.image}" name="admin-image" id="admin-image${product.id}" required>
                          <textarea class="form-control m-2" placeholder="Enter your Product details" required name="admin-category" id="admin-category${product.id}">${product.category}</textarea>
                          <input class="form-control m-2" type="number" placeholder="Enter the Product Amount" value="${product.amount}" name="admin-amount" id="admin-amount${product.id}" required>
                          </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-secondary" onclick='new UpdateProduct(${JSON.stringify(product)}, ${i})'>Save changes</button>
                        </div>
                      </div>
                        </div>
                    </div>
                </div>
                </td>
            </tr>
            `;
        });
    } catch (e) {
        tableContent.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status"></div>
            <p>No Products Found</p>
        </div>
        `;
    }
}

// Call the function to display the initial products
adminContent(products);

// function to help update the product
function UpdateProduct(item, index) {
    try {
        const updatedProduct = {
            id: item.id,
            productName: document.querySelector(`#admin-name${item.id}`).value,
            image: document.querySelector(`#admin-image${item.id}`).value,
            category: document.querySelector(`#admin-category${item.id}`).value,
            amount: parseInt(document.querySelector(`#admin-amount${item.id}`).value, 10)
        };

        products[index] = updatedProduct;
        localStorage.setItem('products', JSON.stringify(products));
        adminContent(products);
    } catch (e) {
        alert('Unable to Edit the Products');
    }
}

// function that deletes the product
function deleteProduct(index) {
    try {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        adminContent(products);
    } catch (e) {
        alert('Unable to Delete');
    }
}

// function that sorts the products
let highest = false;
sortedProducts.addEventListener('click', () => {
    try {
        if (!highest) {
            products.sort((a, b) => b.id - a.id);
            highest = true;
        } else {
            products.sort((a, b) => a.id - b.id);
            highest = false;
        }
        adminContent(products);
    } catch (e) {
        alert('This Function is under maintenance');
    }
});

// this function adds new product
let adminSavedProduct = document.getElementById('saveProduct');
adminSavedProduct.addEventListener('click', () => {
    try {
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1, // auto increment ID
            productName: document.querySelector('#addName').value,
            category: document.querySelector('#addDetail').value,
            amount: parseInt(document.querySelector('#addAmount').value, 10),
            image: document.querySelector('#addImage').value
        };

        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        adminContent(products);
    } catch (e) {
        alert('Unable to Add new product');
    }
});
