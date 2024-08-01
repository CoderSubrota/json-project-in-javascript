//get input feild data
let productName = document.querySelector("#productName");
let brandName = document.querySelector("#brandName");
let productPrice = document.querySelector("#productPrice");
let productColor = document.querySelector("#productColor");
let productImage = document.querySelector("#productImage");
let editProduct = document.querySelector(".editProduct");
let editForm = document.querySelector(".editForm");
let ProductCountDisplay = document.querySelector("#ProductCount");
editForm.style.display="none" ;
//
let productsContainer = document.querySelector(".products-container");

//get data
async function getData() {
  try {
    let res = await fetch("data.json");
    let data = await res.json();
    displayData(data.products);
    ProductCountDisplay.innerText = data.products.length ;
  } catch (error) {
    console.error(error);
  }
}

getData();
//store data
let storeData = [];

//display data
function displayData(products) {
  storeData = products;

  storeData.map((item) => {
    productsContainer.innerHTML =
      productsContainer.innerHTML +
      `
        <div class="product">
        <img src="${item.image}" alt="${item.productName}" class="productImage"/>
        <p> Product id : ${item.id} </p>
        <p> Product name : ${item.productName} </p>
        <p> Brand name : ${item.brandName} </p>
        <p> Product price : ${item.price} </p>
        <p> Product color : ${item.color} </p>
        <div class="editAndDeleteButton">
             <a href="#editForm">
          <button class="editButton" onclick="dispalyValueOfProduct(${item.id})">Edit</button>
           </a>
        <button class="deleteButton" onclick="deleteProduct(${item.id})">Delete</button>
      </div>
        </div>
       `;
  });
}  

let productCount;
// delete product
function deleteProduct(id) {
    productCount = storeData.length ;
  let confirm = window.confirm("Are you want to delete this product ??");
  if (confirm) {
    let newProducts = storeData.filter((item) => item.id !== id);
    productsContainer.innerHTML = "";
    displayData(newProducts);

    productCount+=-1;
    ProductCountDisplay.innerText = productCount ;
  } else {
    alert("Your product is safe : )");
  }
}
//display value into the product form
let getId = 0 ;
function dispalyValueOfProduct(id) {
 getId = id ;
  let product = storeData.find((item) => item.id === id);
  productName.value = product.productName;
  brandName.value = product.brandName;
  productPrice.value = product.price;
  productColor.value = product.color;
  productImage.value = product.image;
  editForm.style.display="block" ;
}

//save edited products


document.querySelector(".editProduct").addEventListener("click", function() {
      let products = storeData.filter((item) => item.id !== getId) ;
      let productObject = {
        id:getId,
        productName:productName.value ,
        brandName:brandName.value ,
        price:productPrice.value ,
        color:productColor.value ,
        image:productImage.value
    }
    
      let newUpdatedProduct = [productObject,...products]
      productsContainer.innerHTML = "" ;
      displayData(newUpdatedProduct) ;
      editForm.style.display="none" ;
})