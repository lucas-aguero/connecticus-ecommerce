let favsShown = false;

async function favsRenderTable(favoritos) {
  var containerFavsElem = document.getElementsByClassName(
    "container-favourites"
  )[0];

  let plantillaHbs = await fetch("plantillas/favoritos.hbs").then((r) =>
    r.text()
  );

  var template = Handlebars.compile(plantillaHbs);
  let html = template({ favoritos });
  containerFavsElem.innerHTML = html;
  containerFavsElem.classList.add("container-favourites--open");
}

function startFavs() {
  var buttonFavs = document.getElementsByClassName(
    "search-bar__container-icons__favourites"
  )[0];
  var containerCartElem = document.getElementsByClassName("container-cart")[0];
  var containerFavsElem = document.getElementsByClassName(
    "container-favourites"
  )[0];

  buttonFavs.addEventListener("click", async function () {
    favsShown = !favsShown;
    cartShown = false;
    containerCartElem.classList.remove("container-cart--open");

    if (favsShown) {
      await favsRenderTable(favouriteController.favoritos);
    } else {
      containerFavsElem.classList.remove("container-favourites--open");
    }
  });
}

startFavs();
