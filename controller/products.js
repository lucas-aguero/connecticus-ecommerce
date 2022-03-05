import api from "../api/products.js";

const productGet = async (req, res) => {
  let id = req.params.id;

  if (id) {
    let producto = await api.productGet(id);
    res.json(producto);
  } else {
    let productos = await api.productGetAll();
    res.json(productos);
  }
};

const productPost = async (req, res) => {
  let producto = req.body;
  let productoAdded = await api.productSave(producto);

  res.json(productoAdded);
};

const productPut = async (req, res) => {
  let id = req.params.id;
  let producto = req.body;
  let productoUpdated = await api.productUpdate(id, producto);

  res.json(productoUpdated);
};

const productDelete = async (req, res) => {
  let id = req.params.id;
  let productDeleted = await api.productDelete(id);

  res.json(productDeleted);
};

export default {
  productGet,
  productPost,
  productPut,
  productDelete,
};
