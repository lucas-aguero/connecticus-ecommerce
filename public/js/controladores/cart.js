class CartController extends CartModel {
  constructor() {
    super();
    try {
      this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      this.cart = [];
      localStorage.setItem("cart", this.cart);
    }
  }

  cartProductCheck(producto) {
    return this.cart.filter((prod) => prod.id == producto.id).length;
  }

  cartProductGet(producto) {
    return this.cart.find((prod) => prod.id == producto.id);
  }

  cartProductAdd(producto) {
    if (!this.cartProductCheck(producto)) {
      producto.cantidad = 1;
      this.cart.push(producto);
    } else {
      let productFromCart = this.cartProductGet(producto);
      productFromCart.cantidad++;
    }

    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  async cartProductDel(id) {
    let index = this.cart.findIndex((producto) => producto.id == id);
    this.cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(this.cart));

    await cartRenderTable(this.cart);
  }

  async cartSend() {
    var cartSectionElement =
      document.getElementsByClassName("container-cart")[0];

    cartSectionElement.innerHTML = "<h2>Enviando...</h2>";
    await cartService.cartServiceSave(this.cart);
    this.cart = [];
    localStorage.setItem("cart", this.cart);

    cartSectionElement.innerHTML = "<h2>Enviando... <b>OK!</b></h2>";

    setTimeout(() => {
      cartSectionElement.classList.remove("container-cart--open");
      cartShown = false;
    }, 1500);
  }
}

const cartController = new CartController();
