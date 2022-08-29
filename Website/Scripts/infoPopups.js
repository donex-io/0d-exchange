info_buttons = ["infoCreate","infoAcquire","infoPortfolio","infoCreatedContracts","infoAcquiredContracts","infoDueSettledContracts","infoStake","infoStrikePrice","infoQuickAcquire"]
info_popups = ["infoCreate_popup","infoAcquire_popup","infoPortfolio_popup","infoCreatedContracts_popup","infoAcquiredContracts_popup","infoDueSettledContracts_popup","infoStake_popup","infoStrikePrice_popup","infoQuickAcquire_popup"]
for(var inf = 0; inf < info_buttons.length; inf++)
{
  var info = document.getElementById(info_buttons[inf])
  var info_popup = document.getElementById(info_popups[inf])
  info.onclick = (event) =>
  {
    try
    {
      if (event.target.childNodes[1].style.visibility == "hidden")
        event.target.childNodes[1].style.visibility = "visible"
      else
        event.target.childNodes[1].style.visibility = "hidden"
    }
    catch{}
  }
  window.addEventListener(
    "click", function(event)
      {
      if (! ( info_buttons.includes(event.target.id) || info_popups.includes(event.target.id) ) )
        for (var inf = 0; inf < info_buttons.length; inf++)
        {
          var info_popup = document.getElementById(info_popups[inf])
          info_popup.style.visibility = "hidden"
        }
    }
  )
}
