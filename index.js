const express = require('express');

var port = process.env.PORT || 8080;
const app = express();
const TOKEN = 'dGVzdGU6MTIz'; // teste 123

var dateFormat = require('dateformat');

// app.use(express.json());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
//app.use('/validaConta', express.json());

console.log('Start..');
app.post('/login', 
       (req, resp)=> {
              console.log("/login "+req.body.username+"("+req.body.password+")");
              if(req.body.username === 'teste' && req.body.password === '123'){
                     resp.status(200).send({token: TOKEN});
              }else {
                     semAutorizacao(req, resp);
              }
       });

semAutorizacao = 
       (req, resp) => {
              let auth = 'Authorization';
              
              if(req.headers[auth] === undefined){
                     auth = auth.toLowerCase();
              }

              const msg = auth+" invalida! ["+req.headers[auth]+"]";
              console.log(msg);
              resp.status(401).send(msg);
       }

hasAuthorization = 
       (req) =>{
              let auth = 'Authorization';
              
              console.log(req.headers);
              if(req.headers[auth] === undefined){
                     auth = auth.toLowerCase();
              }
              if(req.headers[auth] === 'Basic '+ TOKEN ) {
                     console.log("[Basic "+ TOKEN+"]");
                     return true;
              }
			  return false;
       }
app.get('', 
       (req, resp)=> {
		   console.log("--------------------------------------------------------------------------------");
              console.log(req);
			resp.status(200).send("{ 'codigo': 'Ok' } ");
	   });

app.post('', 
       (req, resp)=> {
		   console.log("-##------------------------------------------------------------------------------");
           console.dir(req.body);
           console.log("--------------------------1");

			resp.status(200).send('{"speech": "It is turned on", "displayText": "It is turned on"} ');
	   });

app.listen(port);
