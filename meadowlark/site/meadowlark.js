var express = require('express');

var app = express();

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

/**
**设置handlebars 视图引擎
**/
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 9900);

/**
  放置的静态文件的中间件
**/
app.use(express.static(__dirname+'/public'));

app.get('/',function (req, res) {
	res.render('home');
});

app.get('/about', function (req, res) {
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];	
	res.render('about', { fortune: randomFortune});
});

// 订制404 页面

app.use(function (req, res) {
	res.status(404);
	res.render('404');
});

// 订制500 页面

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function () {
	console.log('Express started on http: //localhost:' + app.get('port')+';press Ctrl-C to terminate.');
})