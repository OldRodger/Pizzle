import express from "express";
import mongoose from "mongoose";
import shopRoutes from "./src/routes/shop.js";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";
import flash from "connect-flash";

const PORT = 8000;
const DB_URI =
  "mongodb+srv://kvngcelestine007:pizzle@pizzle.jvqlqmx.mongodb.net/?retryWrites=true&w=majority&appName=Pizzle";

const app = express();
const MongoStore = ConnectMongoDBSession(session);
const store = new MongoStore({
  uri: DB_URI,
  collection: "session",
});

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use("/static", express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "session secret",
    saveUninitialized: false,
    resave: false,
    store: store,
  }),
);
app.use(flash());

app.use(shopRoutes);

(async function () {
  try {
    await mongoose.connect(DB_URI);
    console.log("Mongoose Connected!!");
    startApp();
  } catch (error) {
    console.error(error.message);
  }
})();

function startApp() {
  app.listen(PORT, function () {
    console.log(`App started on: http://localhost:${PORT}`);
  });
}

/**
 * const products = [
  {
    imageUrl:
      "https://evro.themescare.com/themes/pizze-item/assets/img/pizza_slide_1.png",
    title: "santa fe pizza",
    price: 24.12,
    sides: ["chicken breast", "cheddar wrapped in a crispy"],
    category: "pizzas",
  },
  {
    imageUrl:
      "https://evro.themescare.com/themes/pizze-item/assets/img/pizza_slide_3.png",
    title: "chocolate donuts",
    price: 29.7,
    sides: ["chicken breast", "cheddar wrapped in a crispy"],
    category: "pizzas",
  },
  {
    imageUrl:
      "https://evro.themescare.com/themes/pizze-item/assets/img/pizza_slide_4.png",
    title: "super sicilian",
    price: 22.4,
    sides: ["chicken breast", "cheddar wrapped in a crispy"],
    category: "pizzas",
  },
  {
    imageUrl:
      "https://evro.themescare.com/themes/pizze-item/assets/img/juice_3.png",
    title: "coke soft drinks",
    price: 12.8,
    sides: ["chicken breast", "cheddar wrapped in a crispy"],
    category: "drinks",
  },
  {
    imageUrl:
      "https://evro.themescare.com/themes/pizze-item/assets/img/juice_2.png",
    title: "orange spice juice",
    price: 14.4,
    sides: ["orange", "spice cheddar & masala"],
    category: "drinks",
  },
  {
    imageUrl:
      "https://evro.themescare.com/themes/pizze-item/assets/img/juice_1.png",
    title: "lemon juice",
    price: 8.2,
    sides: ["orange", "cheddar wrapped in a masala"],
    category: "drinks",
  },
  {
    imageUrl:
      "https://evro.themescare.com/themes/pizze-item/assets/img/salad_1.png",
    title: "greek salad",
    price: 7.4,
    sides: ["vegetable", "tomato", "etc..."],
    category: "salads",
  },
  {
    imageUrl:
      "https://evro.themescare.com/themes/pizze-item/assets/img/pasta.png",
    title: "bolognese pasta",
    price: 52.1,
    sides: ["sauce", "spicy", "chicken breast"],
    category: "pasta",
  },
  {
    imageUrl:
      "https://evro.themescare.com/themes/pizze-item/assets/img/burgur-1.png",
    title: "black hamburger",
    price: 32.9,
    sides: ["chicken breast cheddar wrapped in a crispy"],
    category: "burgers",
  },
  {
    imageUrl:
      "https://evro.themescare.com/themes/pizze-item/assets/img/bugar_2.png",
    title: "chicken hamburger",
    price: 40.3,
    sides: ["bihari chicken chunks", "sweet corn"],
    category: "burgers",
  },
  {
    imageUrl:
      "https://evro.themescare.com/themes/pizze-item/assets/img/ice-cream-1.png",
    title: "vanilla ice cream",
    price: 13.3,
    sides: ["chocolate", "vanilla", "strawberry flavour"],
    category: "deserts",
  },
  {
    imageUrl:
      "https://evro.themescare.com/themes/pizze-item/assets/img/ice-cream-2.png",
    title: "flavour ice cream",
    price: 14.1,
    sides: ["chocolate", "vanilla", "strawberry flavour"],
    category: "deserts",
  },
];

 */
