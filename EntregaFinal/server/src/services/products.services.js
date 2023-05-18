const ProductsDAO = require('../models/daos/products.dao');

const productsDAO = new ProductsDAO()

const getProducts = async () => {
    const allProducts = await productsDAO.getAll()
    return allProducts
}

const getProductById = async (id) => {
    return await productsDAO.getById(id);
}
const getProductsByCategory = async (category) => {
    return await productsDAO.getByCategory(category);
}
const saveProduct = async product => {
    return await productsDAO.save(product);
}
const updateProduct = async (id, product) => {
   return await productsDAO.update(id, product)
}
const deleteProduct = async (id) => {
   return await productsDAO.delete(id)
}

module.exports = {
    getProducts,
    getProductById,
    getProductsByCategory,
    saveProduct,
    updateProduct,
    deleteProduct
}