/*var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello Http');
});

server.listen(8080);*/

var Web3 = require('web3');
var util = require('ethereumjs-util');
var tx = require('ethereumjs-tx');
//var lightwallet = require('eth-lightwallet');
//var txutils = lightwallet.txutils;

var web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.infura.io/')
);

var address = '0x627306090abab3a6e1400e9345bc60c78a8bef57';
var key = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';

var bytecode = '60606040526040805190810160405280600d81526020017f48656c6c6f2c20776f726c6421000000000000000000000000000000000000008152506000908051906020019061004f9291906100a2565b506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550341561009d57600080fd5b610147565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100e357805160ff1916838001178555610111565b82800160010185558215610111579182015b828111156101105782518255916020019190600101906100f5565b5b50905061011e9190610122565b5090565b61014491905b80821115610140576000816000905550600101610128565b5090565b90565b610870806101566000396000f30060606040523615610081576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100865780633bc5de30146100d7578063442767331461016657806347064d6a146101b357806374277a6314610210578063a74c2bb61461026a578063fa544161146102bf575b600080fd5b341561009157600080fd5b6100bd600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610310565b604051808215151515815260200191505060405180910390f35b34156100e257600080fd5b6100ea6103a2565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561012b5780820151818401525b60208101905061010f565b50505050905090810190601f1680156101585780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561017157600080fd5b61019d600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061044b565b6040518082815260200191505060405180910390f35b34156101be57600080fd5b61020e600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506104c1565b005b341561021b57600080fd5b610250600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506104dc565b604051808215151515815260200191505060405180910390f35b341561027557600080fd5b61027d61066e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156102ca57600080fd5b6102f6600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610699565b604051808215151515815260200191505060405180910390f35b600080151561031e33610699565b1515141561032f576000905061039d565b60008273ffffffffffffffffffffffffffffffffffffffff161415610357576000905061039d565b81600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600190505b919050565b6103aa61078b565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104405780601f1061041557610100808354040283529160200191610440565b820191906000526020600020905b81548152906001019060200180831161042357829003601f168201915b505050505090505b90565b60006002600083604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014019150506040518091039020600019166000191681526020019081526020016000205490505b919050565b80600090805190602001906104d792919061079f565b505b50565b60008015156104ea33610699565b151514156104fb5760009050610668565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141580156105915750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16145b1561059f5760009050610668565b600182141580156105b15750600a8214155b80156105be5750600b8214155b80156105cb575060148214155b80156105d85750601e8214155b80156105e5575060288214155b156105f35760009050610668565b816002600085604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140191505060405180910390206000191660001916815260200190815260200160002081905550600190505b92915050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b600080600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16148061077357506000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141580156107725750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b5b156107815760019050610786565b600090505b919050565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106107e057805160ff191683800117855561080e565b8280016001018555821561080e579182015b8281111561080d5782518255916020019190600101906107f2565b5b50905061081b919061081f565b5090565b61084191905b8082111561083d576000816000905550600101610825565b5090565b905600a165627a7a7230582062852582362a2d3e32d4711b496d3a0bb70c7760c7580a882020bb6c4d8e871a0029';

var interface = [{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"setOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"getData","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"keyAddress","type":"address"}],"name":"getRole","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"newData","type":"string"}],"name":"setData","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"valRole","type":"uint256"}],"name":"setRole","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"getAddr","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"keyAddress","type":"address"}],"name":"getOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"}];


function sendRaw(rawTx) {
    var privateKey = new Buffer(key, 'hex');
    var transaction = new tx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendRawTransaction(
    '0x' + serializedTx, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

var rawTx = {
    nonce: web3.toHex(web3.eth.getTransactionCount(address)),
    gasLimit: web3.toHex(800000),
    gasPrice: web3.toHex(20000000000),
    data: '0x' + bytecode + '0000000000000000000000000000000000000000000000000000000000000005'
};

sendRaw(rawTx);

//0xfcc9746f410c7238d019d19f92503f2a8b19f9f2f9c6ab98faf499162e9af102
//https://rinkeby.etherscan.io/tx/0xfcc9746f410c7238d019d19f92503f2a8b19f9f2f9c6ab98faf499162e9af102
//https://rinkeby.etherscan.io/address/0xb3756baf00a7e62ee5a18a32ea39db2af5ede7fe

//0x8fd0f8f68791d5b1f7ce05fa153c70cb34c1a8998934d34ceca42dd911d9c211
//https://rinkeby.etherscan.io/tx/0x8fd0f8f68791d5b1f7ce05fa153c70cb34c1a8998934d34ceca42dd911d9c211
//https://rinkeby.etherscan.io/address/0xaa862ddac09f6736a61e1124040fd883a6533c19

//0x8f3d2f6280fc0be0f23ba3df2c85d32c02811fec37587cbebd9fd109a7436573