import mongoose from "mongoose";
import Mongo_DB from "./DB_mongo.js";

const carritoSchema = mongoose.Schema({
  carrito: Array,
});

const CartModel = mongoose.model("carritos", carritoSchema);

class CartModelMongoDB {
  async cartCreate(carrito) {
    if (!Mongo_DB.conexionOk) return {};
    try {
      const carritoSave = new CartModel({ carrito: carrito });
      await carritoSave.save();

      return carrito;
    } catch (error) {
      console.log(`Error en createCarrito: ${error.message}`);
      return {};
    }
  }
}

export default CartModelMongoDB;
