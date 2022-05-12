import ProductModel from "../model/products.js";
import config from "../config.js";

import ProductosValidation from "../model/validaciones/productos.js";

const model = ProductModel.get(config.TIPO_DE_PERSISTENCIA);

const productGetAll = async () => {
  let productos = await model.productReadAll();
  return productos;
};

const productGet = async (id) => {
  let producto = await model.productRead(id);
  return producto;
};

const productSave = async (producto) => {
  const errorValidacion = ProductosValidation.validar(producto);
  if (!errorValidacion) {
    let productCreated = await model.productCreate(producto);
    return productCreated;
  } else {
    throw new Error(`Error en validación al Guardar el Producto: ${errorValidacion.details[0].message}`);
    console.log("Error en validación al Guardar el Producto:",errorValidacion.details[0].message);
    return {};
  }
};

const productUpdate = async (id,producto) => {
  const errorValidacion = ProductosValidation.validar(producto);
  if (!errorValidacion) {
    let productoUpdate = await model.productUpdate(id, producto);
    return productoUpdate;
  } else {
    console.log(
      "Error en validación productUpdate:",
      errorValidacion.details[0].message
    );
    return {};
  }
};

const productDelete = async (id) => {
  let productoDelete = await model.productDelete(id);
  return productoDelete;
};

export default {
  productGetAll,
  productGet,
  productSave,
  productUpdate,
  productDelete,
};
