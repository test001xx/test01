pragma solidity ^0.4.13;

contract Medic {
	
	
	
    string wellcomeString = "Hello, world!";
    
    function getData() public constant returns (string) {
        return wellcomeString;
    }
    
    function setData(string newData) public {
        wellcomeString = newData;
    }
	 
	 
address owner = 0x0;
mapping (bytes32 => uint) dataRole; 
mapping (bytes32 => string) dataPolis;

struct PolisData {
	bool bValid;
	uint uiDateExpired;
	uint uiCategory;
	string sUsligi;
}
mapping (bytes32 => PolisData) dataPolisAttrs;


function getAddr() constant returns (address) {
	return owner;
}

function getOwner(address keyAddress) constant returns (bool) { //all
	if (owner == 0x0 || (owner != 0x0 && keyAddress == owner)) {
		return true;
	}

	return false;
}
function setOwner(address newOwner) returns(bool) { //only owner
	if (getOwner(msg.sender) == false) return false;
	if (newOwner == 0x0) return false;

	owner = newOwner;
	return true;
}
	
function getRole(address keyAddress) constant returns(uint) { //all
	return dataRole[sha3(keyAddress)];
}
function setRole(address userAddress, uint valRole) returns(bool) { //only owner
	if (getOwner(msg.sender) == false) return false;
	if (owner != 0x0 && userAddress == owner) return false; //ne mozet sebe delat role
	
	if (valRole != 1 && valRole != 10 && valRole != 11 && valRole != 20 && valRole != 30 && valRole != 40) return false;
	
	dataRole[sha3(userAddress)] = valRole;
	return true;
}

function getPolis(address keyAddress, address userAddress) constant returns(string) { //User || Registrators
	if (getOwner(keyAddress) == true) return '';
	
	var Role = getRole(keyAddress);
	if (Role == 10 || Role == 11 || Role == 20) {
		return dataPolis[sha3(userAddress)];
	}

	return '';
}
function setPolis(address userAddress, string valPolis) returns(bool) { //only Registrator
	if (getOwner(msg.sender) == true) return false;
	
	var Role = getRole(msg.sender);
	if (Role == 10 || Role == 11) {
		if (Role == 10) {	//11 mozet izmenit
			var Polis = getPolis(msg.sender, userAddress);
			if (isEmptyString(Polis) == false) return false; //if user has polis -> exit
		}
		//if (valPolis != Polis) {
			dataPolis[sha3(userAddress)] = valPolis;
		//}
		return true;
	}

	return false;
}

function getPolisInfo(address keyAddress) constant returns(bool, uint, uint, string) { //only User
	if (getOwner(keyAddress) == true) return (false, 0, 0, '');
	
	var Role = getRole(keyAddress);
	if (Role == 0) {
		var Polis = getPolis(keyAddress, keyAddress);
		if (isEmptyString(Polis) == false) {
			var keyPolis= sha3(Polis);
			return (dataPolisAttrs[keyPolis].bValid, dataPolisAttrs[keyPolis].uiDateExpired, dataPolisAttrs[keyPolis].uiCategory, dataPolisAttrs[keyPolis].sUsligi);
		}
	}
	return (false, 0, 0, '');
}
function setPolisInfo(string Polis, bool bValid, uint uiDateExpired, uint uiCategory, string sUsligi) returns(bool) { //only rabotodatel
	if (getOwner(msg.sender) == true) return false;
	
	var Role = getRole(msg.sender);
	if (Role == 30) {
		
		// check
		//var tmp = dataPolis[sha3(Polis)];
		//if (isEmptyString(tmp) == true) return false;
		
		dataPolisAttrs[sha3(Polis)] = PolisData(bValid, uiDateExpired, uiCategory, sUsligi);
		return true;
	}
	return false;
}

function getPolisResult(address keyAddress, address userAddress) constant returns(bool, uint, string) { //only Vrach
	if (getOwner(keyAddress) == true) return (false, 0, '');
	
	var Role = getRole(keyAddress);
	if (Role == 40) {
		var Polis = getPolis(keyAddress, userAddress);
		if (isEmptyString(Polis) == false) {
			var keyPolis= sha3(Polis);

			if (dataPolisAttrs[keyPolis].bValid == true || dataPolisAttrs[keyPolis].uiDateExpired > now) {
				return (true, dataPolisAttrs[keyPolis].uiCategory, dataPolisAttrs[keyPolis].sUsligi);
			}
		}
	}
	return (false, 0, '');
}

// helper functions

function isEmptyString(string sInp) constant returns(bool) {
    bytes memory bStr = bytes(sInp);
    if (bStr.length == 0) {
        return true;
    } else {
        return false;
    }
}
	
}