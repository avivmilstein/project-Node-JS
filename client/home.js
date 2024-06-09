const sendToRegisteration = () => (window.location.pathname = "/signup");

async function sendData() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  let res = await fetch(`/home`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  let data = await res.json();
  if (data.error) {
    alert(data.error)
  } else {
    window.location.pathname = "/products";
  }
}
