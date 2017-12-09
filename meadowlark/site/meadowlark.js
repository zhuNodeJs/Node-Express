var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js');

/**
**设置handlebars 视图引擎
**/
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 9900);

/**
  放置的静态文件的中间件,包含一些图片,public已经加载到路径中，所以在别处引用时，勿在路径前面加上public;
**/

app.use(express.static(__dirname+'/public'));

app.get('/',function (req, res) {
	res.render('home');
});

app.get('/about', function (req, res) {	
	res.render('about', { fortune: fortune.getFortune()});
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
});