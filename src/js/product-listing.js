import ProductData from "./ProductData.mjs";

import ProductListing from "./productList.mjs";
import { loadHeaderFooter } from './utils.mjs'; 

const dataSource = new ProductData("tents");
// console.log(dataSource);

// dataSource.getData().then(products => {
    // console.log(products)
// });
const listElement = document.getElementById("listElement")

const lista = new ProductListing("tents", dataSource, listElement);
lista.init();
loadHeaderFooter();