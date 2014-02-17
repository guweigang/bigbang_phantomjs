var system = require("system");

function getStdin(err, data) {
    var ret = {};
    if (err) {
	ret.status = 500;
	ret.msg    = err;
	ret.data   = null;
	console.log(JSON.stringify(ret));
	phantom.exit(1);
	return;
    }
    var line;
    line = system.stdin.readLine();
    var spiderModule = require('./router');
    var spider = spiderModule(line);
    if(spider === undefined) {
	ret.status = 500;
	ret.msg    = "not valid url";
	ret.data   = null;
	console.log(JSON.stringify(ret));	
	phantom.exit(1);
	return ;
    }
    spider(line, function(err, data) {
	ret.status = 200;
	ret.msg    = null;
	ret.data   = data;
	console.log(JSON.stringify(ret));
	phantom.exit();
	return ;	
    });
}

getStdin();
