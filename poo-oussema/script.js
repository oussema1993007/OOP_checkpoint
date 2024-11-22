class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    calculateTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }
    getTotalItems() {
        return this.items.length;
    }


    addItem(product,quantity){
        const cartItem = new ShoppingCartItem(product,quantity);
        this.items.push(cartItem);
        this.displayCartItems();
        const productQuantity=document.getElementById('productQuantity');
        productQuantity.innerHTML='';
    }

    addItem(product,quantity){
        this.items.push(new ShoppingCartItem(product,quantity));
        this.displayCartItems();
        document.getElementById('ProductQuantity').innerHTML='';
    }
    
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCartItems();
    }
    displayCartItems() {
        const cartItemsDiv = document.getElementById('cartItems');
        cartItemsDiv.innerHTML = '';
        this.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `Product: ${item.product.name}, Quantity:${item.quantity}, total Price:${item.calculateTotalPrice()}<button
            onclick="removeItemFromCart(${item.product.id})">Remove</button>`;
            cartItemsDiv.appendChild(itemDiv);

        });
        document.getElementById('totalPrice').innerText = this.getTotalPrice();
    }
    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.calculateTotalPrice(), 0);
    }
}

const cart = new ShoppingCart();
let productIdCounter = 1;
const products = [];

function createProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);

    if (name && !isNaN(price)) {
        const product = new Product(productIdCounter++, name, price);
        products.push(product);
        updateProductSelect();
    } else {
        alert('Please enter valid product details.');
    }

}

function updateProductSelect() {
    const productSelect = document.getElementById('productSelect');
    productSelect.innerHTML = '';
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.text = product.name;
        productSelect.appendChild(option);
    });
}
function addItemToCart() {
    const productId = parseInt(document.getElementById('productSelect').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);

    if (!isNaN(productId) && !isNaN(quantity)) {
        const product = products.find(p => p.id === productId);
        cart.addItem(product, quantity);
    } else {
        alert('Please select a product and enter a valid quantity.');
    }
}
function removeItemFromCart(productId) {
    cart.removeItem(productId);
}
