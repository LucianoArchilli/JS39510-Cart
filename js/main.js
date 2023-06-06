let products = [];

fetch("../json/productos.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        loadProducts(products);
    })

const prodContainer = document.getElementById("prodContainer");
const btnFilter = document.getElementsByClassName("btn-filter");
const title = document.getElementById("title");
let pAdd = document.getElementsByClassName("p-add");
const meter = document.getElementById("meter");

function loadProducts(selectedProd) {

    prodContainer.innerHTML = "";

    selectedProd.forEach(product => {

        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
                        <img class="p-img" src="${product.image}" alt="${product.title}">
                            <div class="info">
                                <h3 class="p-title">${product.title}</h3>
                                <p class="p-price">$${product.price}</p>
                                <button class="p-add" id="${product.id}">Agregar</button>
                            </div>
                        `
                       
                        prodContainer.append(div);                    
    })

    updBtn();
    console.log(pAdd);
}



Array.from(btnFilter).forEach(button => {
    button.addEventListener("click", (e)=> {
        
        Array.from(btnFilter).forEach(button => button.classList.remove("active"))
        e.currentTarget.classList.add("active");


        if (e.currentTarget.id != "all") {
            const pCategory = products.find(product => product.category.id === e.currentTarget.id);
            title.innerText = pCategory.category.name;
            const selectedBtn = products.filter(product => product.category.id === e.currentTarget.id);
        loadProducts(selectedBtn);
        } else {
            title.innerText = "Todos los productos"
            loadProducts(products);
        }
        
    })
});


function updBtn() {
    pAdd = document.getElementsByClassName("p-add");

    Array.from(pAdd).forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

let loadedProd;
const loadedProdLs = JSON.parse(localStorage.getItem("in-cart-products"));
if(loadedProdLs) {
    loadedProd = loadedProdLs
    updMeter();
} else {
    loadedProd = []
}



function addToCart(e) {

    Toastify({
        text: "Producto Agregado",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #222ba8, #060c64)",
          borderRadius: "1.5rem",
        },
        onClick: function(){}
      }).showToast();


    const idBtn = e.currentTarget.id;
    const addedProd = products.find(product => product.id === idBtn);

    if(loadedProd.some(product => product.id === idBtn)) {
        const index = loadedProd.findIndex(product => product.id === idBtn);
        loadedProd[index].quantity++;
    }
    else {
        addedProd.quantity = 1;
        loadedProd.push(addedProd);
    }

    updMeter();

    localStorage.setItem("in-cart-products", JSON.stringify(loadedProd));
};

function updMeter() {
    let uptdMeter = loadedProd.reduce((acc, product) => acc + product.quantity, 0);
    meter.innerText = uptdMeter;
}

