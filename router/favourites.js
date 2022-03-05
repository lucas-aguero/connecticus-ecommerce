import express from "express";
import controller from "../controller/favourites.js";

const router = express.Router();

router.post("/", controller.postFavourites);

export default router;
