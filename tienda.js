/*
   Damián estuvo aquí...
   Instagram: @damiiawa
   GitHub: @damiiawa

   Damián Astroza Pérez (Actualización 2025)
*/

// Selecciona todos los botones con la clase 'addToCart' y les agrega un event listener para ejecutar 'addToCartClicked' cuando se hace clic
const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

// Selecciona el botón 'comprar' y le agrega un event listener para ejecutar 'comprarButtonClicked' cuando se hace clic
const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

// Contenedor donde se agregarán los elementos del carrito
const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');

// Función que se ejecuta cuando se hace clic en 'Agregar al carrito'
function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.item'); // Encuentra el contenedor más cercano con la clase 'item'

    // Obtiene la información del producto (título, precio e imagen)
    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;

    // Agrega el producto al carrito
    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

// Agrega un nuevo producto al carrito de compras o incrementa la cantidad si ya existe
function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');
    
    // Verifica si el producto ya está en el carrito
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[i]
                .parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++; // Incrementa la cantidad
            $('.toast').toast('show'); // Muestra una notificación
            updateShoppingCartTotal(); // Actualiza el total del carrito
            return;
        }
    }

    // Crea un nuevo elemento en el carrito
    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
                <button class="btn btn-danger buttonDelete" type="button">Eliminar</button>
            </div>
        </div>
    </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    // Agrega event listeners para eliminar elementos o cambiar la cantidad
    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem);
    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);

    updateShoppingCartTotal(); // Actualiza el total del carrito
}

// Calcula y actualiza el total del carrito de compras
function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('$', ''));
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    
    // Muestra el total con dos decimales
    shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;
}

// Elimina un producto del carrito cuando se presiona el botón 'Eliminar'
function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove(); // Elimina el elemento del DOM
    updateShoppingCartTotal(); // Actualiza el total del carrito
}

// Verifica si la cantidad ingresada es válida (mayor a 0), de lo contrario la ajusta a 1
function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null; // Evita cantidades negativas o cero
    updateShoppingCartTotal(); // Actualiza el total del carrito
}

// Vacía el carrito cuando se presiona el botón 'Comprar'
function comprarButtonClicked() {
        if (shoppingCartItemsContainer.children.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de comprar.');
        return;
    } //Verifica si hay o no productos añadidos.
    
    shoppingCartItemsContainer.innerHTML = ''; // Elimina todos los elementos del carrito
    updateShoppingCartTotal(); // Actualiza el total a 0
}
