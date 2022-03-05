import FavouriteModelMongoDB from "./favourites-mongodb.js";

class FavouriteModel {
  static get(tipo) {
    switch (tipo) {
      case "MONGODB":
        console.log("PERSISTENCIA (Favoritos): MONGODB");
        return new FavouriteModelMongoDB();

      default:
        console.log("PERSISTENCIA (Favoritos): MEMORY");
        return new FavouriteModelMongoDB();
    }
  }
}

export default FavouriteModel;
