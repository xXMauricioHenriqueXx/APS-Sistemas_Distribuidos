const request = require("request");

const proxyController = () => {

	let serverList = ["http://localhost:3001"];
	let busyServer = serverList[0];

	const headers = {
	  'Content-Type':'application/x-www-form-urlencoded'
	} 

	let options = {
	  url: '',
	  method: '',
	  headers: headers,
	  form: ''
	} 

	const insert = async(req, res) => {
  
		let server = serverList[0] + req.url;
		

		options.url = server;
		options.method = req.method;  
		options.form = req.body;
		
		serverList.splice(0,1);

		await requestHTTP(options, busyServer).then(result => {
			res.json(result);			
		}).catch(err => {
			console.log(err);
		});
	}

	const auth =  async(req, res) => {
  
		let server = serverList[0] + req.url;		
				
		options.url = server;
		options.method = req.method;  
		options.form = req.body;
		serverList.splice(0,1);

		await requestHTTP(options, busyServer).then(result => {
			res.json(result);
		}).catch(err => {
			console.log(err);
		});
	}

	const findAll =  async(req, res) => {
  
		let server = serverList[0] + req.url;		
				
		options.url = server;
		options.method = req.method;  
		serverList.splice(0,1);

		await requestHTTP(options, busyServer).then(result => {
			res.send(result);
		}).catch(err => {
			console.log(err);
		});
	}

	const requestHTTP = (options, busyServer) => {
		
		return new Promise((resolve, reject) => {
			request(options, (error, response, body) => {
				if (!error && response.statusCode == 200) {			
					serverList.push(busyServer); 
					resolve(body);					
				}
				if (!error && response.statusCode == 401) {			
					serverList.push(busyServer); 
					resolve(body); 
				}
				if(error || response.statusCode == 500){
					console.log(`Servidor ${ busyServer } fora de funcionamento.`);
					reject("Erro");
				}
			});			
		});
	}

	return {
		insert,
		auth,
		findAll
	}
}
module.exports = proxyController;