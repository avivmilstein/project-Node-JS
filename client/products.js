async function fetchProducts() {
  try {
    const response = await fetch("/add");
    const data = await response.json();
    let allProducts = data;

    allProducts.forEach((product) => {
      const mainDiv = document.getElementById("products");
      const productButton = document.createElement("button");
      productButton.textContent = ` ${product.name}, ${product.price}₪`;
      // productButton.className = "product-button";
      productButton.setAttribute("class", "product-button")
      productButton.dataset.price = product.price;
      mainDiv.append(productButton);
      mainDiv.append(document.createElement("br"));
      mainDiv.append(document.createElement("br"));

      productButton.addEventListener("click", handleProductClick);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchProducts();

let total = 0
let productCount = 0;
let selectedProducts = [];


function handleProductClick(event) {
  const selectedPrice = parseFloat(event.target.dataset.price); 
  const productName = event.target.textContent.trim();
  total += selectedPrice;
  productCount++
  selectedProducts.push(productName);

  localStorage.setItem('total', total);
  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  localStorage.setItem('productCount', productCount);

  // console.log("All Selected Products:", selectedProducts);
  // console.log("Total Price:", total, "₪");
  // console.log("Total Amount of Products:", productCount);
}

const productButtons = document.querySelectorAll(".product-button");
productButtons.forEach(button => {
  button.addEventListener("click", handleProductClick);
});


function sortByName() {
  const mainDiv = document.getElementById("products");
  const buttons = Array.from(mainDiv.querySelectorAll(".product-button"));
  buttons.sort((a, b) => {
    const nameA = a.textContent.split(",")[0];
    const nameB = b.textContent.split(",")[0];
    return nameA.localeCompare(nameB);
  });
  mainDiv.innerHTML = "";
  buttons.forEach((button, index) => {
    mainDiv.appendChild(button);
    if (index < buttons.length - 1) {
      mainDiv.appendChild(document.createElement("br"));
      mainDiv.appendChild(document.createElement("br"));
    }
  });
}

function sortByPrice() {
  const mainDiv = document.getElementById("products");
  const buttons = Array.from(mainDiv.querySelectorAll(".product-button"));
  buttons.sort((a, b) => {
    const priceA = parseFloat(a.textContent.split(",")[1]);
    const priceB = parseFloat(b.textContent.split(",")[1]);
    return priceA - priceB;
  });
  mainDiv.innerHTML = "";
  buttons.forEach((button, index) => {
    mainDiv.appendChild(button);
    if (index < buttons.length - 1) {
      mainDiv.appendChild(document.createElement("br"));
      mainDiv.appendChild(document.createElement("br"));
    }
  });
}

document.getElementById("sortBtn").addEventListener("click", function () {
  const sortBy = document.getElementById("serchOptions").value;
  if (sortBy === "name") {
    sortByName();
  } else if (sortBy === "price") {
    sortByPrice();
  }
});

function filterProducts() {
  const filterValue = document.getElementById("filterInput").value.toLowerCase();
  if (filterValue === "") {
    fetchProducts();
    return;
  }
  const mainDiv = document.getElementById("products");
  const buttons = Array.from(mainDiv.querySelectorAll(".product-button"));
  mainDiv.innerHTML = '';

  const filteredButtons = buttons.filter(button => {
    const productName = button.textContent.toLowerCase();
    return productName.includes(filterValue);
  });

  filteredButtons.forEach((button, index) => {
    mainDiv.appendChild(button);
    if (index < filteredButtons.length - 1) {
      mainDiv.appendChild(document.createElement("br"));
      mainDiv.appendChild(document.createElement("br"));
    }
  });
}

document.getElementById("filterInput").addEventListener("input", filterProducts);

const sendToPayment = () => (window.location.pathname = "/buy");


