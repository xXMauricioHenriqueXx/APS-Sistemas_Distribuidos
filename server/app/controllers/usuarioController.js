const fs = require("fs");

const Usuario = () => {
	
	const file = "./server/app/db/database.txt";

	const findAll = (req, res) => {
		let data = fs.readFileSync(file);
		data = JSON.parse(data);
		res.send(data);
	}

	const findById = (req, res) => {
		
		let data = fs.readFileSync(file);
		const id = req.params.id;
		data = JSON.parse(data);

		data = data.filter(user => {
			return user.id === id;
		});

		res.send(data);
	}

	const insert = (req, res) => {
		
		let body = req.body;
		let data = fs.readFileSync(file);
		
		data = JSON.parse(data);
		
		let id = parseInt(data[data.length - 1].id) + 1;
		body.id = id.toString();

		data.push(body);
		data = JSON.stringify(data);

		fs.writeFile(file, data, (err) => {
  			if (err) {
    			console.log(err);
  			} else {
  				console.log("Usuario inserido");
	    		res.send("Usuario inserido");
  			}
		})
	}

	return {
		findAll,
		findById,
		insert
	}
}

module.exports = Usuario;