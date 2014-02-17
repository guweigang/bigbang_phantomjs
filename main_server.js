var server = require('webserver').create();
var system = require('system');

if (system.args.length !== 2) {
    console.log('Usage: main_server.js <portnumber>');
    phantom.exit(1);
}

var port = system.args[1];

service = server.listen(port, function (request, response) {
    console.log('Request received at ' + new Date());
    response.statusCode = 200;
    response.headers = {
        'Cache': 'no-cache',
        'Content-Type': 'text/plain;charset=utf-8'
    };

    if(request.url.indexOf(".ico") !== -1) {
	response.close();	
	return ;
    }
    
    var line;
    line = request.url.split('=')[1];

    var spiderModule = require('./router');
    var spider = spiderModule(line);

    if(spider === undefined) {
	response.write("not valid url");
	response.close();
    } else {
    	spider(line, function (err, data) {
	    response.write(JSON.stringify(data));
	    response.close();
	});
    }
    return ;
});