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

client.sensors.getAll()
  .then(sensors => {
    for (let sensor of sensors) {
      console.log(`Sensor [${sensor.id}]: ${sensor.name}`);
      console.log(`  Type:             ${sensor.type}`);
      console.log(`  Manufacturer:     ${sensor.manufacturer}`);
      console.log(`  Model Id:         ${sensor.modelId}`);
      console.log('  Model:');
      console.log(`    Id:             ${sensor.model.id}`);
      console.log(`    Manufacturer:   ${sensor.model.manufacturer}`);
      console.log(`    Name:           ${sensor.model.name}`);
      console.log(`    Type:           ${sensor.model.type}`);
      console.log(`  Software Version: ${sensor.softwareVersion}`);
      console.log(`  Unique Id:        ${sensor.uniqueId}`);
      console.log(`  Config:`);
      console.log(`    On:             ${sensor.config.on}`);
      console.log(`  State:`);
      console.log(`    Last Updated:   ${sensor.state.lastUpdated}`);
      console.log();
    }
  })
  .catch(error => {
    console.log(error.stack);
  });