const express = require("express");
const app = express();


app.use(express.static("client"));

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/client/home.html`);
});

app.get("/signup", function (req, res) {
  res.sendFile(`${__dirname}/client/signup.html`);
});

app.get("/products", function (req, res) {
  res.sendFile(`${__dirname}/client/products.html`);
});

app.get("/buy", function (req, res) {
  res.sendFile(`${__dirname}/client/payment.html`);
});


app.listen(3000, () => {
  console.log("Server is on: 3000");
});
