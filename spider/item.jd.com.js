module.exports = function (url, cb) {
    var page = require('webpage').create(); 
    page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.76 Safari/537.36';

    page.onResourceRequested = function(request, network) {
	if (request.url.indexOf('.css')     !== -1
	    || request.url.indexOf('.png')  !== -1
	    // || request.url.indexOf('.jpg')  !== -1
	    // || request.url.indexOf('.jpeg') !== -1
            || request.url.indexOf('.otf')  !== -1
	    || request.url.indexOf('.swf')  !== -1
	   ) {
	    // console.log("abort " + request.url);
	    network.abort();
	}
    };

    page.onResourceReceived = function(response) {};

    page.onError = function(msg, trace) {
        return ;
    };

    page.open(url, function(status) {
    	if (status !== 'success') {
	    cb('Error: Unable to access network!');
    	} else {
    	    var data = page.evaluate(function() {
    		var json_data = {};
    		json_data.price = document.getElementById('jd-price').textContent;
    		json_data.name = document.querySelector('div#name>h1:first-child').textContent;
    		var img_url_arr = document.querySelectorAll('#spec-list li img');
    		json_data.s_imgs = [];
		json_data.m_imgs = [];		
		json_data.l_imgs = [];			
    		for(var i in img_url_arr){
    		    if(img_url_arr[i].nodeType && (img_url_arr[i].nodeType == 1)){
    			json_data.s_imgs.push(img_url_arr[i].src);
			json_data.m_imgs.push(img_url_arr[i].src.replace("/n5/", "/n1/"));
			json_data.l_imgs.push(img_url_arr[i].src.replace("/n5/", "/n0/"));
    		    }
    		}
    		return json_data;
    	    });
    	    // console.log(JSON.stringify(data));
    	}
	if(cb) {
	    cb(null, data);
	}
    });
}
