var express = require('express');
var app = express();
////////////////////////////////
/// them socket IO
/////////////////////
var server = require('http').Server(app);	
var io = require('socket.io')(server);
var ip = require ('ip');

app.set("view engine", "ejs");
app.set("views","./views");
server.listen(process.env.PORT || 3000);

app.get ("/", function(req,res){
	res.render("trangchu");
	
});

io.on('connection', function(socket) {
	console.log('client connected')
	
	socket.on('disconnect', function() {
		console.log("Disconnect ")
	})
});


var led1 ,led2 ,led3,ledTest ;
led1 = 1;
led2 =1;
led3 = 1;

var data = [led1,led2,led3];
var ledData = {
		"led": data,
		
	};
app.get ("/coords",function(req,res){
		data = [led1,led2,led3];
		ledData = {
		"led": data
	};
	led1+=1;
	res.send(JSON.stringify(ledData) +"<br> <br> <br>"+ ip.address());
		//io.emit('LED',ledData);
		console.log (ledData);	
	//res.send(ip.address());
});
app.get ("/coords/:command", function(req,res){
	var input = req.params.command;
	if (input == 'clear'){
	led1 = 1;
	res.send("clear");}
	else {
		
		led3 = input;
		data = [led1,led2,led3];
		ledData = {
		"led": data
	};
		res.send (ledData);
		console.log(ledData);
	}
	
})