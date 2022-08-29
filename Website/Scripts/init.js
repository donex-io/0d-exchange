window.derivatives = []
if(document.URL.indexOf("od.exchange") >= 0)
{
	// Compliler: v0.5.7+commit.6da8b019

	var WITHDRAW_ADDRESS_TESTNET = "0xeb29F8326f5d4DB5409fa4bE48AB8dAFb90A1AD8"
	var WITHDRAW_ADDRESS_MAINNET = "0x0b564F0aD4dcb35Cd43eff2f26Bf96B670eaBF5e"
	console.log("Withdraw function contract: https://etherscan.io/address/0x0b564f0ad4dcb35cd43eff2f26bf96b670eabf5e")

	var ORACLE_ADDRESS_TESTNET = "0x63f329c7603E571ee4449C2a84b20DD0B943Df24"
	var ORACLE_ADDRESS_MAINNET = "0xE8013bD526100Ebf67ace0E0F21a296D8974f0A4"
	console.log("Oracle contract: https://etherscan.io/address/0xE8013bD526100Ebf67ace0E0F21a296D8974f0A4")

	var FACTORY_ADDRESS_TESTNET= "0xeb29F8326f5d4DB5409fa4bE48AB8dAFb90A1AD8"
	var FACTORY_ADDRESS_MAINNET = "0x77d774C419d0d6357F7a23F0f512E63528c77932"
	console.log("Master contract: https://etherscan.io/address/0x77d774C419d0d6357F7a23F0f512E63528c77932")

	var FREEBIE_ADDRESS_TESTNET = "0xb9E5F22e6f0Dce846e0a2f46B453CAF880d6AEa8"
	var FREEBIE_ADDRESS_MAINNET = "0xb9E5F22e6f0Dce846e0a2f46B453CAF880d6AEa8"
	console.log("Freebie contract: https://etherscan.io/address/0xb9E5F22e6f0Dce846e0a2f46B453CAF880d6AEa8")
}
else // debugging
{
	// Compliler: v0.5.7+commit.6da8b019
	console.log("DEBUGGING MODE");

	var WITHDRAW_ADDRESS_TESTNET = "0xD23a0A9d19e8793CAef3Faab26D390282A65EDad"

	var FACTORY_ADDRESS_TESTNET= "0xeb29F8326f5d4DB5409fa4bE48AB8dAFb90A1AD8"

	var ORACLE_ADDRESS_TESTNET = "0x5e65fF5a5C32D897B1810f39323a7471f4edaE04"

	var FREEBIE_ADDRESS_TESTNET = "0x079911c17921173715ABF44D7afbA9acfdf368d6"

	console.log("Master contract address: " + FACTORY_ADDRESS_TESTNET);
}


var factoryABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "withdrawFees",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "validDueDate",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "balanceOfFactory",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "dueDate",
				"type": "uint256"
			}
		],
		"name": "settle",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "creator",
				"type": "address"
			},
			{
				"name": "long",
				"type": "bool"
			},
			{
				"name": "dueDate",
				"type": "uint256"
			},
			{
				"name": "strikePrice",
				"type": "uint256"
			}
		],
		"name": "createConditionalPayment",
		"outputs": [
			{
				"name": "newDerivativeAddress",
				"type": "address"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "dueDate",
				"type": "uint256"
			},
			{
				"name": "valid",
				"type": "bool"
			}
		],
		"name": "setValidDueDate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "contractAddress",
				"type": "address"
			}
		],
		"name": "NewContract",
		"type": "event"
	}
]
var derivativeABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "creator",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "unsettledWithdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "stakes",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isSettled",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "withdrawFunctionsAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "addStake",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newStrikePrice",
				"type": "uint256"
			}
		],
		"name": "changeStrikePrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "dueDate",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "creatorLong",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalStakeCounterparties",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "requestedStrikePrice",
				"type": "uint256"
			}
		],
		"name": "signContract",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "countCounterparties",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "reduceStake",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "strikePrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "masterAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "settlementPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_creator",
				"type": "address"
			},
			{
				"name": "_long",
				"type": "bool"
			},
			{
				"name": "_dueDate",
				"type": "uint256"
			},
			{
				"name": "_strikePrice",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ContractAltered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "participant",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "stake",
				"type": "uint256"
			}
		],
		"name": "UpdatedParticipant",
		"type": "event"
	}
]
var oracleABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "available",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "date",
				"type": "uint256"
			}
		],
		"name": "sendPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "date",
				"type": "uint256"
			},
			{
				"name": "priceAtDate",
				"type": "uint256"
			}
		],
		"name": "setPrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "date",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "PriceAvailable",
		"type": "event"
	}
]
var withdrawABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "makerLong",
				"type": "bool"
			},
			{
				"name": "stakeMemory",
				"type": "uint256"
			},
			{
				"name": "settlementPrice",
				"type": "uint256"
			},
			{
				"name": "strikePrice",
				"type": "uint256"
			},
			{
				"name": "totalStakeCounterparties",
				"type": "uint256"
			}
		],
		"name": "amountCreator",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "makerLong",
				"type": "bool"
			},
			{
				"name": "stakeMemory",
				"type": "uint256"
			},
			{
				"name": "settlementPrice",
				"type": "uint256"
			},
			{
				"name": "strikePrice",
				"type": "uint256"
			}
		],
		"name": "amountCounterparty",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	}
]
var freebieABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "long",
				"type": "bool"
			},
			{
				"name": "dueDate",
				"type": "uint256"
			},
			{
				"name": "strikePrice",
				"type": "uint256"
			}
		],
		"name": "createContractWithBounty",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdrawBounty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "unsuccessfulCreator",
				"type": "address"
			}
		],
		"name": "withdrawPermission",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdrawUnusedBounties",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_masterAddress",
				"type": "address"
			},
			{
				"name": "_maxNumberOfBounties",
				"type": "uint8"
			},
			{
				"name": "_deadline",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "bounty",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "deadline",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "masterAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "maxNumberOfBounties",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfGivenBounties",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]


function init()
{
  checkUserAccount().then
  (
    user =>
    {
			// Set to MAINNET or TESTNET
			window.web3.eth.net.getNetworkType().then(
				netId =>
				{
					var factoryAddress = ""
					var freebieAddress = ""
					switch (netId) {
				    case "main":
				      console.log('Welcome to OD.exchange! You are live on the Ethereum mainnet.')
							analyticsDB('blockchain', 'MAIN');
							document.getElementById('mainnetConnection').style.display = "inline-block";
							factoryAddress = FACTORY_ADDRESS_MAINNET
							freebieAddress = FREEBIE_ADDRESS_MAINNET
				      break
				    case "ropsten":
				      console.log('You can test OD.exchange on the Ropsten testnet now.')
							analyticsDB('blockchain', 'ROPSTEN');
							document.getElementById('ropstenConnection').style.display = "inline-block";
							factoryAddress = FACTORY_ADDRESS_TESTNET
							freebieAddress = FREEBIE_ADDRESS_TESTNET
				      break
				    default:
				      console.log('OD.exchange does not support this network.')
							alert('OD.exchange is available on the Ethereum Mainnet or on the Ropsten Testnet')
							analyticsDB('blockchain', 'OTHER');
							return
				  }
		      initTables()
					console.log("Freebie contract address: " + freebieAddress + ", Master contract address: " + factoryAddress);
		      new Factory(factoryAddress, factoryABI, derivativeABI)
					window.web3FreebieContract = new window.web3.eth.Contract(window.freebieABI, freebieAddress)
					//web3.currentProvider.publicConfigStore.on('update', newAccount);
					window.ethereum.on('accountsChanged', newAccount)
					checkDerivativeAddressInLink()
				}
			)
    }
  )
}
