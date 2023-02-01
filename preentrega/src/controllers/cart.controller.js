const  { CartDao } = require("../models/daos/app.daos");
const HTTP_STATUS = require('../constants/api.constants');
const { successResponse } = require('../utils/api.utils');

const cartDao = new CartDao();

class CartsController {
    
    getCarts = async ( req, res, next ) => {
      try{
        const carts = await cartDao.getAll();
        const response = successResponse(carts);
        res.json(response);
      }
      catch (error) {
        next(error);
    }
    }

    createCart = async (req,res, next) => {
      try{
         const newCart = await cartDao.save({products: []})
         const response = successResponse(newCart);
         res.json(response);
      }
      catch (error) {
        next(error);
    }
    }


    getOneCart = async (req, res, next) => {
      try{
          const { idCart } = req.params;
          const cart = await cartDao.getById(idCart);

          const response = successResponse(cart);
          res.json(response);
      }

      catch (error) {
          next(error);
    }
}

    getProductsCart = async (req, res, next) => {
      try{
          const { idCart } = req.params;
          const cartProd = await cartDao.getCartProds(idCart)
          const response = successResponse(cartProd);
          res.json(response);
      }

      catch (error) {
          next(error);
      }
  }


    deleteOneCart = async (req, res, next) => {
        const { params: {idCart}} = req;
        try{
           const deletedCart = cartDao.delete(idCart);
           const response = successResponse(deletedCart);
          res.json(response);
        }
        catch (error) {
          next(error);
      }
  }

    saveOneProductCart = async (req, res, next) => {
      try{
        const {idCart, idProd} = req.params;
        const products = await cartDao.addProduct(idCart, idProd);

        const response = successResponse(products);
        res.json(response);
    }
      catch (error) {
        next(error);
    }
  }


    deleteOneProductCart =  async (req, res, next) => {
        const { idCart, idProd } = req.params;
    try{
       const deleteOneProduct = cartDao.deleteProduct(idCart, idProd);
       const response = successResponse(deleteOneProduct);
       res.json(response);
   }
     catch (error) {
       next(error);
   }
}

    
}


module.exports = new CartsController()