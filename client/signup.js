const sendData = async () => {
  const username = document.getElementById("userNameInput").value;
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  try {
    if (username.length < 3)  return alert(`Error, The username must be above 3 characters`);
    if (!email.includes("@")) return alert("@ is missing");
    if (password.length < 3 || password.length > 8) return alert("password length need to be between 3-8");

    let res = await fetch(`/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    let data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      alert(data.message);
      sessionStorage.setItem("username", username);
      window.location.pathname = "/home";
    }
  } catch (error) {
    console.error(error);
  }
};


