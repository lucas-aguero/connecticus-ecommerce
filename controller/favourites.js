import api from "../api/favourites.js";

const postFavourites = async (req, res) => {
  let favourite = req.body;

  let favouriteAdded = await api.favouritesSave(favourite);

  let items = [];
  for (let item of favouriteAdded) {
    items.push({
      title: item.nombre,
      unit_price: item.precio,
      quantity: item.cantidad,
    });
  }
};

export default {
  postFavourites,
};
