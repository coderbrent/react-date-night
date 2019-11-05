const express = require('express');
const app = express();
const port = 5000;
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = { hello: () => 'Hello World!' };

app.use('/__graphiql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/', (req, res) => {
  res.send("a traditional express route")
})

app.listen(port, () => console.log(`Server is running @ port: ${port}`));