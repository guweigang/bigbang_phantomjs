var system = require('system');

if (system.args.length !== 2) {
    console.log('Usage: main_cli.js <portnumber>');
    phantom.exit(1);
}

var line;    
line = system.args[1];

var spiderModule = require('./router');
var spider = spiderModule(line);

var ret = {};

if(spider === undefined) {
    ret.status = 500;
    ret.msg    = "not valid url";
    ret.data   = {};
    console.log(JSON.stringify(ret));
    phantom.exit(1);
} else {
    spider(line, function (err, data) {
	ret.status = 200;
	ret.msg    = null;
	ret.data   = data;
	console.log(JSON.stringify(ret));
	phantom.exit();
    });
}
