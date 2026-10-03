/* =========================================
   FARM DIRECT - COMPLETE SCRIPT.JS
========================================= */


/* =========================================
   LOAD DATA
========================================= */

let products =
    JSON.parse(localStorage.getItem("products")) || [];

let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


/* =========================================
   SELECTED ITEMS
========================================= */

let selectedProductId = null;

let selectedOrderId = null;


/* =========================================
   SAVE DATA
========================================= */

function saveData() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );
}


/* =========================================
   REFRESH ALL DATA
========================================= */

function refreshData() {

    products =
        JSON.parse(
            localStorage.getItem("products")
        ) || [];


    orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    displayFarmerProducts();

    displayBuyerProducts();

    displayBuyerOrders();

    displayFarmerOrders();

    updateFarmerStats();
}


/* =========================================
   PRODUCT EMOJI
========================================= */

function getProductEmoji(name) {

    name = name.toLowerCase();


    if (name.includes("tomato")) {
        return "🍅";
    }

    if (name.includes("onion")) {
        return "🧅";
    }

    if (name.includes("potato")) {
        return "🥔";
    }

    if (name.includes("rice")) {
        return "🌾";
    }

    if (name.includes("mango")) {
        return "🥭";
    }

    if (name.includes("maize")) {
        return "🌽";
    }

    if (name.includes("kiwi")) {
        return "🥝";
    }

    if (name.includes("banana")) {
        return "🍌";
    }

    if (
        name.includes("pineapple") ||
        name.includes("pine apple")
    ) {
        return "🍍";
    }

    if (name.includes("apple")) {
        return "🍎";
    }

    if (name.includes("grape")) {
        return "🍇";
    }

    if (name.includes("orange")) {
        return "🍊";
    }

    return "🌱";
}


/* =========================================
   FARMER - ADD PRODUCT
========================================= */

const productForm =
    document.getElementById(
        "productForm"
    );


if (productForm) {

    productForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "productName"
                    )
                    .value
                    .trim();


            const category =
                document
                    .getElementById(
                        "productCategory"
                    )
                    .value;


            const quantity =
                Number(
                    document
                        .getElementById(
                            "productQuantity"
                        )
                        .value
                );


            const price =
                Number(
                    document
                        .getElementById(
                            "productPrice"
                        )
                        .value
                );


            const location =
                document
                    .getElementById(
                        "productLocation"
                    )
                    .value
                    .trim();


            const description =
                document
                    .getElementById(
                        "productDescription"
                    )
                    .value
                    .trim();


            const newProduct = {

                id: Date.now(),

                name: name,

                category: category,

                quantity: quantity,

                price: price,

                location: location,

                description: description

            };


            products.push(
                newProduct
            );


            saveData();


            productForm.reset();


            refreshData();


            showMessage(
                "Product added successfully!"
            );

        }
    );
}


/* =========================================
   FARMER - DISPLAY PRODUCTS
========================================= */

function displayFarmerProducts() {

    const container =
        document.getElementById(
            "farmerProducts"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (products.length === 0) {

        container.innerHTML = `
            <p>No products added yet.</p>
        `;

        return;
    }


    products.forEach(
        function(product) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "product-card";


            card.innerHTML = `

                <div class="product-image">
                    ${getProductEmoji(
                        product.name
                    )}
                </div>

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        Category:
                        ${product.category}
                    </p>

                    <p>
                        Available:
                        ${product.quantity} kg
                    </p>

                    <p>
                        📍 ${product.location}
                    </p>

                    <div class="product-price">
                        ₹${product.price}/kg
                    </div>

                    <p>
                        ${product.description}
                    </p>

                    <button
                        class="btn"
                        onclick="deleteProduct(${product.id})"
                    >
                        Delete
                    </button>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );
}


/* =========================================
   DELETE PRODUCT
========================================= */

function deleteProduct(id) {

    products =
        products.filter(
            function(product) {

                return (
                    product.id !== id
                );

            }
        );


    saveData();


    refreshData();


    showMessage(
        "Product deleted successfully."
    );
}


/* =========================================
   BUYER - DISPLAY PRODUCTS
========================================= */

function displayBuyerProducts(
    searchText = ""
) {

    const container =
        document.getElementById(
            "buyerProducts"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const filteredProducts =
        products.filter(
            function(product) {

                return product.name
                    .toLowerCase()
                    .includes(
                        searchText.toLowerCase()
                    );

            }
        );


    if (
        filteredProducts.length === 0
    ) {

        container.innerHTML = `

            <div class="notice">

                <h3>
                    No products available
                </h3>

                <p>
                    Farmers have not added
                    any products yet.
                </p>

            </div>

        `;

        return;
    }


    filteredProducts.forEach(
        function(product) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "product-card";


            card.innerHTML = `

                <div class="product-image">
                    ${getProductEmoji(
                        product.name
                    )}
                </div>

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        Category:
                        ${product.category}
                    </p>

                    <p>
                        Available:
                        ${product.quantity} kg
                    </p>

                    <p>
                        📍 ${product.location}
                    </p>

                    <div class="product-price">
                        ₹${product.price}/kg
                    </div>

                    <p>
                        ${product.description}
                    </p>

                    <button
                        class="btn"
                        onclick="placeOrder(${product.id})"
                    >
                        Place Order
                    </button>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );
}


/* =========================================
   BUYER SEARCH
========================================= */

const searchProduct =
    document.getElementById(
        "searchProduct"
    );


if (searchProduct) {

    searchProduct.addEventListener(
        "input",
        function() {

            displayBuyerProducts(
                searchProduct.value
            );

        }
    );
}


/* =========================================
   PLACE ORDER
   OPEN CENTER POPUP
========================================= */

function placeOrder(productId) {

    const product =
        products.find(
            function(item) {

                return (
                    item.id ===
                    productId
                );

            }
        );


    if (!product) {

        showMessage(
            "Product not found."
        );

        return;
    }


    if (product.quantity <= 0) {

        showMessage(
            "This product is out of stock."
        );

        return;
    }


    selectedProductId =
        productId;


    const productName =
        document.getElementById(
            "quantityProductName"
        );


    const quantityInput =
        document.getElementById(
            "orderQuantity"
        );


    const modal =
        document.getElementById(
            "quantityModal"
        );


    if (!modal) {

        console.error(
            "quantityModal not found in buyer.html"
        );

        return;
    }


    if (productName) {

        productName.textContent =
            product.name;
    }


    if (quantityInput) {

        quantityInput.value = "";

        quantityInput.max =
            product.quantity;
    }


    modal.style.display =
        "flex";


    if (quantityInput) {

        setTimeout(
            function() {

                quantityInput.focus();

            },
            100
        );
    }
}


/* =========================================
   CLOSE PLACE ORDER POPUP
========================================= */

function closeQuantityModal() {

    const modal =
        document.getElementById(
            "quantityModal"
        );


    if (modal) {

        modal.style.display =
            "none";
    }


    selectedProductId =
        null;
}


/* =========================================
   CONFIRM ORDER
========================================= */

function confirmOrder() {

    if (
        selectedProductId === null
    ) {
        return;
    }


    const product =
        products.find(
            function(item) {

                return (
                    item.id ===
                    selectedProductId
                );

            }
        );


    if (!product) {

        closeQuantityModal();

        showMessage(
            "Product not found."
        );

        return;
    }


    const quantityInput =
        document.getElementById(
            "orderQuantity"
        );


    const quantity =
        Number(
            quantityInput.value
        );


    /* Validate quantity */

    if (
        !quantity ||
        quantity <= 0
    ) {

        showMessage(
            "Please enter a valid quantity."
        );

        return;
    }


    /* Check available stock */

    if (
        quantity >
        product.quantity
    ) {

        showMessage(
            `Only ${product.quantity} kg is available.`
        );

        return;
    }


    /* Calculate total */

    const total =
        quantity *
        product.price;


    /* Create order */

    const newOrder = {

        id: Date.now(),

        productId:
            product.id,

        productName:
            product.name,

        quantity:
            quantity,

        price:
            product.price,

        total:
            total,

        location:
            product.location,

        status:
            "Ordered"

    };


    /* Add order */

    orders.push(
        newOrder
    );


    /* Reduce stock */

    product.quantity =
        product.quantity -
        quantity;


    /* Save everything */

    saveData();


    /* Close popup */

    closeQuantityModal();


    /* Refresh all pages/data */

    refreshData();


    /* Show website message */

    showMessage(
        `Order placed successfully! Total: ₹${total}`
    );
}


/* =========================================
   BUYER - DISPLAY ORDERS
========================================= */

function displayBuyerOrders() {

    const container =
        document.getElementById(
            "buyerOrders"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (orders.length === 0) {

        container.innerHTML = `
            <p>No orders yet.</p>
        `;

        return;
    }


    orders.forEach(
        function(order) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "order-card";


            let cancelButton = "";


            if (
                order.status === "Ordered"
            ) {

                cancelButton = `

                    <br>

                    <button
                        class="btn"
                        onclick="cancelOrder(${order.id})"
                    >
                        Cancel Order
                    </button>

                `;
            }


            card.innerHTML = `

                <h3>
                    📦 ${order.productName}
                </h3>


                <p>
                    Quantity:
                    ${order.quantity} kg
                </p>


                <p>
                    Price:
                    ₹${order.price}/kg
                </p>


                <p>
                    Total:
                    <strong>
                        ₹${order.total}
                    </strong>
                </p>


                <span class="status">
                    ${order.status}
                </span>


                ${cancelButton}

            `;


            container.appendChild(
                card
            );

        }
    );
}


/* =========================================
   CANCEL ORDER
   OPEN CENTER POPUP
========================================= */

function cancelOrder(orderId) {

    const order =
        orders.find(
            function(item) {

                return (
                    item.id ===
                    orderId
                );

            }
        );


    if (!order) {
        return;
    }


    selectedOrderId =
        orderId;


    const productName =
        document.getElementById(
            "cancelProductName"
        );


    const modal =
        document.getElementById(
            "cancelModal"
        );


    if (!modal) {

        console.error(
            "cancelModal not found in buyer.html"
        );

        return;
    }


    if (productName) {

        productName.textContent =
            `Do you want to cancel your ${order.productName} order?`;
    }


    /* SHOW CENTER OVERLAY */

    modal.style.display =
        "flex";
}


/* =========================================
   CLOSE CANCEL POPUP
========================================= */

function closeCancelModal() {

    const modal =
        document.getElementById(
            "cancelModal"
        );


    if (modal) {

        modal.style.display =
            "none";
    }


    selectedOrderId =
        null;
}


/* =========================================
   CONFIRM CANCEL ORDER
========================================= */

function confirmCancelOrder() {

    if (
        selectedOrderId === null
    ) {
        return;
    }


    const order =
        orders.find(
            function(item) {

                return (
                    item.id ===
                    selectedOrderId
                );

            }
        );


    if (!order) {

        closeCancelModal();

        return;
    }


    /* Find original product */

    const product =
        products.find(
            function(item) {

                return (
                    item.id ===
                    order.productId
                );

            }
        );


    /* Return cancelled quantity */

    if (product) {

        product.quantity +=
            Number(order.quantity);
    }


    /* Remove order */

    orders =
        orders.filter(
            function(item) {

                return (
                    item.id !==
                    selectedOrderId
                );

            }
        );


    /* Save updated data */

    saveData();


    /* Close popup */

    closeCancelModal();


    /* Refresh everything */

    refreshData();


    /* Website message */

    showMessage(
        "Order cancelled successfully."
    );
}


/* =========================================
   FARMER - DISPLAY ORDERS
========================================= */

function displayFarmerOrders() {

    const container =
        document.getElementById(
            "farmerOrders"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (orders.length === 0) {

        container.innerHTML = `
            <p>
                No orders received yet.
            </p>
        `;

        return;
    }


    orders.forEach(
        function(order) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "order-card";


            card.innerHTML = `

                <h3>
                    📦 ${order.productName}
                </h3>


                <p>
                    Quantity:
                    ${order.quantity} kg
                </p>


                <p>
                    Price:
                    ₹${order.price}/kg
                </p>


                <p>
                    Sale Amount:
                    <strong>
                        ₹${order.total}
                    </strong>
                </p>


                <p>
                    📍 ${order.location}
                </p>


                <span class="status">
                    ${order.status}
                </span>

            `;


            container.appendChild(
                card
            );

        }
    );
}


/* =========================================
   FARMER STATISTICS
========================================= */

function updateFarmerStats() {

    const totalProducts =
        document.getElementById(
            "totalProducts"
        );


    const totalOrders =
        document.getElementById(
            "totalOrders"
        );


    const totalSales =
        document.getElementById(
            "totalSales"
        );


    /* Total products */

    if (totalProducts) {

        totalProducts.textContent =
            products.length;
    }


    /* Total orders */

    if (totalOrders) {

        totalOrders.textContent =
            orders.length;
    }


    /* Total sales */

    if (totalSales) {

        const sales =
            orders.reduce(
                function(total, order) {

                    return (
                        total +
                        Number(order.total)
                    );

                },
                0
            );


        totalSales.textContent =
            sales;
    }
}


/* =========================================
   CUSTOM WEBSITE MESSAGE
   NO BROWSER ALERT
========================================= */

function showMessage(message) {

    const oldMessage =
        document.getElementById(
            "siteMessage"
        );


    if (oldMessage) {

        oldMessage.remove();
    }


    const messageBox =
        document.createElement(
            "div"
        );


    messageBox.id =
        "siteMessage";


    messageBox.innerHTML = `

        <div class="site-message-box">

            <span>
                ${message}
            </span>

            <button
                onclick="
                    document
                    .getElementById('siteMessage')
                    .remove()
                "
            >
                ×
            </button>

        </div>

    `;


    document.body.appendChild(
        messageBox
    );


    setTimeout(
        function() {

            const currentMessage =
                document.getElementById(
                    "siteMessage"
                );


            if (currentMessage) {

                currentMessage.remove();
            }

        },
        3000
    );
}


/* =========================================
   CLOSE PLACE ORDER POPUP
   WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener(
    "click",
    function(event) {

        const quantityModal =
            document.getElementById(
                "quantityModal"
            );


        if (
            quantityModal &&
            event.target ===
            quantityModal
        ) {

            closeQuantityModal();
        }

    }
);


/* =========================================
   CLOSE CANCEL POPUP
   WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener(
    "click",
    function(event) {

        const cancelModal =
            document.getElementById(
                "cancelModal"
            );


        if (
            cancelModal &&
            event.target ===
            cancelModal
        ) {

            closeCancelModal();
        }

    }
);


/* =========================================
   ESC KEY CLOSE POPUPS
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeQuantityModal();

            closeCancelModal();
        }

    }
);


/* =========================================
   PAGE LOAD
========================================= */

refreshData();


/* =========================================
   REFRESH WHEN TAB GETS FOCUS
========================================= */

window.addEventListener(
    "focus",
    function() {

        refreshData();

    }
);


/* =========================================
   REFRESH WHEN LOCAL STORAGE CHANGES
   Useful for Farmer + Buyer tabs
========================================= */

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key === "products" ||
            event.key === "orders"
        ) {

            refreshData();
        }

    }
);