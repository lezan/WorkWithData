const fs = require('fs');
const neatCsv = require('neat-csv');
const ObjectsToCsv = require('objects-to-csv');

module.exports = {
	saveJson: (json, filename) => {
		fs.writeFileSync(`./data/${filename}.json`, JSON.stringify(json));
	},

	readJson: (filename) => {
		const importData = fs.readFileSync(`./data/${filename}.json`);
		const data = JSON.parse(importData);

		return data;
	},

	saveCsv: async (data, filename) => {
		const csvData = new ObjectsToCsv(data);
	 	await csvData.toDisk(`./data/${filename}.csv`);
	},

	readCsv: async (filename) => {
		const importData = fs.readFileSync(`./data/${filename}.csv`);
		const data = await neatCsv(importData, { separator: ',' });

		return data;
	},
};