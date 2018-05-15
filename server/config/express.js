const app 			= require("express")();
const router 		= require("../app/router");
const bodyParser 	= require('body-parser');

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use((req, res, next) => {
	console.log("passou pelo middleware");
	next();
});
app.use(router);
	


module.exports = app;