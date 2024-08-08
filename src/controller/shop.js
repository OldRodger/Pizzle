import { ObjectId } from "mongodb";
import Order from "../model/Order.js";
import Product from "../model/Product.js";
import { validateEmail, validatePhoneNumber } from "../utils/helpers.js";

// GET HOME PAGE
export function getIndex(req, res) {
  return res.render("shop/home", {
    path: "/",
  });
}

// GET MENU PAGE
export async function getMenu(req, res) {
  const { filter } = req.query;

  try {
    const search = await Product.find();
    let products = search.filter((product) => product.category === filter);

    if (!products.length) products = search;

    return res.render("shop/menu", {
      title: "food menu",
      path: "/menu",
      query: filter || "all",
      products: products,
    });
  } catch (error) {
    console.error(error.message);
  }
}

// GET CART PAGE
export async function getCart(req, res) {
  try {
    if (!req.session.cart) {
      return res.render("shop/cart", {
        title: "your cart",
        path: "/cart",
        cart: [],
        total: 0,
        errorMsg: req.flash("error"),
      });
    }
    const products = await Product.find();
    const cartItems = req.session.cart.map(({ productID, quantity }) => {
      const product = products.find((el) => el._id.toString() === productID);
      return { ...product._doc, quantity };
    });
    const total = cartItems
      .map((item) => item.price * item.quantity)
      .reduce((acc, cur) => acc + cur, 0);

    return res.render("shop/cart", {
      title: "your cart",
      path: "/cart",
      cart: cartItems,
      total: total,
      errorMsg: req.flash("error"),
    });
  } catch (error) {
    console.error(error.message);
  }
}

// GET ORDERS PAGE
export async function getOrders(req, res) {
  const { orderID } = req.params;

  try {
    const order = await Order.findById(orderID);
    return res.render("shop/order", {
      title: orderID ? `order (#${orderID.slice(-6)})` : "search orders 🔎",
      path: "/order",
      order: order,
    });
  } catch (error) {
    console.error(error.message);
    res.redirect("/order");
  }
}

// ADD TO CART
export async function postCart(req, res) {
  try {
    const { productID } = req.body;
    if (!req.session.cart) {
      req.session.cart = [];
    }
    let cart = req.session.cart;
    const product = cart.find((item) => item.productID === productID);
    if (product === undefined) {
      cart = [...cart, { productID, quantity: 1 }];
    } else {
      product.quantity += 1;
    }
    req.session.cart = cart;
    res.redirect("/cart");
  } catch (error) {
    console.error(error);
  }
}

// DECREASE PRODUCT QUANTITY
export function postDecreaseQuantity(req, res) {
  const { productID } = req.body;
  const product = req.session.cart.find(
    (product) => product.productID === productID,
  );
  product.quantity -= 1;
  req.session.save(() => {
    res.redirect("/cart");
  });
}

// INCREASE PRODUCT QUANTITY
export function postIncreaseQuantity(req, res) {
  const { productID } = req.body;
  const product = req.session.cart.find(
    (product) => product.productID === productID,
  );
  product.quantity += 1;
  req.session.save(() => {
    res.redirect("/cart");
  });
}

// DELETE PRODUCT
export function postDeleteCartItem(req, res) {
  const { productID } = req.body;
  const newCart = [...req.session.cart].filter(
    (product) => product.productID !== productID,
  );
  req.session.cart = newCart;
  req.session.save(() => {
    res.redirect("/cart");
  });
}

// ORDER
export async function postOrder(req, res) {
  try {
    const order = { ...req.body, cart: JSON.parse(req.body.cart) };
    const total = order.cart
      .map((item) => item.price * item.quantity)
      .reduce((acc, cur) => acc + cur, 0);

    // VALIDATE FOR EMPTY
    if (Object.values(order).includes(""))
      throw new Error("Fields must not be left empty");

    // VALIDATE FOR PHONE PATTERN
    if (!validatePhoneNumber(order.phone))
      throw new Error(
        "Phone number should match pattern (123-456-7890) or (1234567890)",
      );

    // VALIDATE FOR EMAIL PATTERN
    if (!validateEmail(order.email))
      throw new Error(
        "Email should match pattern (test@example.com or test@example.co)",
      );

    const newOrder = await Order.create({ ...order, total: total });
    req.session.destroy(() => {
      res.redirect(`/order/${newOrder._id}`);
    });
  } catch (error) {
    console.error(error.message);
    req.flash("error", error.message);
    res.redirect("/cart");
  }
}

// SEARCH ORDER
export function postSearchOrder(req, res) {
  const { orderID } = req.body;
  return res.redirect(`/order/${orderID}`);
}
