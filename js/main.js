/* PRODUCTS */
const products = [
    //Repuestos
    {
        id: "repuesto01",
        title: "Repuesto 01",
        image: "http://placekitten.com/300/400?image=1",
        category: {
            name: "Repuestos",
            id: "repuestos"
        },
        price: 1000
    },

    {
        id: "repuesto02",
        title: "Repuesto 02",
        image: "http://placekitten.com/300/400?image=2",
        category: {
            name: "Repuestos",
            id: "repuestos"
        },
        price: 1000
    },

    {
        id: "repuesto03",
        title: "Repuesto 03",
        image: "http://placekitten.com/300/400?image=3",
        category: {
            name: "Repuestos",
            id: "repuestos"
        },
        price: 1000
    },

    {
        id: "repuesto04",
        title: "Repuesto 04",
        image: "http://placekitten.com/300/400?image=4",
        category: {
            name: "Repuestos",
            id: "repuestos"
        },
        price: 1000
    },

    {
        id: "repuesto05",
        title: "Repuesto 05",
        image: "http://placekitten.com/300/400?image=5",
        category: {
            name: "Repuestos",
            id: "repuestos"
        },
        price: 1000
    },

    //Accesorios
    {
        id: "accesorio01",
        title: "Accesorio 01",
        image: "http://placekitten.com/300/400?image=10",
        category: {
            name: "Accesorios",
            id: "accesorios"
        },
        price: 1000
    },

    {
        id: "accesorio02",
        title: "Accesorio 02",
        image: "http://placekitten.com/300/400?image=10",
        category: {
            name: "Accesorios",
            id: "accesorios"
        },
        price: 1000
    },

    {
        id: "accesorio03",
        title: "Accesorio 03",
        image: "http://placekitten.com/300/400?image=10",
        category: {
            name: "Accesorios",
            id: "accesorios"
        },
        price: 1000
    },

    {
        id: "accesorio04",
        title: "Accesorio 04",
        image: "http://placekitten.com/300/400?image=10",
        category: {
            name: "Accesorios",
            id: "accesorios"
        },
        price: 1000
    },

    {
        id: "accesorio05",
        title: "Accesorio 05",
        image: "http://placekitten.com/300/400?image=10",
        category: {
            name: "Accesorios",
            id: "accesorios"
        },
        price: 1000
    }
];


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
                        <img src="${product.image}" alt="${product.title}">
                            <div class="info">
                                <h3 class="p-title">${product.title}</h3>
                                <p class="p-price">${product.price}</p>
                                <button class="p-add" id="${product.id}">Agregar</button>
                            </div>
                        `
                       
                        prodContainer.append(div);                    
    })

    updBtn();
    console.log(pAdd);
}

loadProducts(products);

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

