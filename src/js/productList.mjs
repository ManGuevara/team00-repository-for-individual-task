import { renderListWithTemplate } from "./utils.mjs";

function filterData(data) {
    if (data.Id == "880RR" || data.Id == "985RF" || data.Id ==  "985PR" || data.Id ==  "344YJ") {
        return data;
    }
}

export function productCardTemplate(product) {
    if (product.FinalPrice < product.SuggestedRetailPrice) {
        const newItem = `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
              <img
                src="${product.Image}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.Name}</h2>
              <p> Suggested Price: ${product.SuggestedRetailPrice}</p>
              <p>Discount: ${(((product.SuggestedRetailPrice-product.FinalPrice)/product.SuggestedRetailPrice)*100).toFixed(2)}% off (-${(product.SuggestedRetailPrice-product.FinalPrice).toFixed(2)})</p></a>
              <p class="product-card__price">Final Price: ${product.FinalPrice}</p>
          </li>`
        return newItem;
    } else {
        const newItem = `<li class="product-card">
        <a href="product_pages/?product=${product.Id}">
        <img
            src="${product.Image}"
            alt="${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">${product.FinalPrice}</p></a
        >
        </li>`
        return newItem;
    }
    
    
}




export default class ProductListing {
    constructor (category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData();
        let filteredlist = list.filter(filterData);
        this.renderList(filteredlist);
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
}