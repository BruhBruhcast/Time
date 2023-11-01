var gameData = {
  totalTime: 0,
  unspentTime: 0,
  tickspeedBought: 0,
  tickspeedCost: 0,
  rank: 0,
  rankCost: 10,
  tier: 0,
  tierCost: 2,
}

function timeGain() {
  x = 1
  x *= tickspeedMult()
  x *= 0.05
  return x
}

function gainTime() {
  gameData.totalTime += timeGain()
  gameData.unspentTime += timeGain()
  document.getElementById("totalTime").innerHTML = gameData.totalTime + " total seconds"
  document.getElementById("unspentTime").innerHTML = gameData.unspentTime + " unspent seconds"
}

function showTickspeed() {
  var tickspeedShow = document.getElementById("tickspeedUpgrade");
  tickspeedShow.style.display = "block"
}

function baseTickspeedMult() {
  x = 1.125
  if (gameData.rank >= 1) {
    x += .125
  }
}

function tickspeedMult() {
  x = baseTickspeedMult() ** gameData.tickspeedBought
  return x
}

function tickspeedCost() {
  x = 10
  x *= (2 ** gameData.rank)
  if (gameData.rank >= 2) {
    x /= 2
  }
  if (gameData.rank >= 5) {
    x /= (1 + gameData.rank * 0.01)
  }
  return x
} 

function buyTickspeed() {
  if (gameData.unspentTime >= gameData.tickspeedCost) {
    gameData.unspentTime -= gameData.tickspeedCost
    gameData.tickspeedBought += 1
    gameData.tickspeedCost = tickspeedCost()
    document.getElementById("unspentTime").innerHTML = gameData.unspentTime + " unspent seconds"
    document.getElementById("tickspeedUpgrade").innerHTML = "Multiply Tickspeed by " + baseTickspeedMult() + " (Currently " + tickspeedMult() + ` seconds per real-time second) 
    Cost: ` + gameData.tickspeedCost + " seconds"
  }
}

function showRank() {
  var rankShow = document.getElementById("rank");
  rankShow.style.display = "block"
  var tierShow = document.getElementById("tier");
  tierShow.style.display = "block"
}



function rankUp() {
  if (gameData.unspentTime >= gameData.rankCost) {
    gameData.unspentTime = 0
    gameData.rank += 1
    function rankScalingMult() {
      x = 1.5
      if (gameData.rank >= 3) {
        x -= 0.1
      }
      return x
    }
    gameData.rankCost *= rankScalingMult()
    function rankScalingExp() {
      x = 1.1
      if (gameData.rank >= 1) {
        x -= 0.05
      }
      return x
    }
    gameData.rankCost **= rankScalingExp()
    function nextRankReward() {
      if (gameData.rank < 1) {
        return("At rank 1, increase the tickspeed multiplier by 0.125")
      }
      else if (gameData.rank < 2) {
        return("At rank 2, halve the tickspeed cost")
      }
      else if (gameData.rank < 3) {
        return("At rank 3, reduce later rank scaling multipliers")
      }
      else if (gameData.rank < 5) {
        return("At rank 5, divide tickspeed cost based on rank")
      }
    }
    document.getElementById("unspentTime").innerHTML = gameData.unspentTime + " unspent seconds"
    document.getElementById("rank").innerHTML = "Rank up (Currently Rank " + gameData.rank + `)
    ` + nextRankReward() + `
    Requires: ` + gameData.rankCost + " seconds"
  }
}

function tierUp() {
  if (gameData.rank >= gameData.tierCost) {
    gameData.unspentTime = 0
    gameData.rank = 0
    gameData.tier += 1
    gameData.tierCost = gameData.tier ** 2
    gameData.tierCost += 2
    function nextTierReward() {
      if (gameData.tier < 1) {
        return("At tier 1, decrease the rank scaling exponent")
      }
      else if (gameData.rank < 2) {
        return("At tier 2, halve the ")
      }
    }
    document.getElementById("unspentTime").innerHTML = gameData.unspentTime + " unspent seconds"
    document.getElementById("rank").innerHTML = "Rank up (Currently Rank " + gameData.rank + `)
    ` + nextRankReward() + `
    Requires: ` + gameData.rankCost + " seconds"
    document.getElementById("tier").innerHTML = "Tier up (Currently Tier " + gameData.tier + `)
    ` + nextTierReward() + `
    Requires: Rank ` + Math.ceil(gameData.tierCost)}
}




var mainGameLoop = window.setInterval(function() {
  gainTime()
}, 50)