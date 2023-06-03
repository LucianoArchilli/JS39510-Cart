const loadedProd = JSON.parse(localStorage.getItem("in-cart-products"));

const blankCart = document.getElementById("blank-cart");
const cartCom = document.getElementById("cart-com");
const cartEvents = document.getElementById("cart-events");
let cartErase = document.getElementsByClassName("cart-erase");
const emptyCartBtn = document.getElementById("empty-cart");
const buyCartBtn = document.getElementById("buy-cart");
const cartTotal = document.getElementById("total");


function loadCart() {
    if (loadedProd) {

        blankCart.classList.add("disabled");
        cartCom.classList.remove("disabled");
        cartEvents.classList.remove("disabled");
    
        cartCom.innerHTML = "";
    
        loadedProd.forEach(product => {
    
            const div = document.createElement("div");
            div.classList.add("cart-prod");
            div.innerHTML = `
                            <img class="cart-img" src="${product.image}" alt="${product.title}">
                            <div class="cart-name">
                                <p>Título</p>
                                <h3>${product.title}</h3>
                            </div>
                            <div class="cart-quan">
                                <p>Cantidad</p>
                                <h4>${product.quantity}</h4>
                            </div> 
                            <div class="cart-price">
                                <p>Precio</p>
                                <h4>$${product.price}</h4>
                            </div>
                            <div class="cart-tot">
                                <p>Subtotal</p>
                                <h4>$${product.price * product.quantity}</h4>
                            </div>
                            <button class="cart-erase" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
                        `;
    
                        cartCom.append(div);
        })
    
    } else {
        blankCart.classList.remove("disabled");
        cartCom.classList.add("disabled");
        cartEvents.classList.add("disabled");
    }

    eraseBtn();
    updTotal();
}

loadCart();


function eraseBtn() {
    cartErase = document.getElementsByClassName("cart-erase");

    Array.from(cartErase).forEach(button => {
        button.addEventListener("click", eraseFromCart);
    });
}

function eraseFromCart(e) {
    const idButton = e.currentTarget.id;
    const index = loadedProd.findIndex(product => product.id === idButton);


    loadedProd.splice(index, 1);

    loadCart();

    localStorage.setItem("in-cart-products", JSON.stringify(loadedProd));
}

emptyCartBtn.addEventListener("click", emptyCart);

function emptyCart() {
    loadedProd.length = 0;
    localStorage.setItem("in-cart-products", JSON.stringify(loadedProd));
    loadCart();
    
}

function updTotal() {
    const cartTotal = loadedProd.reduce((acc, product) => acc + (product.price * product.quantity), 0); 
    total.innerText = `${cartTotal}`;
}


buyCartBtn.addEventListener("click", buyCart);

function buyCart() {
    loadedProd.length = 0;
    localStorage.setItem("in-cart-products", JSON.stringify(loadedProd));
    loadCart();
    
}