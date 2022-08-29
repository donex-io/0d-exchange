<!doctype html>
<html lang = "en">

  <title>0D.exchange</title>
  <meta name="description" content="The world’s first zero fee derivatives exchange on common financial assets">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
  <link rel="stylesheet" href="./Styles/inputs.css">
  <link rel="stylesheet" href="./Styles/info.css">
  <link rel="stylesheet" type="text/css" href="./Styles/cookieconsent.min.css" />
  <link rel="stylesheet" href="./Styles/slideShow.css">
  <!--<link rel="manifest" href="/Manifest.json">-->
  <link rel="canonical" href="https://0d.exchange/index.php" />
  <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">

</head>

<body>

  <?php
    // Geoblock
    // currently blocked: US
//    $geodata = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip='.$_SERVER['REMOTE_ADDR']));
  //  $countrycode = $geodata["geoplugin_countryCode"];
  //  if ($countrycode == "US") {
  //    header("Location: https://OD.exchange/TermsAndConditions.php", true, 301);
  //    exit();
  //  }
  ?>


  <?php
  $servername = "localhost";
  $username = "lukas";
  $password = "dodonix.io";
  $url = "od.exchange";
  // Validate url
  if ($_SERVER['HTTP_HOST'] == $url) {
      $dbname = "mainnet";
  } else {
      $dbname = "testnet";
  }
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $ip = hash('sha256', $_SERVER["REMOTE_ADDR"]);
  $geodata = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip='.$_SERVER['REMOTE_ADDR']));
  $region = $geodata["geoplugin_countryCode"];
  $timestamp = time();
  $homepage = 1;

  $sql = "INSERT INTO analytics (ipHash, region, timestamp, homepage) VALUES ('".$ip."', '".$region."', $timestamp, $homepage)";

  if ($conn->query($sql) === TRUE) {
      #echo "New record created successfully";
  } else {
      #echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();
  ?>

  <?php
  $servername = "localhost";
  $username = "lukas";
  $password = "dodonix.io";
  $dbname = "indexPrice";
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  $sql = " SELECT * from SP500 where Date = (select MAX(Date) from SP500);";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
      // output data of each row
      while($row = $result->fetch_assoc()) {
          $resultClosing =  json_encode($row[Close]);
      }
  } else {
      //echo "0 results";
  }
  $sql = "SELECT * FROM SP500 WHERE type = 'ticker'";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
      // output data of each row
      while($row = $result->fetch_assoc()) {
          $resultTicker =  json_encode($row[value]);
      }
  } else {
      //echo "0 results for ticker";
  }
  $conn->close();
  ?>

 <?php
 $servername = "localhost";
 $username = "lukas";
 $password = "dodonix.io";
 $url = "od.exchange";
 // Validate url
 if ($_SERVER['HTTP_HOST'] == $url) {
     $dbname = "mainnet";
 } else {
     $dbname = "testnet";
 }
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  $ip = hash('sha256', $_SERVER["REMOTE_ADDR"]);
  $sql = "SELECT * FROM makers WHERE ipHash='".$ip."'";
  $result = $conn->query($sql);
  $makerContracts = array();
  if($result->num_rows > 0) {
      // output data of each row
      while($row = $result->fetch_assoc()) {
        $makerContracts[]= $row[contractAddress];      }
  } else {
  }
  $makerContracts = json_encode($makerContracts);
  $conn->close();
  ?>

  <?php
  $servername = "localhost";
  $username = "lukas";
  $password = "dodonix.io";
  $url = "od.exchange";
  // Validate url
  if ($_SERVER['HTTP_HOST'] == $url) {
      $dbname = "mainnet";
  } else {
      $dbname = "testnet";
  }
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  $sql = "SELECT * FROM currentDuedate";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
      // output data of each row
      while($row = $result->fetch_assoc()) {
          $currentDuedate =  $row[duedate];
      }
  }
//  } else {
      //echo "0 results";
  $conn->close();
  ?>

  <script>
    var closingPrice = parseFloat(JSON.parse('<?php echo $resultClosing ?>')).toFixed(2);
    var tickerPrice = JSON.parse('<?php echo $resultClosing ?>');
  </script>

  <script>
    window.makerContracts = <?php echo $makerContracts?>;
  </script>

  <!-- BEGINNING of main container -->
  <div class="main_container">

    <!-- Header including the logo -->
    <header>
      <div class="primary_header">
        <div class="header_container">
          <p>&nbsp;</p>
          <p class="version"></p>
        </div>
        <a href="/index.php" aria-label="od.exchange"><div class="header_container"><img src="./Logo/Logo2020.svg" width="60" height="60" alt="OD.exchange"></div></a>
        <p style="text-align: left; padding-left: 10px; color: #D9D9D9;	font-size: medium;"></p>
        <div class="header_container">
          <p>&nbsp;</p>
          <p style="text-align: right; padding-right: 10px; color: #D9D9D9;	font-size: medium;"></p>
        </div>
      </div>
    </header>

    <!-- Container for three columns -->
    <div class="row">

      <!-- First columns -->
      <div class="column_withLargeLeftMargin" id="leftColumn">
        <div class="info" id="infoCreate">
          &#9432;&nbsp;
          <span id="infoCreate_popup" class="info_Popup">In this column you can create a new conditional payment contract by choosing to go long or short on the underlying's price, depositing a stake and setting a strike price. The contract will then be visible to other users in the center column and they are able to enter as the counterparty. See <u><a onclick='modal("explanationModal");'>Introduction</a></u> or <u><a target="_blank" rel="noopener noreferrer" href="HowItWorks.php" style="color: #D9D9D9">How It Works</a></u> section II. for more information.</span>
        </div>
        <div class="column_title">
          <h2 class="column_header">CREATE CONTRACT</h2>
        </div>
        <div style="margin-top: 5px;">
          <label>
            <select class="dropdown" id="selectUnderlying1">
              <option value="1" class="dropdown_item">SPX</option>
              <option value="2" class="dropdown_item">GOLD</option>
              <option value="3" class="dropdown_item">OIL</option>
            </select>
          </label>
        </div>
        <div style="margin-top: 20px; margin-bottom:-5px;">
          <a class="long" width="30%" style="vertical-align: 8px">Long&nbsp;</a>
          <label class="switch">
            <input id="selectLS" type="checkbox"  width="30%">
            <span class="slider round"></span>
          </label>
          <a class="short" width="30%" style="vertical-align: 8px">&nbsp;Short</a>
        </div>
        <br>
        <div class="input_titleLeft">
          <div class="info5" id="infoStake">&#9432;&nbsp;
            <span id="infoStake_popup" class="info5_Popup">The stake is the amount in ETH you want deposit in the contract. Other users have to deposit a smaller or an equal amount in order to enter part of or the full respective counterparty position.</span>
          </div><div>Stake in ETH</div>
        </div>
        <div class="input_titleRight">
          <div class="info3" id="infoStrikePrice">&#9432;&nbsp;
            <span id="infoStrikePrice_popup" class="info3_Popup">Based on the difference between strike price and spot price of the underlying on the due date, the withdrawal amount of the position is calculated.</span>
          </div><div>Strike Price</div>
        </div>
        <br>
        <div class="input_left"><label><input id="selectStake" class="input" type="number" step="0.1" min="0.1" lang="en" placeholder="" value="1.0"></label></div>
        <div class="input_right"><label><input id="selectStrikePrice" class="input" type="number" step="0.01" min="0.01" lang="en" placeholder="" value="2000.00"></label></div>
        <br>
        <br>
        <script>
          document.getElementById("selectStrikePrice").value = closingPrice;
        </script>
        <div style="margin-top: 0px;">
          <br>
          <button id="buttonCreate" class="button_create" onclick="modal('createModal', 0)">Create Contract</button>
        </div>
        <br>
        <!-- Chart -->
        <div id="chart" style="min-width: 275px;width: 80%;height: 260px;display: inline-block;max-width: 500px;border: 5px solid #2F3241;border-radius: 5px;">
        </div>
      </div>
      <!-- END of first column-->

      <!-- Second column -->
      <div class="columns">
        <div class="info" id="infoAcquire">&#9432;&nbsp;
          <span id="infoAcquire_popup" class="info_Popup">In this column you see the contracts created by other users, in which you can enter the displayed counterparty position.</span>
        </div>
        <div class="column_title">
          <h2 class="column_header">ENTER CONTRACT</h2>
        </div>
        <button class="collapsible">
          <div style="float:left">Quick Entry</div>
        </button>
        <div class="filter" id="collapsible">
            <select id="selectUnderlying2" onchange="filterColumn()" class="dropdown">
              <option value="2">&nbsp;&nbsp;SPX</option>
            </select>
            <div style="margin-top: 20px; margin-bottom:-15px;">
              <a class="long" width="30%" style="vertical-align: 8px">Long&nbsp;</a>
              <label class="switch">
                <input id="selectLS_quick" type="checkbox"  width="30%">
                <span class="slider round"></span>
              </label>
              <a class="short" width="30%" style="vertical-align: 8px">&nbsp;Short</a>
            </div>
            <br>
            <div class="input_titleLeft">Stake in ETH</div>
            <div class="input_titleRight">&nbsp;
              <div class="info" id="infoQuickAcquire">&#9432;
                <span id="infoQuickAcquire_popup" class="info_Popup">The Quick Entry functionality gives you the option to set a stake which you are willing to deposit into a long or a short counterparty position. You will then be shown the contracts with the most advantageous strike prices, that you can enter.</span>
              </div>
            </div>
            <br>
            <div class="input_left"><input id="filter_stake" class="input" type="number" step="0.1" min="0.1" lang="en" placeholder="" value="1.0"></div>
            <div class="input_left"><button id="buttonQuickBuy" class="button_quick">Quick Entry</button></div>
            <br>
            <br>
        </div>
        <div class="derivative_header">
          <table class="derivative_table">
            <tbody>
              <tr >
                <th class="derivativeinfo_header" width="20%" onclick="sortTable(0, 'buyLongTable')">Underlying</th>
                <th class="derivativeinfo_header" width="12.5%" onclick="sortTable(1, 'buyLongTable')">Pos.</th>
                <th class="derivativeinfo_header" width="12.5%" onclick="sortTable(2, 'buyLongTable')">Stake</th>
                <th class="derivativeinfo_header" width="22.5%" onclick="sortTable(3, 'buyLongTable')">Strike price</th>
                <th class="derivativeinfo_header" width="22.5%" onclick="sortTable(4, 'buyLongTable')">Due date</th>
                <th class="derivativeinfo_header" width="10%"></th>
                <th class="derivativeinfo_header" width="10px">&nbsp;</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table_div">
          <table class="derivative_table" id="buyLongTable">
            <tbody id="buyLongTableBody">
              <?php
              $servername = "localhost";
              $username = "lukas";
              $password = "dodonix.io";
              $url = "od.exchange";
              // Validate url
              if ($_SERVER['HTTP_HOST'] == $url) {
                  $dbname = "mainnet";
              } else {
                  $dbname = "testnet";
              }
              // Create connection
              $conn = new mysqli($servername, $username, $password, $dbname);
              // Check connection
              if ($conn->connect_error) {
                  die("Connection failed: " . $conn->connect_error);
              }
              $sql = "SELECT * FROM derivatives";
              $result = $conn->query($sql);
              if ($result->num_rows > 0) {
                  // output data of each row
                  $class1 = "derivative";
                  $class2 = "derivativeinfo";
                  $noEth = "modal('noEthereumModal')";
                  while($row = $result->fetch_assoc()) {
                    if ($row[type] == "Long" && $row[availableStake] >= 0.1 && $row[duedate]==$currentDuedate){
                      echo "<tr class=\"".$class1."\" onclick=\"".$noEth."\">";
                          echo "<td class=\"derivativeinfo\" width=\"20%\">"."SPX"."</td>";
                          echo "<td class=\"derivativeinfo\" width=\"12.5%\">".$row[type]."</td>";
                          echo "<td class=\"derivativeinfo\" width=\"12.5%\">".number_format($row[availableStake], 1, '.', '')."</td>";
                          echo "<td class=\"derivativeinfo\" width=\"22.5%\">".number_format($row[strikePrice], 2, '.', '')."</td>";
                          echo "<td class=\"derivativeinfo\" width=\"22.5%\">".date('Y-m-d', $row[duedate])."</td>";
                          echo "<td class=\"derivativeinfo\" width=\"10%\">"."&nbsp;"."</td>";
                      echo "</tr>";
                    }
                  }
              } else {
                //  echo "0 results";
              }
              $conn->close();
              ?>
            </tbody>
          </table>
        </div>
        <div class="derivative_header">
          <table class="derivative_table">
            <tbody>
              <tr >
                <th class="derivativeinfo_header" width="20%" onclick="sortTable(0, 'buyShortTable')">Underlying</th>
                <th class="derivativeinfo_header" width="12.5%" onclick="sortTable(1, 'buyShortTable')">Pos.</th>
                <th class="derivativeinfo_header" width="12.5%" onclick="sortTable(2, 'buyShortTable')">Stake</th>
                <th class="derivativeinfo_header" width="22.5%" onclick="sortTable(3, 'buyShortTable')">Strike price</th>
                <th class="derivativeinfo_header" width="22.5%" onclick="sortTable(4, 'buyShortTable')">Due date</th>
                <th class="derivativeinfo_header" width="10%"></th>
                <th class="derivativeinfo_header" width="10px">&nbsp;</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table_div">
          <table class="derivative_table" id="buyShortTable">
            <tbody id="buyShortTableBody">
              <?php
              $servername = "localhost";
              $username = "lukas";
              $password = "dodonix.io";
              $url = "od.exchange";
              // Validate url
              if ($_SERVER['HTTP_HOST'] == $url) {
                  $dbname = "mainnet";
              } else {
                  $dbname = "testnet";
              }
              // Create connection
              $conn = new mysqli($servername, $username, $password, $dbname);
              // Check connection
              if ($conn->connect_error) {
                  die("Connection failed: " . $conn->connect_error);
              }
              $sql = "SELECT * FROM derivatives";
              $result = $conn->query($sql);
              if ($result->num_rows > 0) {
                  // output data of each row
                  $class1 = "derivative";
                  $class2 = "derivativeinfo";
                  $noEth = "modal('noEthereumModal')";
                  while($row = $result->fetch_assoc()) {
                    if ($row[type] == "Short" && $row[availableStake] >= 0.1 && $row[duedate]==$currentDuedate){
                      echo "<tr class=\"".$class1."\" onclick=\"".$noEth."\">";
                          echo "<td class=\"derivativeinfo\" width=\"20%\">"."SPX"."</td>";
                          echo "<td class=\"derivativeinfo\" width=\"12.5%\">".$row[type]."</td>";
                          echo "<td class=\"derivativeinfo\" width=\"12.5%\">".number_format($row[availableStake], 1, '.', '')."</td>";
                          echo "<td class=\"derivativeinfo\" width=\"22.5%\">".number_format($row[strikePrice], 2, '.', '')."</td>";
                          echo "<td class=\"derivativeinfo\" width=\"22.5%\">".date('Y-m-d', $row[duedate])."</td>";
                          echo "<td class=\"derivativeinfo\" width=\"10%\">"."&nbsp;"."</td>";
                      echo "</tr>";
                    }
                  }
              } else {
                //  echo "0 results";
              }
              $conn->close();
              ?>
            </tbody>
          </table>
        </div>
        <div class="column_footer">
        </div>
      </div>
      <!-- END of second column-->

      <!-- Third column -->
      <div class="columns" id="portfolioColumn" style="display: none">
        <div class="info" id="infoPortfolio">&#9432;&nbsp;
          <span id="infoPortfolio_popup" class="info_Popup">This column shows all contracts in which you hold a position with your currently selected Ethereum address.</span>
        </div>
        <div class="column_title">
          <h2 class="column_header">PORTFOLIO</h2>
        </div>
        <div class="portfolio_header">Created Contracts</div>
        <div class="info2" id="infoCreatedContracts">&nbsp;&nbsp;&#9432;
          <span id="infoCreatedContracts_popup" class="info2_Popup">These are the contracts which you created with the currently selected address.</span>
        </div>
        <div class="derivative_header2">
          <table class="derivative_table">
            <tbody>
              <tr >
                <th class="derivativeinfo_header" width="20%" onclick="sortTable(0, 'makerTable')">Underlying</th>
                <th class="derivativeinfo_header" width="12.5%" onclick="sortTable(1, 'makerTable')">Pos.</th>
                <th class="derivativeinfo_header" width="12.5%" onclick="sortTable(2, 'makerTable')">Stake </th>
                <th class="derivativeinfo_header" width="22.5%" onclick="sortTable(3, 'makerTable')">Strike price</th>
                <th class="derivativeinfo_header" width="22.5%" onclick="sortTable(4, 'makerTable')">Due date</th>
                <th class="derivativeinfo_header" width="10%" onclick="sortTable(5, 'makerTable')"></th>
                <th class="derivativeinfo_header" width="10px">&nbsp;</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table_div2">
          <table class="derivative_table" id="makerTable">
            <tbody id="makerTableBody">
            </tbody>
          </table>
        </div>
        <div class="portfolio_header">Entered Contracts</div>
        <div class="info2" id="infoAcquiredContracts">&nbsp;&nbsp;&#9432;
          <span id="infoAcquiredContracts_popup" class="info2_Popup">These are the contracts created by other users in which you have entered as a counterparty.</span>
        </div>
        <div class="derivative_header2">
          <table class="derivative_table">
            <tbody>
              <tr >
                <th class="derivativeinfo_header" width="20%" onclick="sortTable(0, 'acquiredTable')">Underlying</th>
                <th class="derivativeinfo_header" width="12.5%" onclick="sortTable(1, 'acquiredTable')">Pos.</th>
                <th class="derivativeinfo_header" width="12.5%" onclick="sortTable(2, 'acquiredTable')">Stake </th>
                <th class="derivativeinfo_header" width="22.5%" onclick="sortTable(3, 'acquiredTable')">Strike price</th>
                <th class="derivativeinfo_header" width="22.5%" onclick="sortTable(4, 'acquiredTable')">Due date</th>
                <th class="derivativeinfo_header" width="10%" onclick="sortTable(5, 'acquiredTable')"></th>
                <th class="derivativeinfo_header" width="10px">&nbsp;</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table_div2">
          <table class="derivative_table" id="acquiredTable">
            <tbody id="acquiredTableBody">
            </tbody>
          </table>
        </div>
        <div class="portfolio_header">Due/Settled Contracts</div>
        <div class="info2" id="infoDueSettledContracts">&nbsp;&nbsp;&#9432;
          <span id="infoDueSettledContracts_popup" class="info2_Popup">These are the contracts which have reached the due date, in which you have held a position. Make sure you withdraw your funds from these contracts.</span>
        </div>
        <div class="derivative_header2">
          <table class="derivative_table">
            <tbody>
              <tr >
                <th class="derivativeinfo_header" width="20%" onclick="sortTable(0, 'dueTable')">Underlying</th>
                <th class="derivativeinfo_header" width="12.5%" onclick="sortTable(1, 'dueTable')">Pos.</th>
                <th class="derivativeinfo_header" width="12.5%" onclick="sortTable(2, 'dueTable')">Stake </th>
                <th class="derivativeinfo_header" width="22.5%" onclick="sortTable(3, 'dueTable')">Strike price</th>
                <th class="derivativeinfo_header" width="22.5%" onclick="sortTable(4, 'dueTable')">Due date</th>
                <th class="derivativeinfo_header" width="10%" onclick="sortTable(5, 'dueTable')"></th>
                <th class="derivativeinfo_header" width="10px">&nbsp;</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table_div2">
          <table class="derivative_table" id="dueTable">
            <tbody id="dueTableBody">
            </tbody>
          </table>
        </div>
        <div class="column_footer">
        </div>
      </div>
      <!-- END of third column-->

    <!-- END of row div-->
    </div>

    <!-- Footer including copyright info -->
    <footer class="secondary_header">
      <div class="countdown" id="countdown"></div>
      <div class="copyright" style="margin-bottom: 5px; margin-top: 30px;">&copy;&nbsp;2020&nbsp;0D.exchange</div>
      <div style="margin-bottom: 15px;"> <a target="_blank" rel="noopener noreferrer" href="https://0d.exchange/index.php/landing/howitworks/" class="about">How It Works</a><a class="copyright">&nbsp;|&nbsp;</a><a target="_blank" rel="noopener noreferrer" href="https://0d.exchange/index.php/landing/termsandconditions/" class="about">Terms and Conditions</a></div>
      <br>
      <div class="version2">v0.2.2 (BETA) <br>
        <div id="mainnetConnection" style="display:none">connected to Ethereum mainnet</div>
        <div id="ropstenConnection" style="display:none">connected to Ropsten testnet</div>
        <div id="noConnection" style="display:none">no blockchain connection</div>
      </div>
    </footer>

  </div>
  <!-- END of main container -->

  <!-- Create Modal -->
  <div id="createModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p class="modal_title">Create New Contract</p>
      <span width="100%" class="modal_text"  style="font-size: small; font-weight: bold;">Are you sure you want to create a contract with the following properties?</span>
      <br>
      <br>
      <div class="modal_table_div">
        <table class="modal_derivative_table">
          <tbody>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="10%">Underlying</th>
              <th class="modal_derivativeinfo" width="10%" id="create_modal_asset">-</th>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="15%">Your position</th>
              <th class="modal_derivativeinfo" width="15%" id="create_modal_ls">-</th>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="15%">Stake</th>
              <th class="modal_derivativeinfo" width="15%" id="create_modal_stake">-</th>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="15%">Strike price</th>
              <th class="modal_derivativeinfo" width="15%" id="create_modal_baseprice">-</th>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="15%">Leverage</th>
              <th class="modal_derivativeinfo" width="15%" id="create_modal_lev">2x</th>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="15%">Due date</th>
              <th class="modal_derivativeinfo" width="15%" id="create_modal_duedate"></th>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <div class="modal_acceptTerms" style="font-size: small; font-weight: bold;">
        <input type="checkbox" id="terms1">  I have read and accept the <a target="_blank" rel="noopener noreferrer" href="TermsAndConditions.php" class="modal_link">Terms and Conditions</a>.
      </div>
      <br>
      <div>
        <button class="modal_button" id="confirmCreation">Sign</button>
      </div>
      <div id="create_modal_freebieText" class="modal_acceptTerms">
        <br>
        <a style="font-size: small; font-weight: bold;">Get a bounty! Once your contract is created and a counterparty has entered, you will be able to withdraw 0.1 ETH. See </a><a target="_blank" rel="noopener noreferrer" href="HowItWorks.php" class="modal_link" style="font-size: small; font-weight: bold;">How It Works</a><a style="font-size: small; font-weight: bold;"> for more details.</a>
      </div>
      <br>
    </div>

  </div>
  <!-- End of Create Modal -->

  <!-- Buy Modal -->
  <div id="buyModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p class="modal_title">Enter Contract</p>
      <div class="modal_acceptTerms">
        <a style="font-size: small; font-weight: bold;" id="buy_modal_contractAddress"></a>
        <br>
        <a target="_blank" rel="noopener noreferrer" href="index.php" class="modal_link" id="buy_modal_linkToEtherscan" style="font-size: small; font-weight: bold;">View on Etherscan</a>
      </div>
      <br>
      <div class="modal_table_div">
        <table class="modal_derivative_table">
          <tbody>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Underlying</th>
              <td class="modal_derivativeinfo" width="30%" id="buy_modal_underlying">SPX</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Position to acquire</th>
              <td class="modal_derivativeinfo" width="30%" id="buy_modal_type">Short</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Max. available stake</th>
              <td class="modal_derivativeinfo" width="30%" id="buy_modal_stake"> 2.00</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Number of counterparties</th>
              <td class="modal_derivativeinfo" width="30%" id="buy_modal_numberTakers"> 0 </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Strike price</th>
              <td class="modal_derivativeinfo" width="30%" id="buy_modal_strikeprice"> 1024 </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Leverage</th>
              <td class="modal_derivativeinfo" width="30%" id="buy_modal_leverage">2x</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Due date</th>
              <td class="modal_derivativeinfo" width="30%" id="buy_modal_duedate"> 20-09-2018</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <div class="modal_acceptTerms" style="font-size: small; font-weight: bold;">
        <input type="checkbox" id="terms2">  I have read and accept the <a target="_blank" rel="noopener noreferrer" href="TermsAndConditions.php" class="modal_link">Terms and Conditions</a>
      </div>
      <div id="buy_modal_sendAcquire_div">
        <input type="number" class="modal_input" placeholder="Stake" id="buy_modal_amountToBuy" step="0.1" min="0.1">
        <button class="modal_button" id="confirmBuy">Sign</button>
      </div>
      <br>
      <div class="modal_acceptTerms" style="font-size: small; font-weight: bold;">
        See <a target="_blank" rel="noopener noreferrer" href="HowItWorks.php" class="modal_link";>How It Works</a> for more information.
      </div>
      <br>
      <!-- TradingView Widget BEGIN -->
      <div class="tradingview-widget-container" id="acquireModalWidget">
      </div>
      <!-- TradingView Widget END -->
    </div>
  </div>
  <!-- End of Buy Modal -->

  <!-- Quick Acquire Modal -->
  <div id="quickAcquireModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p class="modal_title">Quick Entry</p>
      <div class="modal_table_div">
        <table class="modal_derivative_table">
          <tbody>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Underlying</th>
              <td class="modal_derivativeinfo" width="30%" id="quickAcquireModal_underlying">SPX</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Your position</th>
              <td class="modal_derivativeinfo" width="30%" id="quickAcquireModal_type">Short</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Total stake</th>
              <td class="modal_derivativeinfo" width="30%" id="quickAcquireModal_stake"> 2.00</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Mean strike price</th>
              <td class="modal_derivativeinfo" width="30%" id="quickAcquireModal_strikeprice"> 1024 </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Leverage</th>
              <td class="modal_derivativeinfo" width="30%" id="quickAcquireModal_leverage">2x</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Due date</th>
              <td class="modal_derivativeinfo" width="30%" id="quickAcquireModal_duedate"> 20-09-2018</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <div class="modal_table_div" style="width:70%; margin-left: 15%;">
        <table class="modal_derivatisve_table" >
          <thead>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header">Address</th>
              <th class="modal_derivativeinfo_header">Stake</th>
              <th class="modal_derivativeinfo_header">Strike price</th>
            </tr>
          </thead>
          <tbody id="quickAcquireTable">
          </tbody>
        </table>
      </div>
      <br>
      <br>
      <div class="modal_acceptTerms" style="font-size: small; font-weight: bold;">
        <input type="checkbox" id="terms3">  I have read and accept the <a href="TermsAndConditions.php" class="modal_link">Terms and Conditions</a>
      </div>
      <br>
      <br>
      <div>
        <button class="modal_button" id="confirmQuickAcquire">Sign</button>
      </div>
      <br>
    </div>
  </div>
  <!-- End of Quick Acquire Modal -->

  <!-- Maker Modal -->
  <div id="makerModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p class="modal_title">Created Contract</p>
      <div class="modal_acceptTerms">
        <a style="font-size: small; font-weight: bold;" id="maker_modal_contractAddress"></a>
        <br>
        <a target="_blank" rel="noopener noreferrer" href="index.php" class="modal_link" id="maker_modal_linkToEtherscan" style="font-size: small; font-weight: bold;">View on Etherscan</a>
      </div>
      <br>
      <div class="modal_table_div">
        <table class="modal_derivative_table">
          <tbody>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header">Underlying</th>
              <td class="modal_derivativeinfo" id="maker_modal_underlying"> SPX</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header">Your position</th>
              <td class="modal_derivativeinfo" id="maker_modal_type"> short</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header">Your stake</th>
              <td class="modal_derivativeinfo">
                <input class="modal_table_input" type="number" step="0.1" min="0.1" lang="en" id="maker_modal_stake"></input>
                <button class="button_update" id="maker_modal_updateStake">Update</button>
              </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header">Counterparty stake</th>
              <td class="modal_derivativeinfo" id="maker_modal_acquiredStake"> 2.00</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header">Strike price</th>
              <td class="modal_derivativeinfo">
                <input class="modal_table_input" type="number" step="0.01" min="0.01" lang="en" id="maker_modal_strikeprice"></input>
                <div id="maker_modal_strikeprice2"></div>
                <button class="button_update" id="maker_modal_updateStrikePrice">Update</button>
              </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header">Leverage</th>
              <td class="modal_derivativeinfo" id="maker_modal_leverage"> 2x</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header">Due date</th>
              <td class="modal_derivativeinfo" id="maker_modal_duedate"> 2018-09-15</td>
            </tr>
            <tr>
              <th>
                <td>&nbsp;</td>
              </th>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="40%">Underlying spot price</th>
              <td class="modal_derivativeinfo" width="40%" id="maker_modal_currentPrice"> - </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header">Compared to strike price</th>
              <td class="modal_derivativeinfo" id="maker_modal_pl"> - </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header">Current value of position</th>
              <td class="modal_derivativeinfo" id="maker_modal_value"> - </td>
            </tr>
            <tr>
              <th>
              </th>
              <td>&nbsp;</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header">Status</th>
              <td class="modal_derivativeinfo" id="maker_modal_status"> - </td>
            </tr>
            <tr>
              <th>
              </th>
              <td>&nbsp;</td>
            </tr>
            <tr class="modal_derivative" id="maker_modal_row_copyLinkToShare">
              <th class="modal_derivativeinfo_header">Share direct link to derivative:</th>
              <td style="margin-left:-20%" class="modal_derivativeinfo" style="font-size: small; font-weight: bold;">
                <button id="maker_modal_button_copyLinkToShare" class="modal_link" style="background:none;border:none;color:#3191B9;font-weight:bold; cursor: copy;" onclick="copyShareLinkToClipboard()">Copy to clipboard&nbsp;&#x1F4CB;
                </button>
                <a id="maker_modal_linkCopiedDone" style="visibility: hidden;color: #26A69A;">&#10003;</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <br>
      <br>
      <div style="text-align: center;">
        <button class="modal_button_sell" id="withdrawRemainderButton" >Withdraw unmatched stake</button>
      </div>
      <div id="getFreebieButton" style="display: none;">
        <br>
        <br>
        <button class="buttonWithdraw">Get Bounty</button>
      </div>
      <br>
    </div>
  </div>
  <!-- End of Make Modal -->

  <!-- Taker Modal -->
  <div id="takerModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p class="modal_title">Entered Contract</p>
      <div class="modal_table_div">
        <table class="modal_derivative_table">
          <tbody>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Underlying</th>
              <td class="modal_derivativeinfo" width="30%" id="taker_modal_underlying"> SPX</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Your position</th>
              <td class="modal_derivativeinfo" width="30%" id="taker_modal_type"> Short</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Your stake</th>
              <td class="modal_derivativeinfo" width="30%" id="taker_modal_stake"> 0.5 </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%"># Counterparties</th>
              <td class="modal_derivativeinfo" width="30%" id="taker_modal_numberTakers"> 0 </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Strike price</th>
              <td class="modal_derivativeinfo" width="30%" id="taker_modal_strikeprice"> 1024 </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Leverage</th>
              <td class="modal_derivativeinfo" width="30%" id="taker_modal_leverage"> 2x</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Due date</th>
              <td class="modal_derivativeinfo" width="30%" id="taker_modal_duedate"> 2018-09-15</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <div class="modal_table_div">
        <table class="modal_derivative_table">
          <tbody>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Underlying spot price</th>
              <td class="modal_derivativeinfo" width="30%" id="taker_modal_currentPrice"> - </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Compared to strike price</th>
              <td class="modal_derivativeinfo" width="30%" id="taker_modal_pl"> - </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Current value of position</th>
              <td class="modal_derivativeinfo" width="30%" id="taker_modal_value"> - </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
    </div>
  </div>
  <!-- End of Take Modal -->

  <!-- Past Due Date Modal -->
  <div id="pastDueDateModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p class="modal_title">Due/Settled Contract</p>
      <div class="modal_table_div">
        <table class="modal_derivative_table">
          <tbody>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Underlying</th>
              <td class="modal_derivativeinfo" width="30%" id="pastDueDate_modal_underlying">SPX</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Your position</th>
              <td class="modal_derivativeinfo" width="30%" id="pastDueDate_modal_type"> short</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Stake</th>
              <td class="modal_derivativeinfo" width="30%" id="pastDueDate_modal_stake"> 0.5 </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Strike price</th>
              <td class="modal_derivativeinfo" width="30%" id="pastDueDate_modal_strikeprice"> 1024 </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Leverage</th>
              <td class="modal_derivativeinfo" width="30%" id="pastDueDate_modal_leverage"> 2x</td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Due date</th>
              <td class="modal_derivativeinfo" width="30%" id="pastDueDate_modal_duedate"> 2018-09-15</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <div class="modal_table_div">
        <table class="modal_derivative_table">
          <tbody>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Underlying spot price</th>
              <td class="modal_derivativeinfo" width="30%" id="pastDueDate_modal_currentPrice"> - </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Compared to strike price</th>
              <td class="modal_derivativeinfo" width="30%" id="pastDueDate_modal_pl"> - </td>
            </tr>
            <tr class="modal_derivative">
              <th class="modal_derivativeinfo_header" width="30%">Current value of position</th>
              <td class="modal_derivativeinfo" width="30%" id="pastDueDate_modal_value"> - </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <br>
      <div>
        <div id="noWithdrawPossible" style="display:none; font-weight: bold;" class="modal_text">No price available for settlement</div>
        <button class="buttonWithdraw" id="withdrawButton" style="display:none">Withdraw</button>
        <br>
        <button class="buttonWithdraw" id="unsettledWithdrawButton" style="display:none">Unsettled Withdraw</button>
        <br>
        <button class="buttonWithdraw" id="withdrawRemainderAfterDueDateButton" style="display:none">Withdraw unmatched stake</button>
        <br>
        <button class="buttonWithdraw" id="getFreebieAfterDueDateButton" style="display:none">Get bounty</button>
      </div>
      <br>
    </div>
  </div>
  <!-- End of Past Due Date Modal -->

  <!-- Welcome Modal -->
  <div id="welcomeModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p class="modal_title">Get a Bounty!</p>
      <span width="100%" class="modal_text" style="font-size: small; font-weight: bold;">Earn 0.1 ETH by creating a contract and finding a counterparty that enters your contract. It works in a completely trustless way.
      <br>
      <br>
      <span width="100%" style="margin-top: 10px; font-size: small; font-weight: bold;" class="modal_text">Read more about the bounty program and the source code behind it in our <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@robin.blaesing_97056/blockchain-backed-marketing-strategies-for-dapps-ea3d6d30b86f" class="modal_link">Medium article</a></span> or check it out on <a target="_blank" rel="noopener noreferrer" id="freebieModalCheckOnEtherscan" class="modal_link">Etherscan</a>.</span>
      <br>
      <br>
      <br>
      <div>
        <button class="modal_button" id="continueButton">Continue</button>
        <button class="modal_button" id="openExplanationModalButton" onclick="openExplanationModal()">Tutorial</button>
      </div>
      <br>
    </div>

  </div>
  <!-- No Ethereum Modal -->

  <!-- No Ethereum Modal -->
  <div id="noEthereumModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p class="modal_title">No Blockchain Connection</p>
      <span width="100%" class="modal_text" style="font-size: small; font-weight: bold;">Your browser is not connected to the Ethereum blockchain. You can continue by viewing our demo page that shows an up-to-date list of contracts.</span>
      <br>
      <br>
      <span width="100%" style="margin-top: 10px; font-size: small; font-weight: bold;" class="modal_text">
        We suggest to install the browser extension <a rel="noopener noreferrer" target="_blank" href="https://metamask.io" class="modal_link">MetaMask</a>. See<a target="_blank" rel="noopener noreferrer" href="HowItWorks.php" class="modal_link" style="font-size: small; font-weight: bold;"> How It Works</a> for more details.
      </span>
      <br>
      <br>
      <br>
      <div>
        <button class="modal_button" id="continueButton2">Continue</button>
      </div>
      <br>
    </div>

  </div>
  <!-- No Ethereum Modal -->

  <!-- Feedback Modal -->
  <div id="feedbackModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p class="modal_title">How do you like OD.exchange?</p>
      <span width="100%" class="modal_text" style="font-size: small;">Please send us your feedback</span>
      <br>
      <br>
      <textarea class="modal_input_text" placeholder="300 characters maximum" id="feedbackText"></textarea>
      <br>
      <br>
      <br>
      <div>
        <button class="modal_button" id="submitFeedback">Submit feedback</button>
      </div>
      <br>
    </div>

  </div>
  <!-- Feedback Modal -->

<!-- EXPLANATION MODAL -->

  <!-- Explanation Modal -->
  <div id="explanationModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content" style="text-align: unset; height: 410px; text-align: center">
      <span class="close">&times;</span>
      <p class="modal_title" id="explanationModalTitle">Introduction</p>

      <!-- SLIDES -->
      <div class="slideshow-container">

        <div class="mySlides fade">
          <img class="myImg" src="./Graphics/ExplanationDerivative/01 Future.png" alt="Price development of financial asset">
          <div class="explanationText">There are many possible ways prices in financial markets can evolve in the future. Some people expect increasing and some expect decreasing prices.
          </div>
        </div>

        <div class="mySlides fade">
          <img class="myImg" src="./Graphics/ExplanationDerivative/02 Bet Above Strike Price.png" alt="Due date and strike price">
          <div class="explanationText">Imagine the following: You are tracking the price development of a stock, for example. You think that on a certain date (we call this 'due date') the price will be well above a certain value (we call this 'strike price').</div>
        </div>

        <div class="mySlides fade">
          <img class="myImg" src="./Graphics/ExplanationDerivative/03 Bet Below Strike Price.png" alt="Counterparty long and short derivative">
          <div class="explanationText">Another person thinks: 'No way! It will be well below this strike price.'</div>
        </div>

        <div class="mySlides fade">
          <img class="myImg" src="./Graphics/ExplanationDerivative/04 Contract Creation.png" alt="Ethereum smart contract">
          <div class="explanationText">The two of you can now set up a smart contract. For example, both of you can send 1 ETH to this smart contract. These 2 ETH will remain locked in the smart contract until the due date.</div>
        </div>

        <div class="mySlides fade">
          <img class="myImg" src="./Graphics/ExplanationDerivative/05 Due Date.png" alt="Waiting for due date">
          <div class="explanationText">You and your counterparty will now wait until the due date.</div>
        </div>

        <div class="mySlides fade">
          <img class="myImg" src="./Graphics/ExplanationDerivative/06 Due Date Below Strike Price.png" alt="Loosing price development">
          <div class="explanationText">First, let's consider the case in which the price did not develop in your favour. In this example it would be 10 % less than the strike price on the due date.</div>
        </div>

        <div class="mySlides fade">
          <img class="myImg" src="./Graphics/ExplanationDerivative/07 Settlement Below Strike Price.png" alt="Payout for negative result">
          <div class="explanationText">In this case you lose 10 % of your deposited 1 ETH. You can now only withdraw 0.9 ETH from the smart contract. Your counterparty, however, can withdraw 1.1 ETH.</div>
        </div>

        <div class="mySlides fade">
          <img class="myImg" src="./Graphics/ExplanationDerivative/08 Due Date Above Strike Price.png" alt="Winning price development">
          <div class="explanationText">Now, let's consider the case in which the price developed in your favour. In this example it would be 20 % above the strike price.</div>
        </div>

        <div class="mySlides fade">
          <img class="myImg" src="./Graphics/ExplanationDerivative/09 Settlement Above Strike Price.png" alt="Payout for positive result">
          <div class="explanationText">In this case you will be happy to win 20 % of the 1 ETH you deposited in the smart contract. You can now withdraw 1.2 ETH while your counterparty can only withdraw 0.8 ETH.</div>
        </div>

        <div class="mySlides fade">
          <img class="myImg" src="./Graphics/ExplanationDerivative/10 Leverage.png" alt="Leverage bet on financial asset">
          <div class="explanationText">In order to make things a little more exciting, OD.exchange has added a leverage factor of 2 on the price development. This increases the potential gains and also the potential losses by a factor of 2.</div>
        </div>

        <div class="mySlides fade">
          <img class="myImg" src="./Graphics/ExplanationDerivative/11 Bounty.png" alt="Reward bounty proragmme source code">
            <div class="explanationText">
              We reward the first users with 0.1 ETH. You can earn it simply by creating a contract and finding a counterparty that enters your contract.
              <br>
              Read more about the bounty program and the source code behind it in our <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@robin.blaesing_97056/blockchain-backed-marketing-strategies-for-dapps-ea3d6d30b86f" class="modal_link">Medium article</a> or check it out on <a id="freebieModalCheckOnEtherscan2" class="modal_link" target="_blank" rel="noopener noreferrer">Etherscan</a>.
            </div>
        </div>

        <div class="mySlides fade">
          <img class="myImg" src="./Graphics/ExplanationDerivative/12 Enjoy Using.png" alt="Blockchain trading financial derivatives">
            <div class="explanationText">
              You need more information? Read our <a target="_blank" rel="noopener noreferrer" href="HowItWorks.php" class="modal_link">How It Works</a>.
              <br>
              <div class="explanationTexts" style="margin-top: 10px; margin-bottom: 10px">
                <input type="checkbox" id="dismissIntro" onclick="(dismissIntroduction())">  Do not show the introduction again.
              </div>
              <button class="modal_button" id="continueButton3" style="margin: 0px 0px;">Continue</button>
            </div>
        </div>


        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>

      </div>
      <br>

      <div style="text-align:center">
        <span class="dot" onclick="currentSlide(1)"></span>
        <span class="dot" onclick="currentSlide(2)"></span>
        <span class="dot" onclick="currentSlide(3)"></span>
        <span class="dot" onclick="currentSlide(4)"></span>
        <span class="dot" onclick="currentSlide(5)"></span>
        <span class="dot" onclick="currentSlide(6)"></span>
        <span class="dot" onclick="currentSlide(7)"></span>
        <span class="dot" onclick="currentSlide(8)"></span>
        <span class="dot" onclick="currentSlide(9)"></span>
        <span class="dot" onclick="currentSlide(10)"></span>
        <span class="dot" onclick="currentSlide(11)"></span>
        <span class="dot" onclick="currentSlide(12)"></span>
      </div>
      <br>
    </div>

  </div>
<!-- EXPLANATION MODAL -->

</body>

<!--<script src="https://rawgit.com/ethereum/web3.js/d7a235734964bb638aee76d114fe22e78661b964/dist/web3.js"></script>-->
<script src="./Scripts/External/web3.min.js"></script>
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>-->
<script src="./Scripts/External/jquery.min.js"></script>
<!--<script src="https://s3.tradingview.com/tv.js"></script>-->
<!--<script src="./Scripts/External/ga.js"></script>
<script src="./Scripts/External/tv.js"></script>-->
<script src="./Scripts/External/cookieconsent.min.js"></script>
<script src="./Scripts/cookieconsent.js"></script>
<script src="./Scripts/userAccount.js"></script>
<script src="./Scripts/formats.js"></script>
<script src="./Scripts/derivative.js"></script>
<script src="./Scripts/factory.js"></script>
<script src="./Scripts/tables.js"></script>
<script src="./Scripts/init.js"></script>
<script src="./Scripts/collapsible.js"></script>
<script src="./Scripts/modalMockup.js"></script>
<script src="./Scripts/modals.js"></script>
<script src="./Scripts/calculatePLandValue.js"></script>
<script src="./Scripts/derivativesDB.js"></script>
<script src="./Scripts/quickAquire.js"></script>
<script src="./Scripts/infoPopups.js"></script>
<script src="./Scripts/dueDates.js"></script>
<script src="./Scripts/analyticsDB.js"></script>
<script src="./Scripts/makersDB.js"></script>
<script src="./Scripts/feedbackDB.js"></script>
<script src="./Scripts/cookies.js"></script>
<script src="./Scripts/slideShow.js"></script>



<script>
if (getCookie("visited")!="true"){
  //modal("explanationModal");
}
window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            analyticsDB('blockchain', 'LOGGEDOUT');
            await ethereum.enable();
            console.log("Access granted.");
            // Acccounts now exposed
            init()
        } catch (error) {
          console.log('Access denied.');
          init()
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        console.log('Legacy dapp browsers.');
        // Acccounts always exposed
        init()
    }
    // Non-dapp browsers...
    else {
        document.getElementById('noConnection').style.display = "inline-block";
        analyticsDB('blockchain', 'NO');
        console.log('Non-Ethereum browser detected.');
    }
});

</script>

<!-- Chart -->
<script src="./Scripts/External/plotly-latest.min.js"></script>
<script src="./Scripts/chart.js"></script>

<!-- Link to freebie -->
<script>
  document.getElementById("freebieModalCheckOnEtherscan").href = "//etherscan.io/address/" + FREEBIE_ADDRESS_MAINNET
  document.getElementById("freebieModalCheckOnEtherscan2").href = "//etherscan.io/address/" + FREEBIE_ADDRESS_MAINNET
</script>


</html>
