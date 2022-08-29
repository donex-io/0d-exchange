<!doctype html>
<html lang = "en">

<head>
  <title>Open Derivatives Exchange</title>
  <meta name="description" content="Decentralized non-custodial exchange for customized financial s on the Ethereum blockchain">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="./Graphics/icon.png">
  <link rel="stylesheet" href="./Styles/buttons.css">
  <link rel="stylesheet" href="./Styles/modals.css">
  <link rel="stylesheet" href="./Styles/tables.css">
  <link rel="stylesheet" href="./Styles/elements.css">
  <link rel="stylesheet" href="./Styles/containers.css">
  <link rel="stylesheet" href="./Styles/main.css">
  <link rel="stylesheet" href="./Styles/misc.css">
  <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css" />
</head>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="./Scripts/analyticsDB.js"></script>
<script src="./Scripts/init.js"></script>
<script>
analyticsDB('howitworks');
</script>

<body>

  <!-- BEGINNING of main container -->
  <div class="main_container">

    <!-- Header including the logo -->
    <header>
      <div class="primary_header">
        <div class="header_container">
          <p>&nbsp;</p>
          <p class="version"></p>
        </div>
        <a href="index.php"><div class="header_container"><img src="./Graphics/logo.png" width="60" height="60"></div></a>
        <p style="text-align: left; padding-left: 10px; color: #D9D9D9;	font-size: medium;"></p>
        <div class="header_container">
          <p>&nbsp;</p>
          <p style="text-align: right; padding-right: 10px; color: #D9D9D9;	font-size: small;"></p>
        </div>
      </div>
    </header>

    <!-- Container for three columns -->
    <div class="row">

      <!-- First columns -->
      <div class="content">
        <div class="column_title">
          <p style="text-align: center;">How It Works</p>
        </div>

        <p style="text-align: center;"></p>
        <div class="plaintext_title" style="margin-top: 0px;"><b>Introduction</b></div>
        <div>
          <p class="plaintext">
OD.exchange provides a user interface to a set of smart contracts on the Ethereum blockchain. These smart contracts enable conditional payments that are based on the price development of an underlying asset. Through OD.exchange you can create your own customized conditional payments or enter into those created by other users. There is no need for a registration. OD.exchange connects to your Ethereum client and tells it to read and write relevant information on the blockchain for you. On the blockchain you identify yourself only with your Ethereum address.           </p>
          <p class="plaintext">
We do not hold user funds at any time. Instead, funds are deposited into smart contracts, which are created by the users. The contracts are deployed on the Ethereum mainnet and do not rely on any utility tokens. All transactions are made with ETH. For test purposes, the same contracts are also deployed on the Ropsten testnet.          </p>
          <p class="plaintext">
            The main smart contract, OD.exchange provides an interface to, is the OD master contract, an smart contract deployed on the Ethereum blockchain. It serves as the template for users‘ customized contracts. The deployed master contract and its source code can be viewed on <a target="_blank" rel="noopener noreferrer" id="masterOnEtherscanLink" class="textLink">Etherscan</a>.          </p>
          <p class="plaintext">
            The following sections provide explanations for all main features of OD.exchange. A gerneral overview is given in our <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@robin.blaesing_97056/od-exchange-cf92f9ee5f02" class="textLink">Medium article</a>. If you have further questions, feel free to contact us via email: <button style="padding: 0px 0px 10px 0px; font-size: 10px; border-radius: 4px; width: 25px; height: 12px; margin: 1px 1px" onclick=mail()> &#9993; </button>
            <script language="JavaScript">
              var username = "contact";
              var hostname = "OD.exchange";
              var linktext = username + "@" + hostname ;
              function mail(){
                window.location = "mailto:" + hostname + "<" + linktext + ">" + "?subject=Request:%20"
                document.getElementById("em").innerHTML = " (" + linktext + ")"
              }
            </script> <a id="em"></a>
        </div>
        <div class="plaintext_title"><b>I. Conditional Payment</b></div>
        <div>
          <p class="plaintext">
A smart contract derived from the OD master contract represents an agreement on a conditional payment that is based on the price development of an underlying asset. For this, the creator of the contract deposits a stake in ETH into the contract, sets a strike price and chooses whether they want to go long or short on the underlying asset’s price.          </p>
          <p class="plaintext">
On the due date of contracts, the conditional payment is settled. The underlying asset’s spot price is compared to the strike price. The difference in percent is calculated and multiplied by a leverage factor. The user’s withdrawal amount is calculated by multiplying this leveraged percentage by the user’s stake and adding their initial stake. Then user can withdraw their respective amount. The maximum achievable profit is two times the deposited stake. Note, that the counterparties who entered a contract need to pay a fee (see VII. Fees), which is subtracted from their withdrawal amount.          </p>
          <p class="plaintext">
Right now, only the strike price (and of course the stake to deposit) can be customized by the user that creates the contract. The only underlying supported for now is the S&P 500 index. The leverage is fixed to ‘2x’. In the future, this may change and perhaps will be made customizable, as well. We will make sure to give updates on this.          </p>
        </div>
        <div class="plaintext_title"><b>II. Contract Creator</b></div>
        <div>
            <p class="plaintext">
The contract creator interacts with the OD master contract in order to create a new contract. In the creation process they set a strike price, choose whether they want to go long or short on the underlying’s price and deposit a stake (in ETH) into the contract. The stake can only be an integer multiple of 0.1 ETH.            </p>
            <p class="plaintext">
Once contract creation is finished, the contract will be listed on OD.exchange. Now users willing to take on the counterparty can enter. So, if the creator goes long, the counterparty users go short in this contract, and vice versa.            </p>
            <p class="plaintext">
A contract can only be created from a single ETH account address, so there is only one creator per contract. There can be multiple counterparties, however, as counterparties only have to deposit a stake worth some integer multiple of 0.1 ETH.            </p>
        </div>
        <div class="plaintext_title"><b>III. Counterparties</b></div>
        <div>
            <p class="plaintext">
The counterparties enter the position that is contrary to the creator’s position in an existing contract. Once a counterparty has deposited their desired stake into a contract, the contract becomes effective. This means that the creator’s and the counterparty’s stake, respectively, are locked in the contract until the due date. The creator’s stake, however, is locked in the contract only to the extent that it is matched by stakes of the counterparties. Several users can enter as counterparties until all of the creator’s stake is matched by counterparty stakes. The amount of remaining unmatched stake can be withdrawn by the creator at any time or kept in the contract until another counterparty matches that stake.            </p>
        </div>
        <div class="plaintext_title"><b>IV. Due Date</b></div>
        <div>
            <p class="plaintext">
The due date of the contracts is the third Friday of each month. All contracts will expire on this date on a monthly basis. After the due date, the contracts are ready for settlement. Contracts created after the due date will have their due date on the third Friday of the subsequent month. If the third Friday of a month is not a trading day, the respective previous trading day is chosen as the due date. The exact due time is the corresponding asset’s market closing time.              </p>
        </div>
        <div class="plaintext_title"><b>V. Contract Settlement</b></div>
        <div>
            <p class="plaintext">
Settlement takes place once the first user requests a withdrawal from the contract. The settlement price will be provided through an oracle (<a target="_blank" rel="noopener noreferrer" id="oracleOnEtherscan" class="textLink">View oracle on Etherscan</a>). Donex UG (haftungsbeschraenkt) makes sure that the oracle provides the underlying’s closing price on the due date. You can compare the price provided by the oracle to other sources on the internet.
            </p>
        </div>
        <div class="plaintext_title"><b>VI. Withdrawal</b></div>
        <div>
            <p class="plaintext">
After settlement has taken place, users can withdraw their funds from the contract by using the corresponding button in the contract’s info window (under ‘Created Contracts’ or ‘Entered Contracts’ in the main page’s right column).            </p>
        </div>
        <div class="plaintext_title"><b>VII. Fees</b></div>
        <div>
            <p class="plaintext">
The counterparties, at the time of contract settlement, have to pay a fee of 0.5 % of their initial stake to the OD master contract. Contract creators do not have to pay any fee to the master contract.            </p>
            <p class="plaintext">
Note, however, that Ethereum transaction fees always apply to the creator, as well as the counterparties. We are constantly working on developing contract implementations that reduce the gas costs involved for users.            </p>
        </div>
        <div class="plaintext_title"><b>VIII. Bounties</b></div>
        <div>
            <p class="plaintext">
From time to time, OD.exchange offers a limited number of bounties to contract creators (<a target="_blank" rel="noopener noreferrer" id="freebieOnEtherscan" class="textLink">View bounty contract on Etherscan</a>). The bounties are made available to the respective creator as soon as a counterparty has entered the creator’s contract. After that, the bounty has to be actively withdrawn by the creator in the contract’s info window under ‘Created Contracts’ on the main page of OD.exchange.            </p>
        </div>
      </div>
      <!-- END of first column-->

    <!-- END of row div-->
    </div>

    <!-- Footer including copyright info -->
    <footer class="secondary_header">
      <div class="copyright" style="margin-bottom: 5px;">&copy;&nbsp;2019&nbsp;OD.exchange</div>
      <a href="HowItWorks.php" class="about">How It Works</a><a class="copyright">&nbsp;|&nbsp;</a><a href="TermsAndConditions.php" class="about">Terms and Conditions</a>
    </footer>

  </div>
  <!-- END of main container -->
</body>

<script src="./Scripts/External/web3.js" language="JavaScript"></script>
<script>
  if (typeof web3 !== 'undefined')
  {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
          window.web3 = new Web3(ethereum);
          try {
              // Request account access if needed
              await ethereum.enable();
              // Acccounts now exposed
          } catch (error) {
              // User denied account access...
          }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          window.web3 = new Web3(web3.currentProvider);
          // Acccounts always exposed
      }
      // Non-dapp browsers...
      else {
          console.log('Non-Ethereum browser detected.');
      }
  });

  document.getElementById("oracleOnEtherscan").href = "//etherscan.io/address/" + ORACLE_ADDRESS_MAINNET
  document.getElementById("masterOnEtherscanLink").href = "//etherscan.io/address/" + FACTORY_ADDRESS_MAINNET
  document.getElementById("freebieOnEtherscan").href = "//etherscan.io/address/" + FREEBIE_ADDRESS_MAINNET


  window.web3.eth.net.getNetworkType().then(
    netId =>
    {
      console.log(netId);
      switch (netId) {
        case "main":
          document.getElementById("oracleOnEtherscan").href = "//etherscan.io/address/" + ORACLE_ADDRESS_MAINNET
          document.getElementById("masterOnEtherscanLink").href = "//etherscan.io/address/" + FACTORY_ADDRESS_MAINNET
          document.getElementById("freebieOnEtherscan").href = "//etherscan.io/address/" + FREEBIE_ADDRESS_MAINNET
          break
        case "ropsten":
          document.getElementById("oracleOnEtherscan").href = "//etherscan.io/address/" + ORACLE_ADDRESS_MAINNET
          document.getElementById("masterOnEtherscanLink").href = "//etherscan.io/address/" + FACTORY_ADDRESS_MAINNET
          document.getElementById("freebieOnEtherscan").href = "//etherscan.io/address/" + FREEBIE_ADDRESS_MAINNET
          break
        default:
          document.getElementById("oracleOnEtherscan").href = "//etherscan.io/address/" + ORACLE_ADDRESS_MAINNET
          document.getElementById("masterOnEtherscanLink").href = "//etherscan.io/address/" + FACTORY_ADDRESS_MAINNET
          document.getElementById("freebieOnEtherscan").href = "//etherscan.io/address/" + FREEBIE_ADDRESS_MAINNET
      }
    })

</script>

</html>
