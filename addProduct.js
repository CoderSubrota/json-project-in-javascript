//get input feild data 
let productName = document.querySelector("#productName") ;
let brandName = document.querySelector("#brandName") ;
let productPrice = document.querySelector("#productPrice") ;
let productColor = document.querySelector("#productColor") ;
let productImage = document.querySelector("#productImage") ;
let addProduct = document.querySelector(".addProduct") ;
//
let productsContainer = document.querySelector(".products-container");


//get products
async function getProducts(){
 try {
    let res = await fetch("data.json") ;
    let data = await res.json() ;
    displayProducts(data.products) ;
 } catch (error) {
    console.error(error) ;
 }
}
getProducts() ;
//add 
let storeData=[];
//display products
let getSize = 0;

function showProducts (storeData) {
   storeData.map((item) => {
      productsContainer.innerHTML = productsContainer.innerHTML + `
      <div class="product">
      <img src="${item.image}" alt="${item.productName}" class="productImage"/>
      <p> Product id : ${item.id} </p>
      <p> Product name : ${item.productName} </p>
      <p> Brand name : ${item.brandName} </p>
      <p> Product price : ${item.price} </p>
      <p> Product color : ${item.color} </p>
      </div>
     ` ;
  }) ;
}

function displayProducts(products){
    //store data
     getSize=products.length;
     storeData = products ;
     showProducts(storeData) ;
    }


    
//add product
addProduct.addEventListener("click",function(){
if(productName.value==="" || brandName.value==="" ||productPrice.value==="" || productColor.value ==="" || productImage.value==="" )
{
   return alert("Please fill up each product information !!");
}
   getSize++;
   let product = {
       id:getSize,
       productName:productName.value ,
       brandName:brandName.value ,
       price:productPrice.value ,
       color:productColor.value ,
       image:productImage.value
   }
    storeData.unshift(product) ;
    productsContainer.innerHTML="";
    showProducts(storeData);
    alert("Your product is added successfully !!") ;
   }) ;

   

    
