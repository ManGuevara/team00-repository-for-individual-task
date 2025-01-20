import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const product_list = document.querySelector(".product-list-cart");
  if (product_list != null){
    product_list.innerHTML = htmlItems.join("");
  }
  
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

//funtion to update the a number in the backpack
function updateCartCount() {
  //obtain the articles from localstorage
  const cartItems = getLocalStorage("so-cart") || [];
  //calculate the total items
  const totalItems = cartItems.length;
  //update the number in the html element with the"cart-count" class
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}
function removeCartItem(event) {
  //This makes sure that the event is not a event bubbling
  //It looks like that event bubbling is when an event occurs on an element, it also propagates(bubbles up) to its parent elements.
  //So basicaly, instead of taking the Id of the button, I was getting the Id of li element.
  const buttonElement = event.target.closest(".remove-button");
  const itemId = buttonElement.id; //Gets the ID of the button which is the Id of the product.

  //Gets the items from the local storage
  const storedItem = getLocalStorage("so-cart" || []);

  //Updates the localStorage by removing the object with the Item.Id searched
  const updatedItem = storedItem.filter((item) => item.Id !== itemId);

  //Sends the updated version to the localStorage.
  const test = setLocalStorage("so-cart", updatedItem);

  //Find the closest .cart-card class to remove it
  const cartItem = buttonElement.closest(".cart-card");

  //Removes the whole li element to make cart look updated.
  if (cartItem) {
    cartItem.parentNode.removeChild(cartItem);
  }
}
// renderCartContents();
renderCartContents();
//Event listener to remove item from Local Storage. It needs to be outside so that the event is put, after the whole page is rendered.
const removeButtons = document.querySelectorAll(".remove-button");
removeButtons.forEach((button) => {
  button.addEventListener("click", removeCartItem);
});
updateCartCount();
