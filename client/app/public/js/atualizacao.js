const page = "http://localhost:3003/login";
const id = localStorage.getItem("id");

const verify = () => {			
	let id = localStorage.getItem("id");
	let nome = localStorage.getItem("nome");
	
	if(!id || !nome){
		window.location.href = page
	}else {
		$("body").css("display","block");				
		let userNameSnippet = `<span class="user-name">Bem vindo, ${ nome }</span>`;
		$('.logout-session').prepend(userNameSnippet);
		
	}
}

const logout = () => {
	localStorage.removeItem("id");
	localStorage.removeItem("name");
	window.location.href = page;
}



$(document).ready(() => {
	const getInfoUser = () => {
		$.get(`http://localhost:3002/usuarios/${id}`, (response) => {
			response = JSON.parse(response);
			$("#email").val(response[0].email);
			$("#nome").val(response[0].nome);
		})
	}

	getInfoUser();
	$("#atualizacao").submit((e) => {	
		e.preventDefault();
	});
	

	$("#button").click(() => {
		let data = {
			nome: $("#nome").val(),
			email: $("#email").val()
		}		

		$.put(`http://localhost:3002/usuarios/${id}`, data, (response) => {

		});
	});
});