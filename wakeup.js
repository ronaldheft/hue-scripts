const huejay = require('huejay');
const config = require('./config');

const client = new huejay.Client({
	host: config.BRIDGE_IP,
	username: config.BRIDGE_USERNAME
});

const setToDaylight = lightId => {
	return client.lights.getById(lightId).then(light => {
		light.on = true;
		light.brightness = 254;
		light.colorTemp = 219;
		light.transitionTime = 60 * 15; // 15 minutes
		return client.lights.save(light);
	}).catch(error => {
		console.log(error.stack);
	});
};


client.groups.getById(4).then(bedroom => {
	return Promise.all(bedroom.lightIds.map(lightId => setToDaylight(lightId)));
}).catch(error => {
	console.log(error.stack);
});