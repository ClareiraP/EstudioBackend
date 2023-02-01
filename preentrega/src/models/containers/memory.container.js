const { v4: uuidv4 } = require('uuid');

const { HTTP_STATUS } = require('../../constants/api.constants');
const { HttpError } = require('../../utils/api.utils');

class MemoryContainer {
    constructor(resource){
        this.data = [];
        this.resource = resource
    }

    static async connect() {}

    
    getAll() {
        return [...this.data];
    }

    getById(id) {
        const item = this.data.find(item => item.id === id)

        if (!item) {
            const message = `${this.resource} con id ${id} no existe`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
          }
        return item;
    }

    update(id, item) {
        const indexForUpdate = this.data.findIndex( (item) => item.id === id)

        if (indexForUpdate === -1) {
            const message = `${this.resource} con id ${id} no existe`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
          }
        
        const updatedItem = {
            ...this.data[indexForUpdate],
            ...item
        }
        
        this.data[indexForUpdate] = updatedItem;

        return updatedItem;
    }

    save(newItem){
        this.data.push({id: uuidv4(), ...newItem})
    }

    delete(id) {
        const indexForDeleted = this.data.findIndex ((item) => item.id === id)

        if (indexForDeleted === -1) {
            const message = `${this.resource} con id ${id} no existe`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
          }

        this.data.splice(indexForDeleted, 1);
    }

}

module.exports = MemoryContainer