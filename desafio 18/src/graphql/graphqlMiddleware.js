const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const { getProductos } = require("./graphqlProductosControlador.js");

const schema = buildSchema(`
input ProductoInput {
  id: Int
}
  type Producto {
    nombre: String
    precio: Int
    descripcion: String
    imagenURL: String
  }
  type Query {
    getProductos: [Producto]
  }
`);

const graphqlMiddleware = graphqlHTTP({
  schema: schema,
  rootValue: {
    getProductos,
  },
  graphiql: true,
});

module.exports = graphqlMiddleware;