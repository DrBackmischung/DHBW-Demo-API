const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

let items = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' },
  { id: 3, name: 'Item 3', description: 'This is item 3' },
];

const serviceFunctions = {
  ItemsService: {
    ItemsServicePortType: {
      getItems(args, callback) {
        return {
          items: items
        };
      },
      getItem(args) {
        const { id } = args;
        const item = items.find(i => i.id === parseInt(id));
        if (!item) {
          return { item: { id: 0, name: '', description: '' } };
        }
        return { item };
      },
      createItem(args) {
        const newId = items.length + 1;
        const newItem = {
          id: newId,
          name: args.name,
          description: args.description,
        };
        items.push(newItem);
        return { item: newItem };
      },
      updateItem(args) {
        const { id, name, description } = args;
        const item = items.find(i => i.id === parseInt(id));
        if (!item) {
          return { item: { id: 0, name: '', description: '' } };
        }
        item.name = name;
        item.description = description;
        return { item };
      },
      deleteItem(args) {
        const { id } = args;
        const index = items.findIndex(i => i.id === parseInt(id));
        if (index === -1) {
          return {};
        }
        items.splice(index, 1);
        return {};
      },
    },
  },
};

const wsdl = fs.readFileSync(path.join(__dirname, 'items-service.wsdl'), 'utf8');

app.listen(PORT, function() {
  soap.listen(app, '/soap', serviceFunctions, wsdl, function() {
    console.log(`SOAP service listening on http://localhost:${PORT}/soap`);
  });
});
