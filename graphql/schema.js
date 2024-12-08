const fs = require('fs');
const path = require('path');
const { buildSchema } = require('graphql');

const schemaPath = path.join(__dirname, 'schema.graphql');
const schemaString = fs.readFileSync(schemaPath, 'utf-8');

const schema = buildSchema(schemaString);

module.exports = schema;