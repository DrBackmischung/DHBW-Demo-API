const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); 

let items = [
    { id: 1, name: 'Item 1', description: 'This is item 1' },
    { id: 2, name: 'Item 2', description: 'This is item 2' },
    { id: 3, name: 'Item 3', description: 'This is item 3' },
];

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found.');
    res.json(item);
});

app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
        description: req.body.description,
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found.');
    
    item.name = req.body.name;
    item.description = req.body.description;
    res.json(item);
});

app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found.');
    
    items.splice(itemIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`REST API is running on http://localhost:${PORT}`);
});
