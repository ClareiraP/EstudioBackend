const MemoryContainer = require('../../containers/memory.container');

const { HttpError } = require('../../../utils/api.utils');
const  HTTP_STATUS  = require('../../../constants/api.constants');

const collection = 'carts';

class CartsMemoryContainer extends MemoryContainer{
    constructor(){
        super(collection);
    }

    async getCartProds (cartId){
        const cart = await this.getById(cartId);
        return [...cart.products]
    }

    async addProduct(idCart,idProd){
        let id = idProd ;
        let cart = this.getById(idCart);
        if (!cart) {
            const message = `${this.resource} con id ${productId} no existe.`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
          }                                
        cart.products.push({id})               
        this.update(idCart, cart)
        
        return cart   
    }

    deleteProduct(idCart, idProd){        
        let cart = this.getById(idCart); 
        const index = cart.products.findIndex(item => item.id == idProd);

      if (index < 0) {
        const message = `${this.resource} con id ${productId} no existe.`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
      }      
        cart.products.splice(index, 1);        
        this.update(idCart,cart)

        return  cart.products
    }
}

module.exports = CartsMemoryContainer;