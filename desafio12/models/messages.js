const knex = require("knex");

class Messages {
    constructor(tableName, dbConfig) {
      (this.table = tableName), (this.knex = knex(dbConfig));
  
      this.knex.schema
        .hasTable(this.table)
        .then((exists) => {
          if (!exists) {
            return this.knex.schema.createTable(this.table, (table) => {
              table.increments("id").notNullable().primary();
              table.string("email", 100).notNullable();
              table.string("message").notNullable();
              table.string("date", 50).notNullable();
            });
          }
        })
        .catch((err) => console.log("error en constructor", err));
    }

    async addMessage(data){
        try {
            await this.knex(this.table).insert(data)
        } catch (error) {
            console.log("error al añadir mensaje", error);
        } finally{
            /* knex(this.config).destroy(); */
        }
    }

    async getMessages(){
        try {
            const messages = await this.knex
             .from(this.table)
             .select('*');
             console.log(messages);
            return messages; 
        } catch (error) {
            console.log("error al obtener mensajes", error);
        } finally{
            /* knex(this.config).destroy(); */
        }
    }
}

module.exports = Messages;
