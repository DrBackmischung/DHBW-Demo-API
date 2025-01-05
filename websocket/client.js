const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000');

ws.on('open', () => {
  console.log('Connected to WebSocket server');

  // Beispiel-Requests:

  // getItems
  ws.send(JSON.stringify({ action: 'getItems' }));

  // createItem
  ws.send(JSON.stringify({ action: 'createItem', name: 'New WS Item', description: 'Created via WS' }));

  // updateItem
  ws.send(JSON.stringify({ action: 'updateItem', id: 1, name: 'Updated via WS', description: 'Updated Description' }));

  // deleteItem
  ws.send(JSON.stringify({ action: 'deleteItem', id: 2 }));
});

ws.on('message', (data) => {
  const message = JSON.parse(data);
  console.log('Received from server:', message);
});

ws.on('close', () => {
  console.log('Connection closed');
});
