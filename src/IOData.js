const fs = require('fs');
const neatCsv = require('neat-csv');
const ObjectsToCsv = require('objects-to-csv');
const fastCsv = require('fast-csv');

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

	/*
	A volte la precedente funzione saveCsv mi ha dato problemi, quindi ho introdotto una seconda funzione
	per scrivere i file csv. Nei casi in cui la prima funzionava, questa seconda non dava problemi.
	Le lascio entrambe.
	*/
	saveCsv2: (data, filename) => {
		const ws = fs.createWriteStream(`./data/${filename}.csv`);

		fastCsv.write(data, { headers: true })
			.pipe(ws);
	},


	readCsv: async (filename) => {
		const importData = fs.readFileSync(`./data/${filename}.csv`);
		const data = await neatCsv(importData, { separator: ',' });

		return data;
	},
};