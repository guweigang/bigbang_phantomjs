var system = require("system");

function getStdin(err, data) {
    if (err) {
	console.log(err);
	phantom.exit(1);
	return;
    }
    var line;
    line = system.stdin.readLine();
    var spiderModule = require('./router');
    var spider = spiderModule(line);
    if(spider === undefined) {
	console.log("not valid url");
	phantom.exit(1);
	return ;
    }
    spider(line, function(err, data) {
	console.log(JSON.stringify(data));
	phantom.exit();
	return ;	
    });
}

getStdin();
