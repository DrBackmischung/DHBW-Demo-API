const soap = require('soap');

const url = 'http://localhost:4000/soap?wsdl';

async function runClient() {
  try {
    const client = await soap.createClientAsync(url);

    // getItems
    let [result] = await client.getItemsAsync({});
    console.log('getItems:', JSON.stringify(result, null, 2));

    // getItem
    [result] = await client.getItemAsync({ id: 1 });
    console.log('getItem (id=1):', JSON.stringify(result, null, 2));

    // createItem
    [result] = await client.createItemAsync({ name: 'New SOAP Item', description: 'Created via SOAP' });
    console.log('createItem:', JSON.stringify(result, null, 2));

    // updateItem
    [result] = await client.updateItemAsync({ id: 1, name: 'Updated Name', description: 'Updated Desc' });
    console.log('updateItem (id=1):', JSON.stringify(result, null, 2));

    // deleteItem
    [result] = await client.deleteItemAsync({ id: 2 });
    console.log('deleteItem (id=2):', JSON.stringify(result, null, 2));

    // getItems again
    [result] = await client.getItemsAsync({});
    console.log('getItems (after delete):', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error in SOAP client:', err);
  }
}

runClient();
