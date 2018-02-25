const huejay = require('huejay');
const config = require('./config');

const client = new huejay.Client({
	host: config.BRIDGE_IP,
	username: config.BRIDGE_USERNAME
});

client.lights.getById(8).then(light => {
	console.log(light);
});

client.groups.getAll()
  .then(groups => {
    for (let group of groups) {
      console.log(`Group [${group.id}]: ${group.name}`);
      console.log(`  Type: ${group.type}`);
      console.log(`  Class: ${group.class}`);
      console.log('  Light Ids: ' + group.lightIds.join(', '));
      console.log('  State:');
      console.log(`    Any on:     ${group.anyOn}`);
      console.log(`    All on:     ${group.allOn}`);

      console.log();
    }
  });