// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product
}


export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false)
{
  const htmlStrings = list.map(templateFn);
  if(clear){
    parentElement.innerHTML = " ";
  }
  parentElement.insertAdjacentHTML  (position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback)
{
  // console.log(template);
  
  parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
      callback(data);
    }
  }

export async function loadTemplate(path) {
 const res = await fetch(path);
//  console.log(res);
 const templateContent =await res.text();
//  console.log(templateContent);
 //const  template =document.createElement("template");
 //template.innerHTML = templateContent;
 return templateContent;
}

//funtion to update the a number in the backpack
export function updateCartCount() {
  //obtain the articles from localstorage
  const cartItems = getLocalStorage("so-cart") || [];
  //calculate the total items
  const totalItems =cartItems.length;
  //update the number in the html element with the"cart-count" class
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

// function to dynamically load the header and footer into a page
export async function loadHeaderFooter(){
  const headerTemplate =await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main_header")
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main_footer")

  // console.log("headerElement.innerHTML: ",headerElement.innerHTML)
  // console.log("footerElement.innerHTML: ",footerElement.innerHTML)

  if(headerElement.innerHTML == ''){
    console.log('header---');
    
    renderWithTemplate(headerTemplate, headerElement);
    updateCartCount()
  }

  
  if(footerElement.innerHTML == ''){
    renderWithTemplate(footerTemplate, footerElement);
  }

  
  
}