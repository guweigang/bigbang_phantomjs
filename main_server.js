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
    


    if(!request.post) {
	response.write('<a href="http://www.shopbigbang.com">血拼大爆炸</a>');
	response.close();
	return;
    }
    
    var line;    
    line = request.post.url;
    
    var spiderModule = require('./router');
    var spider = spiderModule(line);

    var ret = {};

    if(spider === undefined) {
	ret.status = 500;
	ret.msg    = "not valid url";
	ret.data   = {};
	response.write(JSON.stringify(ret));
	response.close();
    } else {
    	spider(line, function (err, data) {
	    ret.status = 200;
	    ret.msg    = null;
	    ret.data   = data;
	    response.write(JSON.stringify(ret));
	    response.close();
	});
    }
    return ;
});