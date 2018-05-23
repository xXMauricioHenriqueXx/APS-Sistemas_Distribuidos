$(document).ready(() => {	
	$("#cadastrar").click(()=> {
		let nome = $("input[name=nome]").val();
		let email = $("input[name=email]").val();
		let senha = $("input[name=senha]").val();

		const data = {
			"nome": nome,
			"email": email,
			"senha": senha
		}

		$.post('http://localhost:3002/usuarios/insert', data, (res) => {
			console.log(res);
		});
	});
});