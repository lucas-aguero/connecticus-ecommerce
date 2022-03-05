import mongoose from "mongoose";
import Mongo_DB from "./DB_mongo.js";

const productoSchema = mongoose.Schema({
  nombre: String,
  precio: Number,
  stock: Number,
  marca: String,
  categoria: String,
  detalles: String,
  foto: String,
  envio: Boolean,
});

const ProductModel = mongoose.model("productos", productoSchema);

class ProductModelMongoDB {
  async productCreate(producto) {
    if (!Mongo_DB.conexionOk) return {};
    try {
      const productoSave = new ProductModel(producto);
      await productoSave.save();

      let productos = await ProductModel.find({}).lean();
      let productoGuardado = productos[productos.length - 1];

      return Mongo_DB.genIdKey(productoGuardado);
    } catch (error) {
      console.log(`Error al Crear el Producto: ${error.message}`);
      return {};
    }
  }

  async productRead(id) {
    if (!Mongo_DB.conexionOk) return {};
    try {
      let producto = await ProductModel.findOne({ _id: id }).lean();
      return Mongo_DB.genIdKey(producto);
    } catch (error) {
      console.log(`Error al Leer el Producto: ${error.message}`);
      return {};
    }
  }

  async productReadAll(async) {
    if (!Mongo_DB.conexionOk) return [];
    try {
      let productos = await ProductModel.find({}).lean();
      return Mongo_DB.genIdKey(productos);
    } catch (error) {
      console.log(`Error leer la Lista de Productos: ${error.message}`);
      return [];
    }
  }

  async productUpdate(id, producto) {
    if (!Mongo_DB.conexionOk) return {};
    try {
      await ProductModel.updateOne({ _id: id }, { $set: producto });
      let productUpdated = await ProductModel.findOne({ _id: id }).lean();
      return Mongo_DB.genIdKey(productUpdated);
    } catch (error) {
      console.log(`Error en al Actualizar el Producto: ${error.message}`);
      return {};
    }
  }

  async productDelete(id) {
    if (!Mongo_DB.conexionOk) return {};
    try {
      let productDeleted = await ProductModel.findOne({ _id: id }).lean();
      await ProductModel.deleteOne({ _id: id });
      return Mongo_DB.genIdKey(productDeleted);
    } catch (error) {
      console.log(`Error al Borrar el Producto: ${error.message}`);
      return {};
    }
  }
}

export default ProductModelMongoDB;
