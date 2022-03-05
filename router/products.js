import express from "express";
import controller from "../controller/products.js";

const router = express.Router();

router.get("/:id?", controller.productGet);

router.post("/", controller.productPost);

router.put("/:id", controller.productPut);

router.delete("/:id", controller.productDelete);

export default router;
