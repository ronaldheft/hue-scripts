const huejay = require('huejay');
const config = require('./config');

const client = new huejay.Client({
	host: config.BRIDGE_IP,
	username: config.BRIDGE_USERNAME
});

// Fade the bedroom table lamp
client.lights.getById(7).then(light => {
	light.on = false;
	light.transitionTime = 60 * 3; // 3 minutes
	return client.lights.save(light);
}).catch(error => {
	console.log(error.stack);
});