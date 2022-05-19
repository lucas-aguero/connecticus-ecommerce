const productionProduct = location.port != "5500";

class ProductService {
  URL_PRODUCTOS = productionProduct ? "/api/productos/" : "http://localhost:9090/api/productos/";

  async productServiceGetAll() {
    let productos = await http.get(this.URL_PRODUCTOS);
    return productos;
  }

  async productServiceSave(producto) {
    let productSaved = await http.post(this.URL_PRODUCTOS, producto);
    return productSaved;
  }

  async productServiceUpdate(id, producto) {
    let productUpdated = await http.put(this.URL_PRODUCTOS, id, producto);
    return productUpdated;
  }

  async productServiceDelete(id) {
    let productDeleted = await http.del(this.URL_PRODUCTOS, id);
    return productDeleted;
  }
}

const productService = new ProductService();
