import express from "express";
import controller from "../controller/cart.js";

const router = express.Router();

router.post("/", controller.postCart);

export default router;
