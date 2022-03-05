import FavouriteModel from "../model/favourites.js";
import config from "../config.js";

const model = FavouriteModel.get(config.TIPO_DE_PERSISTENCIA);

const favouritesSave = async (carrito) => {
  let carritoCreado = await model.favouritesCreate(carrito);
  return carritoCreado;
};

export default {
  favouritesSave,
};
