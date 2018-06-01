$(document).ready(() => {	
	let nome = $("input[name=nome]");
	let email = $("input[name=email]");
	let senha = $("input[name=senha]");
	
	$("#cadastrar").click(()=> {

		const data = {
			"nome": nome.val(),
			"email": email.val(),
			"senha": senha.val()
		}

		$.post('http://localhost:3002/usuarios/insert', data, (res) => {
			res = JSON.parse(res);

			if(res.isValid){
				nome.val("");
				email.val("");
				senha.val("");
				window.location.href = "http://localhost:3003";				
			}else {
				let errorSnippet = `<span class="alert alert-danger">${res.msg}</span>`;
				$(".error-section").html(errorSnippet);
				$(".alert").fadeOut(8000);
				email.val("");
				email.focus();
			}
		});
	});
	
	$("#cadastro-form").submit((e) => {	
		e.preventDefault();
	});
});