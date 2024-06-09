const total = localStorage.getItem("total");
const amountOfProducts = localStorage.getItem("productCount");
const selectedProductsString = localStorage.getItem("selectedProducts");
const selectedProducts = JSON.parse(selectedProductsString);

function addingClientDetails() {
  const detailsDiv = document.getElementById("detailsToClient");
  const productsAmountDiv = document.createElement("h4");
  const totalAmountDiv = document.createElement("h4");
  productsAmountDiv.textContent = `Total products: ${amountOfProducts}`;
  totalAmountDiv.textContent = `Total price is : ${total} ₪`;
  productsAmountDiv.classList.add("product-details");
  totalAmountDiv.classList.add("product-details");
  detailsDiv.appendChild(productsAmountDiv);
  detailsDiv.appendChild(totalAmountDiv);
}

addingClientDetails();
