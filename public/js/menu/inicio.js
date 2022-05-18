async function templateListRender(listado) {
  let plantillaHbs = await fetch("plantillas/inicio.hbs").then((r) => r.text());

  var template = Handlebars.compile(plantillaHbs);

  let html = template({ listado });

  document.getElementsByClassName(
    "section-productos__cards__container"
  )[0].innerHTML = html;
}

function addToCart(e, id, ref) {
  e.preventDefault();
  let product = productController.productos.find(producto => producto.id == id );
  console.log(product)
  cartController.cartProductAdd(product);
}

function addToFavourites(e, id, ref) {
  e.preventDefault();
  let product = productController.productos.find(producto => producto.id == id );
  favouriteController.favouritesProductAdd(product);
}

async function initInicio() {
  var productos = await productController.productGetAll();

  await templateListRender(productos);

  document.querySelector(
    ".section-productos__filtros__cantidad"
  ).innerHTML = `Se encontraron ${productos.length} productos`;

  const itemsAcordeon = document.getElementsByClassName(
    "container__acordeon__item"
  );

  for (item of itemsAcordeon) {
    item.addEventListener("click", function () {
      this.classList.toggle("container__acordeon__item--show");
    });
  }
}
