const page = "http://localhost:3003/login";
const verify = () => {			
	let id = localStorage.getItem("id");
	let nome = localStorage.getItem("nome");
	
	if(!id || !nome){
		window.location.href = page
	}else {
		$("body").css("display","block");				
		let userNameSnippet = `<span class="user-name">Bem vindo, ${ nome }</span>`;
		$('.logout-session').prepend(userNameSnippet);
		getUsers();
	}
}
	
const getUsers = () => {
	let token = localStorage.getItem("token");
	
	let data = {
		token: token
	}
	
	$.get("http://localhost:3002/usuarios", data,(res) => {
		let listSnippet = `<ul>`;

		res = JSON.parse(res);
		res.forEach((user) => {
			
			if(user.nome != localStorage.getItem("nome")){
				listSnippet += `<li>${user.nome}</li>`;					
			}
		});
		listSnippet += `</ul>`;

		$(".lista").append(listSnippet);

	})
}


const logout = () => {
	localStorage.removeItem("id");
	localStorage.removeItem("name");
	window.location.href = page;
}
