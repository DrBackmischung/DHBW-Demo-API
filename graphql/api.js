const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const itemSchema = require('./schema');
const itemResolver = require('./resolver');

const app = express();
const PORT = 4000;

app.use('/graphql', graphqlHTTP({
    schema: itemSchema,
    rootValue: itemResolver,
    graphiql: true, 
}));

app.listen(PORT, () => {
    console.log(`GraphQL API is running on http://localhost:${PORT}/graphql`);
});