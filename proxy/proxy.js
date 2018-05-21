const http = require("http");
const app = require("express")();
const bodyParser = require("body-parser");
const request = require("request");

http.createServer(app).listen(3002, () => {
	console.log("Proxy load sucessfull");
});	


app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

let serverList = ["http://localhost:3001"];

const headers = {
	'Content-Type':'application/x-www-form-urlencoded'
}	

let options = {
	url: '',
	method: '',
	headers: headers,
	form: ''
}	

app.post('/usuarios/insert', (req, res) => {
	
	let server = serverList[0] + req.url
	let busyServer = serverList[0];

	options.url = server;
	options.method = req.method;	
	options.form = req.body;
	
	serverList.splice(0,1);
	
	request(options, (error, response, body) => {
    	if (!error && response.statusCode == 200) {        	
        	console.log(body);
        	serverList.push(busyServer);	
    	}
	});

});
