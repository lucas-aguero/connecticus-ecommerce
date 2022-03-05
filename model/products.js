import ProductModelMongoDB from "./products-mongodb.js";

class ProductModel {
  static get(tipo) {
    switch (tipo) {
      case "MONGODB":
        console.log("PERSISTENCIA (Productos): MONGODB");
        return new ProductModelMongoDB();
    }
  }
}

export default ProductModel;
