const fs = require("fs");

const Usuario = () => {
		
	const file = "./app/db/database.txt";
	
	//Le o arquivo
	const readFile = () => {
		let data = fs.readFileSync(file);
		return JSON.parse(data);
	}


	const writeFile = (data, msg) => {

		fs.writeFile(file, data, (err) => {

			if (err) {
    			console.log(err);
  			} else {  				
	    		console.log(msg);
	    		return true;
  			}
		})
	}

	const findAll = (req, res) => {
		
		let data = readFile();	
		res.send(data);
	}

	const findById = (req, res) => {
		
		let data = readFile();
		const id = req.params.id;

		data = data.filter(user => {
			return user.id === id;
		});

		res.send(data);
	}

	const insert = (req, res) => {
		
		let body = req.body;
		let data = readFile();		
		
		let id = parseInt(data[data.length - 1].id) + 1;
		body.id = id.toString();

		data.push(body);
		
		writeFile(JSON.stringify(data), "Usuario cadastrado com sucesso!");
		
	}

	const remove = (req, res) => {
		
		let data = readFile();
		const id =  req.params.id;

		data = data.filter(item => {
			return item.id != id;
		});

		writeFile(JSON.stringify(data), "Usuario deletado com sucesso!");	

	}

	return {
		findAll,
		findById,
		insert,
		remove
	}
}

module.exports = Usuario;