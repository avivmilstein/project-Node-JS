const sendToRegisteration = () => (window.location.pathname = "/signup");

async function sendData() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  sessionStorage.setItem("email", email);

  let res = await fetch(`/home`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  
  if (res.status === 200) {
    window.location.pathname = "/products";
  } else {
    let data = await res.json();
    alert(data.error);
  }
}