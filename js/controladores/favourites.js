class FavouriteController extends FavoriteModel {
  constructor() {
    super();
    try {
      this.favorito = JSON.parse(localStorage.getItem("favourites")) || [];
    } catch {
      this.favorito = [];
      localStorage.setItem("favourites", this.favorito);
    }
  }

  favouritesProductCheck(producto) {
    return this.favorito.filter((prod) => prod.id == producto.id).length;
  }

  favouritesProductGet(producto) {
    return this.favorito.find((prod) => prod.id == producto.id);
  }

  favouritesProductAdd(producto) {
    if (!this.favouritesProductCheck(producto)) {
      producto.cantidad = 1;
      this.favorito.push(producto);
    } else {
      let productFromFavourites = this.favouritesProductGet(producto);
      productFromFavourites.cantidad++;
    }

    localStorage.setItem("favourites", JSON.stringify(this.favorito));
  }

  async favouritesProductDel(id) {
    let index = this.favorito.findIndex((producto) => producto.id == id);
    this.favorito.splice(index, 1);
    localStorage.setItem("favourites", JSON.stringify(this.favorito));

    await favsRenderTable(this.favorito);
  }

  async favouritesSend() {
    var elemSectionFavourites = document.getElementsByClassName(
      "container-favourites"
    )[0];

    elemSectionFavourites.innerHTML = "<h2>Enviando Favoritos...</h2>";
    await favouritesService.favouritesServiceSave(this.favorito);
    this.favorito = [];
    localStorage.setItem("favourites", this.favorito);

    elemSectionFavourites.innerHTML =
      "<h2>Enviando Favoritos... <b>OK!</b></h2>";

    setTimeout(() => {
      elemSectionFavourites.classList.remove("container-favourites--open");
      favShown = false;
    }, 1500);
  }
}

const favouriteController = new FavouriteController();
