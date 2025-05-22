import {products} from './products.js';

document.addEventListener("DOMContentLoaded", () => {

      const categories = document.querySelectorAll("#products > div");
  
      categories.forEach(category => {

          const clickableDiv = category.children[0]; 
          const productDiv = category.children[1]; 
  
          productDiv.style.display = "none";
  
          clickableDiv.addEventListener("click", () => {
              productDiv.style.display = (productDiv.style.display === "none") ? "block" : "none";
          });
      });
  });



let productsHTML ='';

products.forEach((products) => {
    productsHTML  += `
                    <div id="box1">
                                    <div id="imagediv">
                                                <img src="${products.image}" alt="" srcset=""  id="images">
                                    </div>
                                    <div id="details">
                                          <p>${products.name}</p>
                                          <p>price : ksh ${products.priceCents}</p>
                                    </div>
                                    <div id="addcart">
                                          <button type="button"  id="addcartbutton">add to cart</button>
                                    </div>
                              </div>
        `;   
     });
document.querySelector('.js-product-grid').innerHTML = productsHTML;