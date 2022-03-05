import api from "../api/cart.js";

const postCart = async (req, res) => {
  let cart = req.body;

  let cartAdded = await api.cartSave(cart);

  let items = [];
  for (let item of cartAdded) {
    items.push({
      title: item.nombre,
      unit_price: item.precio,
      quantity: item.cantidad,
    });
  }
};

export default {
  postCart,
};
