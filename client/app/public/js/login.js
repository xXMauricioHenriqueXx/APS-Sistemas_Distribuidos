$(document).ready(() => {
	$("#button").click(() => {
				
		let email = $("input[name=email]").val();
		let senha = $("input[name=senha]").val();

		let data = {
			email: email,
			senha: senha
		}

		$.post("http://localhost:3002/auth", data, (res) => {
			res = JSON.parse(res);
			
			if(res.logged){
				localStorage.setItem("nome", res.nome);
				localStorage.setItem("id", res.id);
				window.location.href = "http://localhost:3003/";
			}else {
				let errorSnippet = `<span class="alert alert-danger">${res.msg}</span>`;
				$(".error-section").html(errorSnippet);
				$(".alert").fadeOut(8000);
			}
		});			
	});

	$("#login").submit((e) => {	
		e.preventDefault();
	});
	
});