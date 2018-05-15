const fs = require("fs");

const Usuario = () => {
	
	const findAll = (req, res) => {
		let data = fs.readFileSync("./app/db/database.txt");
		data = JSON.parse(data);
		res.send(data);
	}

	const findById = (req, res) => {
		
		let data = fs.readFileSync("./app/db/database.txt");
		const id = req.params.id;
		data = JSON.parse(data);
		data = data.filter(user => {
			return user.id === id;
		});

		res.send(data);
	}

	return {
		findAll,
		findById
	}
}

module.exports = Usuario;