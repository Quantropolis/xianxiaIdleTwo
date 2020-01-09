var playerData = {

  rank: {

    currentRank: 0,
    currentStage: 0,
    currentXp: [0],
    reqXp: [100]

  },

  combatRating: 0,
  spiritStones: 0,
  cycles: 0,
  currentXpGen: "",
  currentXpId: ""

}

var generalData = {

  stageNames: ['Mortal', 'Spirit Realm', 'Origin Realm', 'Profound Realm', 'Heaven Realm', 'Martial Lord', 'Martial King', 'Martial Emperor','Martial Ancestor', 'True Immortal', 'Heavenly Immortal', 'Martial Immortal', 'Exalted', 'Utmost Exalted', 'Half God', 'True God', 'Martial God'],
  suffixes: ['', 'st','nd','rd','th','th','th','th','th','th']

}

var techData = {

  unarmedTechniques: {

    basicFist: {

      bought: [false],
      cost: 0,
      level: [0],
      currentXp: [0],
      reqXp: [25],
      maxLevel: 5,
      amountPerLevel: [1,1,1,2,2],
      techniqueCurrentRating: [0]

    }

  },
  weaponTechniques: {

    basicSword: {

      bought: [false],
      cost: 3,
      level: [0],
      currentXp: [0],
      reqXp: [25],
      maxLevel: 5,
      amountPerLevel: [1,1,1,2,2],
      techniqueCurrentRating: [0]

    }

  },
  movementTechniques: {

    basicMove: {

      bought: [false],
      cost: 5,
      level: [0],
      currentXp: [0],
      reqXp: [25],
      maxLevel: 5,
      amountPerLevel: [1,1,1,2,2],
      techniqueCurrentRating: [0]

    }

  },
  defensiveTechniques: {

    basicDef: {

      bought: [false],
      cost: 7,
      level: [0],
      currentXp: [0],
      reqXp: [25],
      maxLevel: 5,
      amountPerLevel: [1,1,1,2,2],
      techniqueCurrentRating: [0]

    }

  },
  cultivationTechniques: {

    basicCult: {

      bought: [false],
      cost: 10,
      level: [0],
      currentXp: [0],
      reqXp: [25],
      maxLevel: 5,
      amountPerLevel: [1,1,1,2,2],
      techniqueCurrentRating: [0]

    }

  }

}

var daoData = {



}

var legacyData = {



}

var reinData = {



}
//functions
//core functions

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function purchaseTechnique(cost, bought, buttonId, currentLevel, maxLevel, levelIncreases, techniqueRating, cultivation, btnName){

  if((playerData.spiritStones >= cost)&&(bought[0] == false)){
    playerData.spiritStones -= cost
    bought[0] = true
    increaseTechniqueLevel(currentLevel, maxLevel, levelIncreases, techniqueRating, cultivation, btnName)
    if((cultivation == true)&&(playerData.currentXpGen == "")){playerData.currentXpGen = "playerData.rank.currentXp"; playerData.currentXpId = "genXpBtn"}
    document.getElementById(buttonId).style = "display: none;"
    document.getElementById(buttonId + "Lbl").style = "text-align: center;"
  }

}

function playerLevelUp(){

  if(playerData.rank.currentXp[0] >= playerData.rank.reqXp[0]){

    playerData.rank.currentXp[0] -= playerData.rank.reqXp[0]

    if(playerData.rank.currentStage == 0){

      playerData.rank.currentStage++
      playerData.rank.currentRank++
      playerData.combatRating += playerData.rank.currentStage*Math.pow(10, playerData.rank.currentStage)
      playerData.rank.reqXp[0] *= 2

    } else if(playerData.rank.currentRank == 9){

      playerData.rank.currentRank = 1
      playerData.rank.currentStage++
      playerData.combatRating += playerData.rank.currentStage*Math.pow(10, playerData.rank.currentStage)
      playerData.rank.reqXp[0] *= 10

    } else {

      playerData.rank.currentRank++
      playerData.combatRating += 0.5*playerData.rank.currentRank*playerData.rank.currentStage*Math.pow(10, playerData.rank.currentStage)
      playerData.rank.reqXp[0] *= 2
    }

  }

}

function techLevelUp(xp, reqXp, currentLevel, maxLevel, levelIncreases, techniqueRating, cultivation, btnName){

  if((currentLevel[0] < maxLevel)&&(xp[0] >= reqXp[0])){
    xp[0] -= reqXp[0]
    reqXp[0] *= 2
    increaseTechniqueLevel(currentLevel, maxLevel, levelIncreases, techniqueRating, cultivation, btnName)
    M.toast({html: 'Technique Level Up', displayLength: 10000, classes: 'rounded blue darken-3 center-align'});
    if(currentLevel[0] == maxLevel){xp[0] = reqXp[0]; trainSwitch("playerData.rank.currentXp", "genXpBtn"); document.getElementById(btnName).classList.add("disabled"); document.getElementById(btnName).innerHTML = "Maxed"}
  }

}

function increaseTechniqueLevel(currentLevel, maxLevel, levelIncreases, techniqueRating, cultivation, btnName){

  if(currentLevel[0] < maxLevel){

    techniqueRating[0] += levelIncreases[currentLevel[0]]
    if(cultivation == false){playerData.combatRating += levelIncreases[currentLevel[0]]}else{playerData.cycles += levelIncreases[currentLevel[0]]}
    currentLevel[0] = currentLevel[0] + 1
    if(currentLevel[0] = 1){document.getElementById(btnName + "Section").style = ""}

  }

}

function fight(playerRating, enemyRating, fightReward, progressId, buttonId){

  if(document.getElementById(progressId).value >= 1){
    if(Math.random() < calculateWinChance(playerRating, enemyRating) / 100){
      playerData.spiritStones += fightReward
      M.toast({html: 'Won Fight', classes: 'rounded green darken-3 center-align'});
    } else {M.toast({html: 'Lost Fight', classes: 'rounded red darken-3 center-align'});}
    document.getElementById(progressId).value = 0
    document.getElementById(buttonId).classList.add("disabled")
  }

}

function calculateWinChance(playerRating, enemyRating){

  if(playerRating >= enemyRating*5){
    return 100
  } else if(playerRating <= enemyRating / 5){
    return 0
  } else {
    return getBaseLog(1.033,(playerRating / enemyRating)) + 50
  }

}

function train(location, xp){

  location[0] += xp

}

function trainSwitch(xpLocation, id){

  document.getElementById(playerData.currentXpId).classList.remove("disabled")
  playerData.currentXpGen = xpLocation
  playerData.currentXpId = id

}

var trainLoop = setInterval(function(){

  if(playerData.currentXpGen != ""){

    train(eval(playerData.currentXpGen), playerData.cycles)

  }

},1000)

//activate materialize elements
M.AutoInit();

//event listeners
//purchases
document.getElementById("techUnarmedPurchaseOneBtn").addEventListener("click", function(){purchaseTechnique(techData.unarmedTechniques.basicFist.cost, techData.unarmedTechniques.basicFist.bought, "techUnarmedPurchaseOneBtn", techData.unarmedTechniques.basicFist.level, techData.unarmedTechniques.basicFist.maxLevel, techData.unarmedTechniques.basicFist.amountPerLevel, techData.unarmedTechniques.basicFist.techniqueCurrentRating, false, "techUnarmedTrainOneBtn")})
document.getElementById("techWeaponPurchaseOneBtn").addEventListener("click", function(){purchaseTechnique(techData.weaponTechniques.basicSword.cost, techData.weaponTechniques.basicSword.bought, "techWeaponPurchaseOneBtn", techData.weaponTechniques.basicSword.level, techData.weaponTechniques.basicSword.maxLevel, techData.weaponTechniques.basicSword.amountPerLevel, techData.weaponTechniques.basicSword.techniqueCurrentRating, false, "techWeaponTrainOneBtn")})
document.getElementById("techMovementPurchaseOneBtn").addEventListener("click", function(){purchaseTechnique(techData.movementTechniques.basicMove.cost, techData.movementTechniques.basicMove.bought, "techMovementPurchaseOneBtn", techData.movementTechniques.basicMove.level, techData.movementTechniques.basicMove.maxLevel, techData.movementTechniques.basicMove.amountPerLevel, techData.movementTechniques.basicMove.techniqueCurrentRating, false, "techMovementTrainOneBtn")})
document.getElementById("techDefensivePurchaseOneBtn").addEventListener("click", function(){purchaseTechnique(techData.defensiveTechniques.basicDef.cost, techData.defensiveTechniques.basicDef.bought, "techDefensivePurchaseOneBtn", techData.defensiveTechniques.basicDef.level, techData.defensiveTechniques.basicDef.maxLevel, techData.defensiveTechniques.basicDef.amountPerLevel, techData.defensiveTechniques.basicDef.techniqueCurrentRating, false, "techDefensiveTrainOneBtn")})
document.getElementById("techCultivationPurchaseOneBtn").addEventListener("click", function(){purchaseTechnique(techData.cultivationTechniques.basicCult.cost, techData.cultivationTechniques.basicCult.bought, "techCultivationPurchaseOneBtn", techData.cultivationTechniques.basicCult.level, techData.cultivationTechniques.basicCult.maxLevel, techData.cultivationTechniques.basicCult.amountPerLevel, techData.cultivationTechniques.basicCult.techniqueCurrentRating, true, "techCultivationTrainOneBtn")})
//fights
document.getElementById("fightMortalOneBtn").addEventListener("click", function(){fight(playerData.combatRating, 1, 1, "fightMortalOneProgress", "fightMortalOneBtn")})
document.getElementById("fightMortalTwoBtn").addEventListener("click", function(){fight(playerData.combatRating, 3, 2, "fightMortalTwoProgress", "fightMortalTwoBtn")})
document.getElementById("fightMortalThreeBtn").addEventListener("click", function(){fight(playerData.combatRating, 7, 5, "fightMortalThreeProgress", "fightMortalThreeBtn")})
//xp button
document.getElementById("genXpBtn").addEventListener("click", function(){trainSwitch("playerData.rank.currentXp", "genXpBtn")})
// tech training
document.getElementById("techUnarmedTrainOneBtn").addEventListener("click", function(){trainSwitch("techData.unarmedTechniques.basicFist.currentXp", "techUnarmedTrainOneBtn")})
document.getElementById("techWeaponTrainOneBtn").addEventListener("click", function(){trainSwitch("techData.weaponTechniques.basicSword.currentXp", "techWeaponTrainOneBtn")})
document.getElementById("techMovementTrainOneBtn").addEventListener("click", function(){trainSwitch("techData.movementTechniques.basicMove.currentXp", "techMovementTrainOneBtn")})
document.getElementById("techDefensiveTrainOneBtn").addEventListener("click", function(){trainSwitch("techData.defensiveTechniques.basicDef.currentXp", "techDefensiveTrainOneBtn")})
document.getElementById("techCultivationTrainOneBtn").addEventListener("click", function(){trainSwitch("techData.cultivationTechniques.basicCult.currentXp", "techCultivationTrainOneBtn")})

gameLoop = setInterval(function(){

  //screen updates
  if(playerData.rank.currentRank == 0){document.getElementById("rankLbl").innerHTML = generalData.stageNames[playerData.rank.currentStage]} else {document.getElementById("rankLbl").innerHTML = playerData.rank.currentRank + generalData.suffixes[playerData.rank.currentRank] + ' Rank ' + generalData.stageNames[playerData.rank.currentStage]}
  // main resources / stat updates
  document.getElementById("combatRatingLbl").innerHTML = "Combat Rating: " + playerData.combatRating
  document.getElementById("spiritStonesLbl").innerHTML = "Spirit Stones: " + playerData.spiritStones
  document.getElementById("cyclesLbl").innerHTML = "Cycles / sec: " + playerData.cycles
  document.getElementById("mainProgress").value = playerData.rank.currentXp[0] / playerData.rank.reqXp[0]

  //player level ups
  if(document.getElementById("mainProgress").value >= 1){playerLevelUp()}
  //fight cooldown bars
  if(document.getElementById("fightMortalOneProgress").value < 1){document.getElementById("fightMortalOneProgress").value += 0.05; if(document.getElementById("fightMortalOneProgress").value >= 1){document.getElementById("fightMortalOneBtn").classList.remove("disabled")}}
  if(document.getElementById("fightMortalTwoProgress").value < 1){document.getElementById("fightMortalTwoProgress").value += 0.05; if(document.getElementById("fightMortalTwoProgress").value >= 1){document.getElementById("fightMortalTwoBtn").classList.remove("disabled")}}
  if(document.getElementById("fightMortalThreeProgress").value < 1){document.getElementById("fightMortalThreeProgress").value += 0.05; if(document.getElementById("fightMortalThreeProgress").value >= 1){document.getElementById("fightMortalThreeBtn").classList.remove("disabled")}}

  //currentXpButton disabling
  if(playerData.currentXpId != "") {if(!document.getElementById(playerData.currentXpId).classList.contains("disabled")){document.getElementById(playerData.currentXpId).classList.add("disabled")}}

  //tech training bar updates
  document.getElementById("techUnarmedTrainOneProgress").value = techData.unarmedTechniques.basicFist.currentXp[0] / techData.unarmedTechniques.basicFist.reqXp[0]
  document.getElementById("techUnarmedCROneLbl").innerHTML = "Combat Rating: " + techData.unarmedTechniques.basicFist.techniqueCurrentRating
  document.getElementById("techUnarmedLevelOneLbl").innerHTML = "Level: " + techData.unarmedTechniques.basicFist.level[0]
  document.getElementById("techWeaponTrainOneProgress").value = techData.weaponTechniques.basicSword.currentXp[0] / techData.weaponTechniques.basicSword.reqXp[0]
  document.getElementById("techWeaponCROneLbl").innerHTML = "Combat Rating: " + techData.weaponTechniques.basicSword.techniqueCurrentRating
  document.getElementById("techWeaponLevelOneLbl").innerHTML = "Level: " + techData.weaponTechniques.basicSword.level[0]
  document.getElementById("techMovementTrainOneProgress").value = techData.movementTechniques.basicMove.currentXp[0] / techData.movementTechniques.basicMove.reqXp[0]
  document.getElementById("techMovementCROneLbl").innerHTML = "Combat Rating: " + techData.movementTechniques.basicMove.techniqueCurrentRating
  document.getElementById("techMovementLevelOneLbl").innerHTML = "Level: " + techData.movementTechniques.basicMove.level[0]
  document.getElementById("techDefensiveTrainOneProgress").value = techData.defensiveTechniques.basicDef.currentXp[0] / techData.defensiveTechniques.basicDef.reqXp[0]
  document.getElementById("techDefensiveCROneLbl").innerHTML = "Combat Rating: " + techData.defensiveTechniques.basicDef.techniqueCurrentRating
  document.getElementById("techDefensiveLevelOneLbl").innerHTML = "Level: " + techData.defensiveTechniques.basicDef.level[0]
  document.getElementById("techCultivationTrainOneProgress").value = techData.cultivationTechniques.basicCult.currentXp[0] / techData.cultivationTechniques.basicCult.reqXp[0]
  document.getElementById("techCultivationCROneLbl").innerHTML = "Cycles / sec: " + techData.cultivationTechniques.basicCult.techniqueCurrentRating
  document.getElementById("techCultivationLevelOneLbl").innerHTML = "Level: " + techData.cultivationTechniques.basicCult.level[0]

  //tech training bar level ups
  if(document.getElementById("techUnarmedTrainOneProgress").value >= 1) {techLevelUp(techData.unarmedTechniques.basicFist.currentXp, techData.unarmedTechniques.basicFist.reqXp, techData.unarmedTechniques.basicFist.level, techData.unarmedTechniques.basicFist.maxLevel, techData.unarmedTechniques.basicFist.amountPerLevel, techData.unarmedTechniques.basicFist.techniqueCurrentRating, false, "techUnarmedTrainOneBtn")}
  if(document.getElementById("techWeaponTrainOneProgress").value >= 1) {techLevelUp(techData.weaponTechniques.basicSword.currentXp, techData.weaponTechniques.basicSword.reqXp, techData.weaponTechniques.basicSword.level, techData.weaponTechniques.basicSword.maxLevel, techData.weaponTechniques.basicSword.amountPerLevel, techData.weaponTechniques.basicSword.techniqueCurrentRating, false, "techWeaponTrainOneBtn")}
  if(document.getElementById("techMovementTrainOneProgress").value >= 1) {techLevelUp(techData.movementTechniques.basicMove.currentXp, techData.movementTechniques.basicMove.reqXp, techData.movementTechniques.basicMove.level, techData.movementTechniques.basicMove.maxLevel, techData.movementTechniques.basicMove.amountPerLevel, techData.movementTechniques.basicMove.techniqueCurrentRating, false, "techMovementTrainOneBtn")}
  if(document.getElementById("techDefensiveTrainOneProgress").value >= 1) {techLevelUp(techData.defensiveTechniques.basicDef.currentXp, techData.defensiveTechniques.basicDef.reqXp, techData.defensiveTechniques.basicDef.level, techData.defensiveTechniques.basicDef.maxLevel, techData.defensiveTechniques.basicDef.amountPerLevel, techData.defensiveTechniques.basicDef.techniqueCurrentRating, false, "techDefensiveTrainOneBtn")}
  if(document.getElementById("techCultivationTrainOneProgress").value >= 1) {techLevelUp(techData.cultivationTechniques.basicCult.currentXp, techData.cultivationTechniques.basicCult.reqXp, techData.cultivationTechniques.basicCult.level, techData.cultivationTechniques.basicCult.maxLevel, techData.cultivationTechniques.basicCult.amountPerLevel, techData.cultivationTechniques.basicCult.techniqueCurrentRating, true, "techCultivationTrainOneBtn")}

  //win percentage updates
  document.getElementById("mortalFightOneProbabilityLbl").innerHTML = "Win Probability: " + calculateWinChance(playerData.combatRating, 1).toFixed(1) + "%"
  document.getElementById("mortalFightTwoProbabilityLbl").innerHTML = "Win Probability: " + calculateWinChance(playerData.combatRating, 3).toFixed(1) + "%"
  document.getElementById("mortalFightThreeProbabilityLbl").innerHTML = "Win Probability: " + calculateWinChance(playerData.combatRating, 7).toFixed(1) + "%"

},50)
