const huejay = require('huejay');
const config = require('./config');
const delay = require('timeout-as-promise');

const client = new huejay.Client({
	host: config.BRIDGE_IP,
	username: config.BRIDGE_USERNAME
});

// Fade the bedroom table lamp
client.lights.getById(7).then(light => {
	light.on = true;
	light.brightness = 76;
	light.colorTemp = 400;
	return client.lights.save(light);
}).then(light => {
	return delay(1000).then(() => light);
}).then(light => {
	light.on = false;
	light.transitionTime = 60 * 3; // 3 minutes
	return client.lights.save(light);
}).catch(error => {
	console.log(error.stack);
});