const total = localStorage.getItem("total");
const amountOfProducts = localStorage.getItem("productCount");

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

document.getElementById("toBuyBtn").addEventListener("click", async () => {
  const total = localStorage.getItem("total");
  const amountOfProducts = localStorage.getItem("productCount");
  const selectedProductsString = localStorage.getItem("selectedProducts");
  const selectedProducts = JSON.parse(selectedProductsString);
  const email = sessionStorage.getItem("email");
  
 
  const orderDetails = {
    total: total,
    amountOfProducts: amountOfProducts,
    selectedProducts: selectedProducts,
    email: email,
  };
  
 
  try {
    const response = await fetch("/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    });


    if (response.ok) {
      sessionStorage.clear();
      window.location.pathname = "/home";
    } else {
      console.error("Failed to submit order");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

