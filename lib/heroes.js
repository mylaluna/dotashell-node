var heroDb = require('../database/heroes');

exports.getHeroes = getHeroes;
exports.getHero = getHero;

function getHeroes (callback) {
	setTimeout(function () {
		callback(null, heroDb);
	}, 500);
}


function getHero (heroId, callback) {
	getHeroes(function (error, data) {
	if (error) {
		return callback(error);
	}

	var result = data.find(function(item) {
		return item.id === heroId;
	});

	callback(null, result);
	});
}