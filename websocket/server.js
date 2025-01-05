const WebSocket = require('ws');

const PORT = 5000;
let items = [
  { id: 1, name: 'Item 1', description: 'This is item 1' },
  { id: 2, name: 'Item 2', description: 'This is item 2' },
  { id: 3, name: 'Item 3', description: 'This is item 3' },
];

const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.send(JSON.stringify({
    action: 'init',
    data: items
  }));

  ws.on('message', (message) => {
    try {
      const msg = JSON.parse(message);

      switch (msg.action) {
        case 'getItems':
          ws.send(JSON.stringify({ action: 'getItemsResponse', data: items }));
          break;

        case 'getItem': {
          const item = items.find(i => i.id === msg.id);
          ws.send(JSON.stringify({ action: 'getItemResponse', data: item || null }));
          break;
        }

        case 'createItem': {
          const newItem = {
            id: items.length + 1,
            name: msg.name,
            description: msg.description,
          };
          items.push(newItem);
          broadcast({ action: 'itemCreated', data: newItem });
          break;
        }

        case 'updateItem': {
          const item = items.find(i => i.id === msg.id);
          if (item) {
            item.name = msg.name;
            item.description = msg.description;
            broadcast({ action: 'itemUpdated', data: item });
          } else {
            ws.send(JSON.stringify({ action: 'error', message: 'Item not found' }));
          }
          break;
        }

        case 'deleteItem': {
          const index = items.findIndex(i => i.id === msg.id);
          if (index !== -1) {
            const deleted = items.splice(index, 1)[0];
            broadcast({ action: 'itemDeleted', data: deleted });
          } else {
            ws.send(JSON.stringify({ action: 'error', message: 'Item not found' }));
          }
          break;
        }

        default:
          ws.send(JSON.stringify({ action: 'error', message: 'Unknown action' }));
      }
    } catch (error) {
      ws.send(JSON.stringify({ action: 'error', message: error.message }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

function broadcast(obj) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(obj));
    }
  });
}
