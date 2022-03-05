import mongoose from "mongoose";
import Mongo_DB from "./DB_mongo.js";

const favouriteSchema = mongoose.Schema({
  favourite: Array,
});

const FavouriteModel = mongoose.model("favourites", favouriteSchema);

class FavouriteModelMongoDB {
  async favouritesCreate(favourite) {
    if (!Mongo_DB.conexionOk) return {};
    try {
      const favouriteSave = new FavouriteModel({ favourite: favourite });
      await favouriteSave.save();

      return favourite;
    } catch (error) {
      console.log(`Error en createCarrito: ${error.message}`);
      return {};
    }
  }
}

export default FavouriteModelMongoDB;
