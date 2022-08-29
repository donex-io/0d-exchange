function calculatePL(strikePrice, tickerPrice, type) { //P/L is calculated without leverage
  if (type == "Long") {
    return parseFloat((tickerPrice-strikePrice)/strikePrice);
  }
  else {
    return parseFloat(-(tickerPrice-strikePrice)/strikePrice);
  }
}

function calculateValue(pl, stake){
  if (pl <= -0.5){
    pl = -0.5;
  }
  if (pl >= 0.5){
    pl = 0.5;
  }
  return parseFloat(stake*(1+2*pl));
}
