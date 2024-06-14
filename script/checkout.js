// Footer year
document.querySelector('#current-year').textContent = new Date().getFullYear();

// Getting my products from the localStorage to display in my table
let cart = JSON.parse(localStorage.getItem('checkout')) || [];
let checkoutTable = document.querySelector('[table-checkout]');
let totalAmountElement = document.getElementById('total-amount'); // Select the total amount element

function cartItems() {
    if (cart.length === 0) {
        checkoutTable.innerHTML = "<tr><td colspan='4'>Add items to your cart</td></tr>";
        totalAmountElement.textContent = 'R0'; // Initialize total amount display
        return;
    }

    let cartProducts = cart.reduce((groupedItems, item) => {
        if (!groupedItems[item.id]) {
            groupedItems[item.id] = [];
        }
        groupedItems[item.id].push(item);
        return groupedItems;
    }, {});

    let totalAmount = 0;

    for (let id in cartProducts) {
        let productGroup = cartProducts[id];
        let product = productGroup[0];
        let quantity = productGroup.length;
        let amount = product.amount;
        let total = amount * quantity;

        checkoutTable.innerHTML += `
            <tr>
                <td>${product.productName}</td>
                <td>${quantity}</td>
                <td>R${amount}</td>
                <td>R${total}</td>
            </tr>
        `;

        totalAmount += total;
    }

    totalAmountElement.textContent = `R${totalAmount}`; // Update total amount display
}

cartItems();

// This function is to clear the products in my table and is linked to onclick
function clearProducts() {
    localStorage.removeItem('checkout');
    alert('Press "OK" to remove items from your cart');
    location.reload();
}

// This function is for product payment and clear products on my table
function productPayment() {
    localStorage.removeItem('checkout');
    alert('Payment Successful');
    location.reload();
}
