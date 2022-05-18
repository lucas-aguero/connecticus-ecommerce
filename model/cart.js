import CartModelMongoDB from "./cart-mongodb.js";

class CartModel {
  static get(tipo) {
    switch (tipo) {
      case "MONGODB":
        console.log("PERSISTENCIA (Carrito)  : MONGODB");
        return new CartModelMongoDB();

      default:
        console.log("PERSISTENCIA (Carrito)  : MEMORY");
        return new CartModelMongoDB();
    }
  }
}

export default CartModel;
