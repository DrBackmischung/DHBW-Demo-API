const odata = require('node-odata');

// Wir legen zur Demonstration eine In-Memory-Datenbank an
const server = odata('mongodb://localhost:27017/TEST'); 
// Oben eine MongoDB-URL. node-odata möchte standardmäßig eine DB-Verbindung. 
// Du brauchst ggf. eine laufende MongoDB. 
// Für rein in-memory geht man oft Weg über alternative Mods, 
// hier aber zum Beispiel so (oder man benutzt odata-v4-server).

const Item = server.resource('items', {
  id: { type: Number },
  name: { type: String },
  description: { type: String }
});

server.listen(6000, () => {
  console.log(`OData server is running on http://localhost:6000`);
});
