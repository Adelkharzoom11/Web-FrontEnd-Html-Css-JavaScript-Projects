


var productDataApi=[]
  let dataList = [];
 fetch("https://api.escuelajs.co/api/v1/products")
        .then((resp) => {return resp.json();})
        .then((data)=> 
        {
          for (let i = 0; i < data.length; i++) {
            productDataApi.push({ id:data[i].id,title: data[i].title,price:data[i].price,images:data[i].images[0] });
          
          }
          console.log(productDataApi);
          disp();
        }).catch(err=>{
          console.log(err)
        });


 categories=[]
function disp(){
  
       categories = [
        ...new Set(
          productDataApi.map((item) => {
            return item;
          })
        ),
      ];
      let i = 0;
      document.getElementById("root").innerHTML = categories
        .map((item) => {
          var {images, title, price } = item;
          return (
            ` <div class='box'>
                              <div class='img-box'>
                                  <img class='images' src=${images}></img>
                              </div>
                              <div class='bottom'>
                                  <p>${title}</p>
                                  <h2>$${price}.00</h2>` +
            "<button onclick='addtocart (" +
            (i++) +
            ")'>Add to cart</button>" +
            `
                              </div>
                            </div>
                        `
          );
        })
        .join("");
       // displaycart();




}



var cart =[];



function displaycart() {
  let j = 0;
  let total = 0;
  document.getElementById("count").innerHTML = cart.length;
  if (cart.length == 0) {
    document.getElementById(" cartItem").innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$ " + 0 + ".00";
  } else {
             total = total + 170;
            document.getElementById("total").innerHTML = "$ " + total + ".00";
    document.getElementById(" cartItem").innerHTML = cart
      .map((items) => {
        var { images, title, price } = items;

        return (
          ` <div class=' cart-item'>
                        <div class= 'row-img' >
                        <img class='rowimg' src=${images} >
                        </div> I
                        <p style='font-size : 12px; '>${title} </p>
                        <h2 style='font-size: 15px; '>$ ${price}.00</h2>` +
          "<i class='fa-solid fa-trash' onclick='delElement (" +
         ( j++) +
          ")'></i></div> "
        );
      })
      .join("");

      
  }
}


// add to cart
function addtocart(a) {
  cart.push({...categories[a]});
  displaycart();
}

// delet feom cart
function delElement(a){
    cart.splice(a,1) ;
    displaycart();
}



























