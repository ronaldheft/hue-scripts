const huejay = require('huejay');
const config = require('./config');
const delay = require('timeout-as-promise');

const client = new huejay.Client({
	host: config.BRIDGE_IP,
	username: config.BRIDGE_USERNAME
});

// Start the lights dimmed
client.scenes.recall(config.SCENES.BEDROOM_FULLY_DIMMED).then(() => {
	return delay(400);
}).then(() => {
	return client.groups.getById(config.GROUPS.BEDROOM).then(bedroom => {
		bedroom.brightness = 254;
		bedroom.colorTemp = 219;
		bedroom.transitionTime = 60 * 15; // 15 minutes
		return client.groups.save(bedroom);
	});
}).catch(error => {
	console.log(error.stack);
});