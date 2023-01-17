const knex = require("knex");

class Products {
  constructor(tableName, dbConfig) {
    (this.table = tableName), (this.knex = knex(dbConfig));

    this.knex.schema
      .hasTable(this.table)
      .then((exists) => {
        if (!exists) {
          return this.knex.schema.createTable(this.table, (table) => {
            table.increments("id").notNullable().primary();
            table.string("title", 100).notNullable();
            table.float("price").notNullable();
            table.string("image").notNullable();
          });
        }
      })
      .catch((err) => console.log("Error", err));
  }

  async getAll() {
    try {
      const products = await this.knex
        .from(this.table)
        .select("id", "title", "price","image");
      console.table(products);
      return products;
    } catch (error) {
      console.log(error);
    } finally {
        this.knex.destroy()
    }
  }

  async getById(id) {
    try {
      const product = await this.knex
        .from(this.table)
        .select("id", "title", "price", "image")
        .where({ id: id });
      console.table(product);
    } catch (error) {
      console.log("Error", error);
    } finally {
        knex(this.config).destroy();
    }
  }

  async save(product) {
    const { title, price, image } = product;
    if (!title || !price || !image) {
      return null;
    }

    const newProduct = {
      title,
      price,
      image,
    };

    try {
      await this.knex(this.table).insert(newProduct);
    } catch (error) {
      console.log(error);
    } finally {
        this.knex.destroy()
    }

    return {
      message: "Producto nuevo",
      product: newProduct,
    };
  }

  async update(id, product) {
    const { title, price, image} = product;
    try {
      await this.knex.from(this.table)
      .where({ id: id })
      .update({
        title: title,
        price: price,
        image: image,
      });
    } catch (error) {
      console.log("Error", error);
    } finally {
        knex(this.config).destroy();
    }
    return { message: "Producto subido" };
  }

  async deleteById(id) {
    try {
      await this.knex.from(this.table).where({ id }).del();
    } catch (error) {
      console.log(error);
    } finally {
        this.knex.destroy()
    }
    return { message: "Producto borrado" };
  }
}

module.exports = Products;
