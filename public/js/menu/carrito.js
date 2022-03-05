let cartShown = false;

async function cartRenderTable(carrito) {
  var cartSectionElement = document.getElementsByClassName("container-cart")[0];

  let plantillaHbs = await fetch("plantillas/cart.hbs").then((r) => r.text());

  var template = Handlebars.compile(plantillaHbs);
  let html = template({ carrito });
  cartSectionElement.innerHTML = html;
  cartSectionElement.classList.add("container-cart--open");
}

function startCart() {
    var cartButton = document.getElementsByClassName("search-bar__container-icons__cart")[0];
    var containerFavsElem = document.getElementsByClassName("container-favourites")[0];
    var cartSectionElement = document.getElementsByClassName("container-cart")[0];
    
    cartButton.addEventListener("click", async function () {
        cartShown = !cartShown;
        favsShown = false;
        containerFavsElem.classList.remove("container-favourites--open");

        if (cartShown) {
            await cartRenderTable(cartController.carrito);
        } else {
            cartSectionElement.classList.remove("container-cart--open");
        }
  });
}

startCart();
