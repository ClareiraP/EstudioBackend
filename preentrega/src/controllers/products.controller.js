const  { ProductsDao } = require("../models/daos/app.daos");
const HTTP_STATUS  = require('../constants/api.constants');
const { successResponse } = require('../utils/api.utils');


const productsDao = new ProductsDao();

class ProductController {
    
    getAllProducts = async (req, res, next) => {
        try{
           const allProducts = await productsDao.getAll();
           const response = successResponse(allProducts);
           res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    };

    getProductId = async (req, res, next) => {
        const { idProduct } = req.params;
        try{
           const product = await productsDao.getById(idProduct)
           const response = successResponse(product)
           res.status(HTTP_STATUS.OK).json(response);
           return res.json(product);
        }
        catch (error) {
            next(error);
        }
      };

    saveNewProduct = async (req,res, next) => {
        const { title, price, imageUrl, stock, description } = req.body
        try{
           /* if (!title || !price || !imageUrl, !stock, !description ) return null; */
            const newProduct = {
                title,
                price,
                imageUrl,
                stock,
                description
            }
        
            const saveProduct = await productsDao.save(newProduct);
            const response = successResponse(saveProduct);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }

    updateOneProduct = async (req,res, next) => {
        const { body, params: {idProduct},} = req;
       
        try{ 
            const updatedProduct = await productsDao.update(idProduct, body)
            const response = successResponse(updatedProduct);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }

    deleteOneProduct = async (req, res, next) => {
        const { params: {idProduct},} = req;
        try{
            const deletedProduct = await productsDao.delete(idProduct);
            const response = successResponse(deletedProduct);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }

}

module.exports = new ProductController();