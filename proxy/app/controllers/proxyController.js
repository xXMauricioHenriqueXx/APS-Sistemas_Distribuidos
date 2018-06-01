const request = require("request");

const proxyController = () => {

	let serverList = ["http://localhost:3001", "http://localhost:3004"];
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
  			
		for(let i = 0; i < serverList.length; i++){

			let server = serverList[i] + req.url;			

			options.url = server;
			options.method = req.method;  
			options.form = req.body;
			
			await requestHTTP(options, "").then(result => {
				res.send(result);			
			}).catch(err => {
				console.log(err);			
			});					
		}
		
	}

	const auth =  async(req, res) => {
  
		let server = serverList[0] + req.url;		
		let error = false;
		options.url = server;
		options.method = req.method;  
		options.form = req.body;
		serverList.splice(0,1);

		await requestHTTP(options, busyServer).then(result => {
			console.log(result);
			res.send(result);
		}).catch(err => {
			console.log(err);
			if(err){
				error = true;
			}			
		});
		if(error){
			let server = serverList[0] + req.url;	
			options.url = server;			
			await faultManager(error, options).then(result => { 
				res.send(result);
			});			
		}

	}

	const findAll =  async(req, res) => {
  
		let server = serverList[0] + req.url;		
		let error = false;
		options.url = server;
		options.method = req.method;  
		serverList.splice(0,1);

		await requestHTTP(options, busyServer).then(result => {
			res.send(result);
		}).catch(err => {
			console.log(err);
			error = true;
		});
		if(error){
			let server = serverList[0] + req.url;	
			options.url = server;			
			await faultManager(error, options).then(result => { 
				res.send(result);
			});			
		}
	}

	const requestHTTP = (options, busyServer) => {
		
		return new Promise((resolve, reject) => {
			request(options, (error, response, body) => {
				if (!error && response.statusCode == 200) {			
					if(busyServer){
						serverList.push(busyServer); 						
					}
					resolve(body);					
				}
				if (!error && response.statusCode == 401) {			
					if(busyServer){
						serverList.push(busyServer); 
					}	
					resolve(body); 
				}
				if(error || response.statusCode == 500){
					console.log(`Servidor ${ busyServer } fora de funcionamento.`);
					reject("Internal server error");						
				}
			});			
		});
	}

	const faultManager = async(error, options) => {
		let ready = false;
		let data;
		if(serverList.length > 0){
			while(error){
				await requestHTTP(options,  serverList[0]).then(result => {
					error = false;
					ready = true;
					data = result;
				}).catch(err => console.log(err));

				if(ready){
					return data;
				}
			}
		}
	}

	return {
		insert,
		auth,
		findAll
	}
}
module.exports = proxyController;