//NodeJS

var http = require('http');
var url = require('url');
var qs = require('querystring');

var Web3 = require('web3');
var util = require('ethereumjs-util');
var iTx = require('ethereumjs-tx');

var coder = require('web3/lib/solidity/coder');
var CryptoJS = require('crypto-js');

var contractAddress = '0xe2b6cf3863240892d59664d209a28289a73ef644';


function SendTransact(response, functionName, types, args, address, key) {
	var fullName = functionName + '(' + types.join() + ')';
	var signature = CryptoJS.SHA3(fullName,{outputLength:256}).toString(CryptoJS.enc.Hex).slice(0, 8);
	var dataHex = signature + coder.encodeParams(types, args);
	var data = '0x'+dataHex;
						
	var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));
	var nonce = web3.toHex(web3.eth.getTransactionCount(address));
	var gasPrice = web3.toHex(web3.eth.gasPrice);
	var gasLimitHex = web3.toHex(300000); 
	var rawTx = { 'nonce': nonce, 'gasPrice': gasPrice, 'gasLimit': gasLimitHex, 'from': address, 'to': contractAddress, 'data': data};
	var tx = new iTx(rawTx);
						
	var privateKey = new Buffer(key, 'hex');
	tx.sign(privateKey);
	var serializedTx = '0x'+tx.serialize().toString('hex');
						
	web3.eth.sendRawTransaction(serializedTx, function(err, txHash){ 
		//console.log(err, txHash)
		response.writeHead(200, {"Content-Type": "text/plain"});
		if (err != null) {
			response.end('<error>' + err + '>');
		} else {
			response.end('<success>' + txHash + '>');
		}
	});
}


var server = http.createServer(function(request, response) {
	//console.log('>>');
	//var contractAddress = '0xaa862ddac09f6736a61e1124040fd883a6533c19';
	
	if (request.method == 'POST') {
		console.log('>>POST');
		
		var body = '';
		
		request.on('data', function (data) {
			body += data;
			if (body.length > 1e6) // Too much POST data, kill the connection! // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
				request.connection.destroy();
		});

		request.on('end', function () {
			var post = qs.parse(body);
			// use post['blah'], etc. //console.log(post.age);
			
			// 
			
			if (post['test']) {
						//var functionName = 'setOwner';
						//var types = ['address'];
						//var args = [post.useraddress];
						SendTransact(response, functionName, types, args, '0x627306090abab3a6e1400e9345bc60c78a8bef57', 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3');				
			}
			
			if (post['address']) { //user address
				var address = post.address; //'0x627306090abab3a6e1400e9345bc60c78a8bef57';
				var key = post.key; //'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';
				
				//var functionName = 'setData';
				//var types = ['string'];
				//var args = ['new hello'];
				
				if (post['func']) {
					
					if (post['key'] && post.func == 'setowner' && post['useraddress']) {
						var functionName = 'setOwner';
						var types = ['address'];
						var args = [post.useraddress];
						SendTransact(response, functionName, types, args, address, key);
					}
					
					if (post.func == 'getrole') {
						
						//var functionName = 'getAddr';
						//var types = [];
						//var args = [];
						//SendTransact(response, functionName, types, args, address, 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3');						
						
			var address = post.address;
			
			var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/IRJ14Gy6plYNGA5DJh0z"));
			var ABI = [{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"setOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"Polis","type":"string"},{"name":"bValid","type":"bool"},{"name":"uiDateExpired","type":"uint256"},{"name":"uiCategory","type":"uint256"},{"name":"sUsligi","type":"string"}],"name":"setPolisInfo","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"getData","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"keyAddress","type":"address"}],"name":"getRole","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"valPolis","type":"string"}],"name":"setPolis","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"newData","type":"string"}],"name":"setData","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"keyAddress","type":"address"}],"name":"getPolisInfo","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"keyAddress","type":"address"},{"name":"userAddress","type":"address"}],"name":"getPolis","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"valRole","type":"uint256"}],"name":"setRole","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"keyAddress","type":"address"},{"name":"userAddress","type":"address"}],"name":"getPolisResult","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"sInp","type":"string"}],"name":"isEmptyString","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"getAddr","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"keyAddress","type":"address"}],"name":"getOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"}];

			
			var contractObject = web3.eth.contract(ABI);
			var contractInstance = contractObject.at(contractAddress);

				var out = contractInstance.getAddr();
				
				response.writeHead(200, {"Content-Type": "text/plain"});
				response.end('<' + out + '>');			
						
						
					}

					if (post.func == 'setrole' && post['useraddress'] && post['valrole']) {
						//console.log('setrole');
						//response.writeHead(200, {"Content-Type": "text/plain"});
						//response.end('<success>' + post.useraddress + '>');
						
						var functionName = 'setRole';
						var types = ['address', 'uint'];
						var args = [post.useraddress, post.valrole];
						SendTransact(response, functionName, types, args, address, key);
					}					
					
					if (post.func == 'setpolis'  && post['useraddress'] && post['valpolis']) {
						var functionName = 'setPolis';
						var types = ['address', 'string'];
						var args = [post.useraddress, post.valpolis];
						SendTransact(response, functionName, types, args, address, key);
					}
					
					if (post.func == 'setpolisinfo' && post['valpolis'] && post['isvalid'] && post['date'] && post['category'] && post['uslugi']) {
						var functionName = 'setPolisInfo';
						var types = ['string', 'bool', 'uint', 'uint', 'string'];
						var args = [post.valpolis, post.isvalid, post.date, post.category, post.uslugi];
						SendTransact(response, functionName, types, args, address, key);
					}					
					
				}
				
			}
			
		});
		
	}
	
	if (request.method == 'GET') {
		console.log('>>GET');
		var queryData = url.parse(request.url, true).query;
		response.writeHead(200, {"Content-Type": "text/plain"});

		// ?address=0x123&func=getpolis

		if (queryData.address) { //user address
			var address = queryData.address;
			
			var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/IRJ14Gy6plYNGA5DJh0z"));
			var ABI = [{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"setOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"Polis","type":"string"},{"name":"bValid","type":"bool"},{"name":"uiDateExpired","type":"uint256"},{"name":"uiCategory","type":"uint256"},{"name":"sUsligi","type":"string"}],"name":"setPolisInfo","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"keyAddress","type":"address"}],"name":"getRole","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"valPolis","type":"string"}],"name":"setPolis","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"keyAddress","type":"address"}],"name":"getPolisInfo","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"keyAddress","type":"address"},{"name":"userAddress","type":"address"}],"name":"getPolis","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"valRole","type":"uint256"}],"name":"setRole","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"keyAddress","type":"address"},{"name":"userAddress","type":"address"}],"name":"getPolisResult","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"sInp","type":"string"}],"name":"isEmptyString","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"keyAddress","type":"address"}],"name":"getOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"}];
			var contractObject = web3.eth.contract(ABI);
			var contractInstance = contractObject.at(contractAddress);
			
			/*
			if (queryData.func == 'getowner') {
			}
			*/
			
			if (queryData.func == 'getrole' && queryData.address) {
				var out = contractInstance.getRole(queryData.address);
				//web3.eth.sendTransaction({to:Contractaddress, from:Accountaddress, data: getData});
				response.end('<' + out + '>');
			}
			
			/*
			if (queryData.func == 'getpolis' && queryData.useraddress) {
				var out = contractInstance.getPolis(useraddress);
				response.end('<' + out + '>');
			}
			*/

			if (queryData.func == 'getpolisinfo') {
				var out = contractInstance.getPolisInfo();
				response.end('<' + out + '>');
			}
			
			if (queryData.func == 'getpolisresult' && queryData.useraddress) {
				var out = contractInstance.getPolisResult(queryData.useraddress);
				response.end('<' + out + '>');
			}			
			
		}
		
	};
  
  
});

server.listen(8080, "localhost");
