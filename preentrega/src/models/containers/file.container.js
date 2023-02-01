const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const { HttpError } = require('../../utils/api.utils');
const  HTTP_STATUS  = require('../../constants/api.constants');


class FileContainer {
    constructor(resource) {
      this.resource = resource;
    }
  
    static async connect() {}

    async getAll() {
        const fileToRead = await fs.promises.readFile(`./${this.resource}`, 'utf-8');
        const file = JSON.parse(fileToRead);
        console.log(file)
        return file;
      }

    async getById(id) {
        const file = await this.getAll();
        const fileId = file.find((item) => item.id == id);
        if (!fileId) {
          const message = `este id ${id} no existe`;
          throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return fileId
      }

    async save(item) {
      const itemId = {
        id: uuidv4(),
        ...item
      }
      const file = await this.getAll();
      console.log(file)
      file.push(itemId)
      await fs.promises.writeFile(`${this.resource}`, JSON.stringify(file, null, 2))
      
 }

    async update(productId, item) {
        const {title, price, image, stock, description } = item;
        const list = await this.getAll();
        const index = list.findIndex((item) => item.id == productId)

        if (index === -1) {
          const message = `${this.resource} con id ${id} no existe`;
          throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
       

        const files = await this.getAll();

        const updatedItem = {
          id: files[index].id,
          timestamp: Date.now(),
          title,
          price: +price,
          image,
          stock: +stock,
          description
        }

        files[index] = updatedItem;
        await fs.promises.writeFile(`./${this.resource}`, JSON.stringify(files, null, 2))
      }

    async delete(id) {
        const file = await this.getAll();
        const filteredArray = file.filter((item) => item.id != id);

        await fs.promises.writeFile(`./${this.resource}`, JSON.stringify(filteredArray, null, 2));
        
        if (filteredArray === -1) {
          const message = `${this.resource} con id ${id} no existe`;
          throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        
        return filteredArray
      }
}

module.exports = FileContainer