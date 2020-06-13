const fs = require('fs');
var dataFile = JSON.parse(fs.readFileSync('hackensort.json'));

/**
 * Sort JSON file by particular key
 * NOTE: Key should be a value that can be converted to interger with parseInt()
 * @param {String} key JSON key to use
 * @param {Object} data JSON object
 */
function sortBy(key, data) {
	return data.sort((a, b) => {
		var x = parseInt(a[key]); 
		var y = parseInt(b[key]);
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}
var sortedData = sortBy('yr', dataFile);

// write the sorted JSON to a new file or: console.dir(sortedData);
fs.appendFileSync('bkhacken.json', JSON.stringify(sortedData));