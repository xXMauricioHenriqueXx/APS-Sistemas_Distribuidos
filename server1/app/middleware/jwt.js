const jwt = require('jsonwebtoken');
const SECRET = "jTZx98b52vgFLçcr$#2";

const Authentication = () => {

	const.verify = (req, res, next) =>{
		let token 	= req.headers['x-access-token'];
		let id		= req.headers['id'];
	
		if(token){
			console.log("Verificando token...");
			jwt.verify(token, SECRET, (err, decoded) => {
				if(err){
					console.log("Não foi possivel decodificar o token");
					res.sendStatus(401);
				}
				console.log("Token verificado e válido");
				console.log("verificando ID do usuario");
				
				req.usuario = decoded;
			
				if(req.usuario.id == id){
					console.log('ID válido.');
					next();
				}else{
					console.log("ID não modificado. Não compativel com token");
					res.sendStatus(401);
				}
			
			});			
		}else{
			console.log("Token não enviado");
			res.sendStatus(401);
		}
	}

	return {
		verify
	}
}

module.exports = Authentication;

