var system = require("system");

function getStdin(err, data) {

    if (err) {
	console.log(err);
	getStdin();
	return;
    }
    
    data && console.log(JSON.stringify(data));
    var line;
    line = system.stdin.readLine();
    var spiderModule = require('./router');
    var spider = spiderModule(line);
    if(spider === undefined) {
	console.log("not valid url");
	getStdin();
	return ;
    }

    spider(line, getStdin);
}

getStdin();
