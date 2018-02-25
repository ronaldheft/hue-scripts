const huejay = require('huejay');
const config = require('./config');
const delay = require('timeout-as-promise');

const client = new huejay.Client({
	host: config.BRIDGE_IP,
	username: config.BRIDGE_USERNAME
});

const turnOffGroup = groupId => {
	return client.groups.getById(groupId).then(group => {
		group.on = false;
		return client.groups.save(group);
	}).catch(error => {
		console.log(error.stack);
	});
}

turnOffGroup(config.GROUPS.LIVING_ROOM);
turnOffGroup(config.GROUPS.HALL);
turnOffGroup(config.GROUPS.KITCHEN);
turnOffGroup(config.GROUPS.DINING_ROOM);

client.scenes.recall(config.SCENES.BEDROOM_BED_TABLE_DIMMED).then(() => {
	return delay(400);
}).then(() => {
	return client.lights.getById(config.LIGHTS.BEDROOM_TABLE).then(light => {
		light.on = false;
		light.transitionTime = 60 * 3; // 3 minutes
		return client.lights.save(light);
	});
}).catch(error => {
	console.log(error.stack);
});