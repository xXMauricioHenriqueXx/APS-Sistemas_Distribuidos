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
		console.log(idw);
		data = data.filter(user => {
			return user.id === id;
		});
		
		res.json(data);
	}

	const insert = (req, res) => {
		
		let body = req.body;
		let data = readFile();		
		let id = 0;
		if(data.length > 0){
			id = parseInt(data[data.length - 1].id) + 1;
		}else {
			id = 1;
		}


		body.id = id.toString();

		isValid = data.filter(user => {
			return user.email == body.email;
		});

		if(isValid.length === 0){
			data.push(body);			
			if(writeFile(JSON.stringify(data))){
				res.status(200).send({msg: "Usuario cadastrado com sucesso!", isValid: true });
			}else{
				res.status(500).send({ msg : "Erro ao cadastrar o usuario", isValid: true });
			}
		}else {
			res.status(200).json({msg: "E-mail ja cadastrado", isValid: false });
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

	const auth = (req, res) => {
		let data = readFile();

		let userData = data.filter((user) => {
			return user.email == req.body.email && user.senha == req.body.senha;			
		});
		
		if(userData.length){
          	let reponseData = { email: userData[0].email, nome: userData[0].nome, id: userData[0].id, logged: true }
		
			res.status(200).json(reponseData);
		}else{
			res.status(401).json({msg:"Usuario não cadastrado", logged: false})
		}
	}

	return {
		findAll,
		findById,
		insert,
		remove,
		auth
	}
}

module.exports = Usuario;