const items = require('./items');

const resolver = {
    items: () => items,
    item: ({ id }) => items.find(i => i.id === id),
    addItem: ({ name, description }) => {
        const newItem = {
            id: items.length + 1,
            name,
            description,
        };
        items.push(newItem);
        return newItem;
    },
    updateItem: ({ id, name, description }) => {
        const item = items.find(i => i.id === id);
        if (!item) throw new Error('Item not found.');
        if (name) item.name = name;
        if (description) item.description = description;
        return item;
    },
    deleteItem: ({ id }) => {
        const itemIndex = items.findIndex(i => i.id === id);
        if (itemIndex === -1) throw new Error('Item not found.');
        items.splice(itemIndex, 1);
        return 'Item deleted successfully.';
    },
};

module.exports = resolver;