import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";
import { getParams } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");
//console.log(dataSource.findProductById(productId));

const product = new ProductDetails(productId, dataSource);
product.init();


function addProductToCart(product) {
 //console.log(product);
  setLocalStorage("so-cart", product);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const nProduct = await dataSource.findProductById(e.target.dataset.id);
 addProductToCart(nProduct);
}

// add listener to Add to Cart button
const boton_carrito = document
.getElementById("addToCart");
if (boton_carrito != null){
 boton_carrito.addEventListener("click", addToCartHandler);
}
  

  

//document
//  .getElementById("addToCart")
//  .addEventListener("click", addToCartHandler);

