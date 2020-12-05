/* 
 * This layer should hold the logic that interfaces the engine with Unity.  To the extent possible, keep
 * game-related logic out of this layer.  The point of this logic is to translate UI/Unity-level input/outputs with
 * engine input/outputs 
 */

// The lines below override LITTLE_RAN because the bit operations are causing it to crash with "float unrepresentable in integer range" in WebGL
// I really need to make a way to do the bitwise operations so that they don't crash in WebGL
CHARACTER.prototype.HasDeathImmunity = function () { return false; }

Globals.SPECAB_HACKS = {};
// This stops free-attacks like when the player moves away from the monsters or vice-versa
Globals.SPECAB_HACKS["FreeAttack-CanFreeAttack"] = function (pkt) { SPECAB.p_hook_parameters[0] = "N"; }


UnityEngine = importNamespace("UnityEngine");  // For Jint to access C# library
UAFLib = importNamespace("UAFLib");
// Override the logging function for now because System.Console is not available in WebGL - should change to use Unity.Debug
Globals.debug = function (msg) {
    UnityEngine.Debug.Log(msg);
}

/** Load item database */
itemData.LoadFromLoader(consoleResults.payload[0]);
specialAbilitiesData.LoadFromLoader(consoleResults.payload[1]);

UIEventManager.UpdateCombatMessage = function () {
    unityUAFEventManager.UpdateCombatMessage(DispText.CombatMsg);
}

UIEventManager.CombatantMoved = function (x, y, self, w, h) {
    var c = combatData.m_aCombatants[self];
    unityUAFEventManager.CombatantMoved(x, y, c.GetName(), c.GetHitPoints(), c.GetAdjAC(), c.GetNbrAttacks(), c.m_pCharacter.GetMaxMovement() - c.m_iMovement, c.m_pCharacter.GetCurrExp(c.m_pCharacter.classID.toLowerCase()));
}

UIEventManager.StartAttack = function (attacker, attacked) {
    unityUAFEventManager.StartAttack(attacker, attacked);
}

UIEventManager.CombatantDying = function (id, x, y) {
    unityUAFEventManager.CombatantDying(id, x, y);
}

UIEventManager.CombatantDead = function (id, x, y) {
    /** TODO:  I don't love having the xp awarding happening at this layer.  It is here because the engine only awards xp
     * after the battle is "over" via DetermineVictoryExpPoints(), but in this game, the battle is never over.  So that logic
     * has to go somwhere and I figured here would be a better place than the UI layer */
    var xp = combatData.m_aCombatants[id].getCharExpWorth();
    combatData.m_aCombatants[0].m_pCharacter.giveCharacterExperience(xp, false);
    unityUAFEventManager.CombatantDead(id, x, y);
}

UIEventManager.PlaySound = function (soundName) {
    unityUAFEventManager.PlaySound(soundName);
}

function loadLibraryStub() {
    loadRaces();
    loadAbilities();
    loadClasses();
    loadMonsters();
    loadBaseClassStats();
}

function loadRaces() {
    var data = new RACE_DATA();
    data.m_name = "Monster";
    raceData.AddRace(data);
}

function loadMonsters() {
    monsterData.MonsterData[0] = new MONSTER_DATA();
    monsterData.MonsterData[0].Name = "Kobold";
    monsterData.MonsterData[0].monsterID = "Kobold";
    monsterData.MonsterData[0].classID = "Fighter";
    monsterData.MonsterData[0].raceID = "Monster";
    //icon file = icon_Kobold.png, 0, 2, 48, 48, 0, 1, 2
    //miss sound = sound_Miss.wav
    //hit sound = sound_Hit.wav
    //move sound = sound_MonsterMoveStep.wav
    //death sound = sound_MonsterDeathMedium.wav
    monsterData.MonsterData[0].intelligence = 9;
    monsterData.MonsterData[0].Armor_Class = 10;
    monsterData.MonsterData[0].Movement = 6;
    monsterData.MonsterData[0].Hit_Dice = 0.500000;
    monsterData.MonsterData[0].UseHitDice = true;
    monsterData.MonsterData[0].Hit_Dice_Bonus = 0;
    monsterData.MonsterData[0].THAC0 = 20;
    monsterData.MonsterData[0].Magic_Resistance = 0;
    monsterData.MonsterData[0].Size = creatureSizeType.Medium;
    monsterData.MonsterData[0].Morale = 25;
    monsterData.MonsterData[0].XP_Value = 7;
    monsterData.MonsterData[0].m_type = MONSTER_TYPE;
    monsterData.MonsterData[0].attackData.monsterAttackDetails.mList[0] = new ATTACK_DETAILS()
    monsterData.MonsterData[0].attackData.monsterAttackDetails.mList[0].sides = 4;
    monsterData.MonsterData[0].attackData.monsterAttackDetails.mList[0].nbr = 1;
    monsterData.MonsterData[0].attackData.monsterAttackDetails.mList[0].bonus = 0;

    //Class = Fighter
    monsterData.MonsterData[0].Race = RACE_DATA_TYPE.Monster;
    /*form = none
    penalty = GnomeTHAC0 + RangerDmg
    immunity = none
    Misc Options = can be held / charmed
    item = Dagger
    item = Buckler
    attack = 4, 1, 0, attacks,
    Undead = none
    */
}

function loadClasses() {
    var data = new CLASS_DATA();
    data.m_name = "Fighter";
    data.m_baseclasses.baseclasses.push("fighter");
    classData.AddClass(data);

    data2 = new CLASS_DATA();
    data2.m_name = "Thief";
    data2.m_baseclasses.baseclasses.push("thief");
    classData.AddClass(data2);
}

function loadBaseClassStats() {
    var bcd = new BASE_CLASS_DATA();
    bcd.m_name = "fighter";
    baseclassData.Add(bcd);
}

function loadAbilities() {
    loadAbility("Strength");
    loadAbility("Intelligence");
    loadAbility("Wisdom");
    loadAbility("Dexterity");
    loadAbility("Charisma");
}

function loadAbility(abilityName) {
    var data = new ABILITY_DATA();
    data.m_name = abilityName;
    data.m_abbreviation = abilityName.substr(0, 3).toUpperCase();
    data.m_roll.m_Text = ""
    abilityData.AddAbility(data);
}

function packageCombatantStatus(c) {
    var data = [];
    data[0] = c.x;
    data[1] = c.y;
    data[2] = c.GetName();
    data[3] = c.GetHitPoints();
    data[4] = c.GetAdjAC();
    data[5] = c.GetNbrAttacks();
    data[6] = c.m_pCharacter.GetMaxMovement() - c.m_iMovement;
    data[7] = c.m_pCharacter.monsterID;
    data[8] = c.m_pCharacter.GetCurrExp(c.m_pCharacter.classID.toLowerCase());
    return data;
}

function packageMapData() {
    var mapData = [];
    for (i = 0; i < Drawtile.MAX_TERRAIN_HEIGHT; i++) {
        mapData[i] = [];
        for (j = 0; j < Drawtile.MAX_TERRAIN_WIDTH; j++) {
            mapData[i][j] = Drawtile.terrain[i][j].tileIndex;
        }
    }
    return mapData;
}

function packageMapAndCombatantStatus(c) {
    var data = [];
    data[0] = packageCombatantStatus(c);
    data[1] = packageMapData();
    return data;
}

function makeCharInventoryList(c) {
    return makeInventoryList(c.m_pCharacter.myItems);
}

function makeInventoryList(itemList) {
    if (itemList == null) {
        return "";      // Jint did not like this being null - NullReferenceException
    }
    var str = "";
    for (idx = 0; idx < itemList.m_items.GetCount(); idx++) {
        str += itemList.IsReady(idx) ? "*" : " ";
        str += itemList.GetItemIDByPos(idx) + "\n";
    }
    return str;
}


var combatantReady = -1;
var ALL_READY = -2;
COMBATANT.prototype.IsDone = function (freeAttack, comment) {
    //Override IsDone so that I can control who moves
    if (this.self == ALL_READY) {
        return true;
    } else if (this.self != combatantReady) {
        return true;
    }
    return false;
}


function startRound() {
    callCount = 0;
    DispText.CombatMsg = "";
    UIEventManager.UpdateCombatMessage(DispText.CombatMsg);

    for (idx = 1; idx < combatData.NumCombatants(); idx++) {  // start at one and <= to skip the player
        combatData.m_aCombatants[idx].m_target = -1;
    }
    combatData.m_eSurprise = eventSurpriseType.PartySurprised;  // This will force the monsters to go first
    combatantReady = ALL_READY;
    combatData.StartNewRound();
    combatantReady = 0;
}

function moveMonster(idxMonster) {
    combatantReady = idxMonster;    // Skip 0 - that is the player
    combatData.UpdateCombat();
    combatData.QComb.NotStartOfTurn();
    combatData.UpdateCombat();              // Why do I have to call this again?
    combatData.HandleCurrState(true);
    var m_iDeathIndex = -1;
    combatData.HandleTimeDelayMsgBegin(0, m_iDeathIndex); // return from a timer pause that let the user see the roll/message
    combatData.m_aCombatants[combatData.GetCurrCombatant()].EndTurn();
}


function populateItemList(listToPopulate, items) {
    for (idx = 0; idx < items.length; idx++) {
        listToPopulate.addItem5(items[idx].itemID, items[idx].qty, 0, false, 0);
    }
}

function itemListAsArray(itemList) {
    var result = [];
    for (idx = 0; idx < itemList.m_items.GetCount(); idx++) {
        var item = ["" + itemList.GetAtPos(idx).itemID, "" + itemList.GetAtPos(idx).qty];
        result.push(item);
    }
    return result;
}


function transferAllToPlayer(itemList) {
    var player = combatData.m_aCombatants[0].m_pCharacter;
    for (var idx = 0; idx < itemList.m_items.GetCount(); idx++) {
        player.addCharacterItem(itemList.GetAtPos(idx).itemID, itemList.GetAtPos(idx).qty, 0, 0, 0);
    }
    itemList.Clear();
}

var Warrior = new CHARACTER();
Warrior.name = "Hardest_Ken";
Warrior.classID = "Fighter";
Warrior.SetStatus(charStatusType.Okay);
Warrior.hitPoints = 20;
Warrior.maxHitPoints = 20;
Warrior.maxMovement = 20;
Warrior.age = 20;
Warrior.maxAge = 100;
Warrior.alignment = 0;
Warrior.encumbrance = 10;
Warrior.maxEncumbrance = 1000;

for (var idxCoin = 0; idxCoin < 10; idxCoin++) {
    Warrior.money.Coins[idxCoin] = 0;
}

var bcs = new BASECLASS_STATS();
bcs.currentLevel = 1;
bcs.baseclassID = "fighter";
Warrior.baseclassStats.push(bcs);


var cWarrior = new COMBATANT();
cWarrior.m_pCharacter = Warrior;
cWarrior.self = 0;


loadLibraryStub();
Globals.logDebuggingInfo = true;

var combatEventData = new COMBAT_EVENT_DATA();
combatEventData.monsters = new MONSTER_EVENT_DATA();
var monsterEvent = new MONSTER_EVENT();
monsterEvent.UseQty = MONSTER_EVENT.meUseQty;
monsterEvent.UseQty = MONSTER_EVENT.meUsePercent;
monsterEvent.qtyDiceSides = 6;
monsterEvent.qtyDiceQty = 1;
monsterEvent.qtyBonus = 2;
monsterEvent.qty = 10;
monsterEvent.qty = 3;
monsterEvent.monsterID = "Kobold";
monsterEvent.m_type = MONSTER_TYPE;
monsterData.MonsterData[0].MoveSound = new SOUND_BYTE();
monsterData.MonsterData[0].MoveSound.hSound = "sound_CharMove";
monsterData.MonsterData[0].MissSound = new SOUND_BYTE();
monsterData.MonsterData[0].MissSound.hSound = "sound_Miss";
monsterData.MonsterData[0].HitSound = new SOUND_BYTE();
monsterData.MonsterData[0].HitSound.hSound = "sound_Hit";
combatEventData.distance = eventDistType.UpClose;
combatEventData.monsters.Add(monsterEvent);
//combatEventData.randomMonster = true;   // This seems to cause an NPE at Line 306 of COMBAT_DATA - "pSaveCharPointer is null"
combatEventData.UseQty = MONSTER_EVENT.meUsePercent;

//var combatData = new COMBAT_DATA();    // This is pretty much the combat "map" and all data on it
party.Posx = 10;
party.Posy = 10;
globalData.SetMaxPCs(2);
globalData.SetMinPCs(2);
globalData.SetMaxPartySize(2);


party.addTempToParty(Warrior);
combatEventData.distance = eventDistType.UpClose;
combatEventData.m_UseOutdoorMap = false; // only outdoor stub is in place right now
combatEventData.direction = eventDirType.North;
combatData.InitCombatData(combatEventData);

combatData.m_hCharMoveSound = "sound_CharMove";
globalData.sounds.hCharHit = "sound_Hit";
globalData.sounds.hCharMiss = "sound_Miss";

cWarrior = combatData.m_aCombatants[0];

cWarrior.m_pCharacter.addCharacterItem("Long Sword", 1, 0, 0, 0);
cWarrior.m_pCharacter.addCharacterItem("Shield", 1, 0, 0, 0);
cWarrior.m_pCharacter.addCharacterItem("Chain Mail", 1, 0, 0, 0);
cWarrior.m_pCharacter.addCharacterItem("Dagger", 1, 0, 0, 0);
cWarrior.m_pCharacter.myItems.SetReady(1, itemReadiedLocation.ShieldHand);
cWarrior.m_pCharacter.myItems.SetReady(2, itemReadiedLocation.BodyArmor);
cWarrior.m_pCharacter.ReadyBestWpn(1, false);
cWarrior.m_pCharacter.SetMaxMovement(2000);


consoleResults.payload = packageMapAndCombatantStatus(cWarrior);

// This will be used to hold items that are not the players but are being used - like in a treasure chest or a shop's inventory
var otherInventory = new ITEM_LIST();