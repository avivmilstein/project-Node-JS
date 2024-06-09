const express = require("express");
const db = require("mongoose");
const bp = require("body-parser");
const app = express();


app.use(bp.json());
app.use(express.static("client"));


db.connect(
  "mongodb+srv://avivMilshtein:aviv158342@cluster0.czojuc8.mongodb.net/svshop"
);


const userSchema = db.Schema({
  username: String,
  email: String,
  password: String,
});

const productsSchema = db.Schema({
  name: String,
  price: Number,
});

const ordersPendingSchema = db.Schema({
  name: String,
  price: Number,
});

const usersModel = db.model("users", userSchema);
const productModel = db.model("products", productsSchema);
const ordersPendingModel = db.model("orders", ordersPendingSchema);

app.get("/home", function (req, res) {
  res.sendFile(`${__dirname}/client/home.html`);
});

app.post("/home", async (req, res) => {
  let registeredUser = await usersModel.find({
    email: req.body.email,
    password: req.body.password,
  });
  if (registeredUser.length > 0) {
    return res.status(200).json({ message: "Welcome" });
  } else {
    return res.status(404).json({ error: "Need to sign up first." });
  }
});

app.get("/signup", function (req, res) {
  res.sendFile(`${__dirname}/client/signup.html`);
});

app.post("/signup", async (req, res) => {
  let usedEmail = "";
  const user = {
    username: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(user)
  try {
    usedEmail = await usersModel.findOne({ email: req.body.email });
    if (usedEmail) {
      return res
        .status(400)
        .json({ error: "Error, The email is already exsist." });
    }
    await usersModel.create(user);
    return res.json({ message: "User created successfully" });
  } catch {
    console.error(error);
  }
});

app.get("/products", function (req, res) {
  res.sendFile(`${__dirname}/client/products.html`);
});

app.get("/buy", function (req, res) {
  res.sendFile(`${__dirname}/client/payment.html`);
});

app.get('/add', async (req, res) => {
  try {
    const allProducts = await productModel.find();
    res.json(allProducts);
    console.log(allProducts)
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching products from the database');
  }
});

app.listen(3000, () => {
  console.log("Server is on: 3000");

  
});


const products = [
  { name: "Computer", price: 3000 },
  { name: "TV", price: 4500 },
  { name: "Microwave", price: 400 },
  { name: "Iphone", price: 2500 },
  { name: "Watch", price: 1500 },
  { name: "Headphones", price: 2200 },
  { name: "Coffee machine", price: 12000 },
  { name: "Oven", price: 1500 },
  { name: "Fridge", price: 5400 },
  { name: "Dryer machine", price: 3560 }
];

//This is how i put the products in the dataBase.

// app.get('/add', async (req, res) => {
//   try {
//     await productModel.insertMany(products);
//     res.send('Products added to the database');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error adding products to the database');
//   }
// });



