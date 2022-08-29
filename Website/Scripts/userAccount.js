function checkUserAccount()
{
	return new Promise
	(
		(resolve, reject) =>
		{
			if (typeof web3 !== 'undefined')
			{
				window.web3 = new Web3(window.web3.currentProvider)
				web3.eth.getAccounts()
				.then
				(
					accounts =>
					{
						console.log("Hi " + accounts[0] + "!")
						window.userAccount = accounts[0]
						resolve(accounts[0])
					}
				)
				.catch
				(
					error =>
					{
						reject(new Error("No account found!"))
					}
				)
			}
		}
	)
}

function newAccount() {
	window.web3.eth.getAccounts()
	.then
	(
		accounts => {
			if(window["userAccount"] != accounts[0])
			{
				console.log("Account switched from " + window["userAccount"] + " to " + accounts[0])
				window.userAccount = accounts[0]
				init()
			}
		}
	)
}
