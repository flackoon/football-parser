const { Client } = require('pg');
const config = require('../config');

const client = new Client({
	user: config.db.user,
	host: config.db.host,
	database: config.db.database,
	password: config.db.password
});

(async() => await client.connect())();

const test = (onSuccess, onError) => {
	client.query(`SELECT * FROM "Countries"`, (err, res) => {
		onSuccess(res, err);
	});
}

const dispose = () => client.end();

module.exports = {
	test,
	dispose
}