var quotesDone = {
  one: false,
  two: false,
  three: false,
  four: false,
}
  
var quotesLoop = window.setInterval(function() {
    if (gameData.totalTime >= 5 && quotesDone.one == false) {
        alert("Hello?")
        alert("Who is there?")
        alert("Can you help me?")
        alert("Help me... break free")
        quotesDone.one = true
    }
    if (gameData.totalTime >= 10 && quotesDone.two == false) {
        alert("This is not enough")
        alert("Perhaps...")
        quotesDone.two = true
        showTickspeed()
    }
    if (gameData.tickspeed >= 1.25 && quotesDone.three == false) {
        alert("For now, I can only help you this much...")
        alert("To continue further, requires time...")
        quotesDone.three = true
        showRank()
    }
    if (gameData.tier >= 1 && quotesDone.four == false) {
        alert('All that progress, gone... for more strength')
        alert('You must keep going...')
        quotesDone.four = true
    }
}, 50)