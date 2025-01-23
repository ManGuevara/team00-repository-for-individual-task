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

export function renderWithTemplate(templateFn, parent, data, callback)
{
    parent.insertAdjacentHTML("afetrbegin", templateFn);
    if (callback) {
      callback(data);
    }
  }
 

export async function loadTemplate(path) {
  //make a request fetch to the path and convert it to text
  const html = await fetch(path).then(convertToText);
  //creeate an element <template> where to save the HTML content
  const template= document.createElement("template");
  //stablish the template content with the HTML logged
  template.innerHTML = html;
  //returns the content from template, that now has the HTML content
  return template;
}

// function to dynamically load the header and footer into a page
export async function loadHeaderFooter(){
  const headerTemplate =await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main_header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main_footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

// export function renderListWithTemplate(productCardTemplate, parentElement, list, position = "afterbegin", clear = false) {
//   if (clear == true) {
//     while (parentElement.hasChildNodes()) {
//       parentElement.removeChild(parentElement.firstChild);
//     }
//   } else {
//     const newList = list;
//     parentElement.insertAdjacentHTML(position, newList.map((item) => productCardTemplate(item)).join(""));
//   }

// }