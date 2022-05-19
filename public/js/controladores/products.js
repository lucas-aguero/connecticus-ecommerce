class ProductController extends ProductModel {
  constructor() {
    super();
    this.productSave = this.productSave.bind(this);
  }

  async productGetAll() {
    this.productos = await productService.productServiceGetAll();
    return this.productos;
  }

  async productSave(producto) {
    let productSaved = await productService.productServiceSave(producto);
    this.productos.push(productSaved);
    addTableRender(null, this.productos);
  }

  async productUpdate(id) {
    let producto = formAddNewProduct.productReadForm();
    formAddNewProduct.formClean();
    let productUpdated = await productService.productServiceUpdate(id,producto);
    let index = this.productos.findIndex((producto) => producto.id == productUpdated.id);
    this.productos.splice(index, 1, productUpdated);
    addTableRender(null, this.productos);
  }

  async productDelete(id) {
    let productDeleted = await productService.productServiceDelete(id);

    let index = this.productos.findIndex((producto) => producto.id == productDeleted.id);
    this.productos.splice(index, 1);
    addTableRender(null, this.productos);
  }
}

const productController = new ProductController();
