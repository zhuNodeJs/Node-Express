/**
	定义一个幸运的饼干
**/
var fortunes = [
	'Conquer your fears or they will Conquer you.',
	'Rivers need springs.',
	"Do not fear what you don't know.",
	"you will have a pleasant surprise.",
	"Whenever possible, keep it simple."
];

exports.getFortune = function () {
	// body...	
	return fortunes[Math.floor(Math.random() * fortunes.length)];
}