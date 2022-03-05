import CartModel from "../model/cart.js";
import config from "../config.js";

const model = CartModel.get(config.TIPO_DE_PERSISTENCIA);

const cartSave = async (carrito) => {
  let carritoCreado = await model.cartCreate(carrito);
  return carritoCreado;
};

export default {
  cartSave,
};
