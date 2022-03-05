const productionCart = location.port != '5500'

class CartService {
  URL_CART = productionCart? '/api/carrito/' : 'http://localhost:9090/api/carrito/'

  async cartServiceSave(cart) {
    let cartSaved = await http.post(this.URL_CART, cart);
    return cartSaved;
  }
}

const cartService = new CartService();
