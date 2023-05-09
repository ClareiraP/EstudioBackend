const productosService = require("../service/productos.js");
const productos = new productosService();

async function getProductos() {
  return await productos.getProductos();
}

module.exports = { getProductos };