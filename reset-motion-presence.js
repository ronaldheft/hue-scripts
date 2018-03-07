const huejay = require('huejay');
const config = require('./config');

const client = new huejay.Client({
	host: config.BRIDGE_IP,
	username: config.BRIDGE_USERNAME
});

client.sensors.getById(process.argv[2]).then(sensor => {
  sensor.state.status = 0;
  return client.sensors.save(sensor);
}).catch(error => {
  console.log(error.stack);
});