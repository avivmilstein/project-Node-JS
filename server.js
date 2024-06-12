const express = require("express");
const session = require("express-session");
const db = require("mongoose");
const bp = require("body-parser");
const app = express();

app.use(bp.json());
app.use(express.static("client"));
app.use(
  session({
    secret: "1234567",
    resave: false,
    saveUninitialized: true,
  })
);

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
  username: String,
  listProducts: Array,
});

const usersModel = db.model("users", userSchema);
const productModel = db.model("products", productsSchema);
const ordersPendingModel = db.model("orders", ordersPendingSchema);

app.get("/home", function (req, res) {
  res.sendFile(`${__dirname}/client/home.html`);
});

app.post("/home", async (req, res) => {
  try {
    const { email, password } = req.body;
    let registeredUser = await usersModel.findOne({
      email: email,
      password: password,
    });

    if (registeredUser !== null) {
      req.session.user = registeredUser;
      res.redirect("/products");
    } else {
      res.status(401).json({ error: "Need to sign up first." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/signup", function (req, res) {
  res.sendFile(`${__dirname}/client/signup.html`);
});

app.post("/signup", async (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    let usedEmail = await usersModel.findOne({ email: req.body.email });
    if (usedEmail) {
      return res
        .status(400)
        .json({ error: "Error, The email is already exsist." });
    }
    await usersModel.create(user);
    req.session.username = req.body.username;
    return res.json({ message: "User created successfully" });
  } catch {
    console.error(error);
  }
});

app.get("/products", ensureLoggedIn, function (req, res) {
  if (req.session && req.session.user) {
    res.sendFile(`${__dirname}/client/products.html`);
  } else {
    res.redirect("/home");
  }
});

app.get("/buy", ensureLoggedIn, function (req, res) {
  res.sendFile(`${__dirname}/client/payment.html`);
});

app.post("/buy", async (req, res) => {
  try {
    const { selectedProducts, email } = req.body;
    const user = await usersModel.findOne({ email: email });
    const username = user.username;
    console.log(username);
    console.log(selectedProducts);
    const order = {
      username: username,
      listProducts: selectedProducts,
    };
    await ordersPendingModel.create(order);
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.end();
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/add", async (req, res) => {
  try {
    const allProducts = await productModel.find();
    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products from the database");
  }
});


app.get("/all", accessToPage, async (req, res) => {
  try {
    const allOrders = await ordersPendingModel.find();
    res.json(allOrders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching orders from the database");
  }
});

function ensureLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/home");
  }
}

function accessToPage(req, res, next) {
  if (req.query.admin == "true") next();
  else {
    res.status(400).json({ error: "NO ACCESS!" });
  }
}

app.listen(3000, () => {
  console.log("Server is on: 3000");
});

// const products = [
//   { name: "Computer", price: 3000 },
//   { name: "TV", price: 4500 },
//   { name: "Microwave", price: 400 },
//   { name: "Iphone", price: 2500 },
//   { name: "Watch", price: 1500 },
//   { name: "Headphones", price: 2200 },
//   { name: "Coffee machine", price: 12000 },
//   { name: "Oven", price: 1500 },
//   { name: "Fridge", price: 5400 },
//   { name: "Dryer machine", price: 3560 }
// ];

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
