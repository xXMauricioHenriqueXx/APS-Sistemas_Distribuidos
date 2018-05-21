const fs = require("fs");
const bcrypt = require("bcryptjs");

const Usuario = () => {
		
	const file = "./app/db/database.txt";
	
	//Le o arquivo
	const readFile = () => {
		let data = fs.readFileSync(file);
		return JSON.parse(data);
	}


	const writeFile = (data) => {

		fs.writeFile(file, data, (err) => {

			if (err) {
    			console.log(err);
    			return false;
  			} 
		})
  		return true;
	}

	const findAll = (req, res) => {
		
		let data = readFile();	
		res.json(data);
	}

	const findById = (req, res) => {
		
		let data = readFile();
		const id = req.params.id;

		data = data.filter(user => {
			return user.id === id;
		});
		
		res.json(data);
	}

	const insert = (req, res) => {
		
		let body = req.body;
		let data = readFile();		
		
		let id = parseInt(data[data.length - 1].id) + 1;
		body.id = id.toString();

		data.push(body);
		
		if(writeFile(JSON.stringify(data))){
			res.status(200).send("Usuario cadastrado com sucesso!");
		}else{
			res.status(500).send("Erro ao cadastrar o usuario");
		}
		
	}

	const remove = (req, res) => {
		
		let data = readFile();
		const id =  req.params.id;

		data = data.filter(item => {
			return item.id != id;
		});

		if(writeFile(JSON.stringify(data))){
			res.status(200).send("Usuario removido com sucesso!");
		}else{
			res.status(500).send("Erro ao remover o usuario");
		}	

	}

	return {
		findAll,
		findById,
		insert,
		remove
	}
}

module.exports = Usuario;