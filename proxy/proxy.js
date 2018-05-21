let http = require("http");
let app = require("express")();
let bodyParser = require("body-parser");
let request = require("request");

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
		
	options.url = req.url;
	options.method = req.method;	
	options.form = req.body;
	
	request(options, (error, response, body) => {
    	if (!error && response.statusCode == 200) {        	
        	console.log(body)	
    	}
	});

});
