import { Router } from "express";
import * as shopController from "../controller/shop.js";

const router = Router();

router.get("/", shopController.getIndex);
router.get("/menu", shopController.getMenu);
router.get("/cart", shopController.getCart);
router.get("/order", shopController.getOrders);
router.get("/order/:orderID", shopController.getOrders);


router.post("/cart", shopController.postCart);
router.post("/decrease-cart-quantity", shopController.postDecreaseQuantity);
router.post("/increase-cart-quantity", shopController.postIncreaseQuantity);
router.post("/delete-cart-item", shopController.postDeleteCartItem);
router.post("/order", shopController.postOrder);
router.post("/search-order", shopController.postSearchOrder);

export default router;
