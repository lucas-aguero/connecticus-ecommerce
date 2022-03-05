const productionFavs = location.port != '5500'

class FavouritesService {
  URL_FAVORITO = productionFavs? '/api/favourites/' : 'http://localhost:9090/api/favourites/'

  async favouritesServiceSave(favorito) {
    let favouriteSaved = await http.post(this.URL_FAVORITO, favorito);
    return favouriteSaved;
  }
}

const favouritesService = new FavouritesService();
