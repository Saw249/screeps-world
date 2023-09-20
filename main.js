//require
var mainMemory = require('main.memory');
var mainSettings = require('main.settings');
try { var mainFunctions = require('functions.main');} 		catch (error)		{ console.log('Require Main Functions: '+ error + ' stack: ' + error.stack); }
try { var mainSpawn = require('main.spawn'); } 				catch (error) 		{ console.log('Require Spawn: '+ error + ' stack: ' + error.stack); }
try { var mainTower = require('main.tower');} 				catch (error) 		{ console.log('Require Tower: '+ error + ' stack: ' + error.stack); }
try { var mainBuild = require('main.build');} 				catch (error) 		{ console.log('Require Build: '+ error + ' stack: ' + error.stack); }
try { var mainInfo = require('main.info');} 				catch (error) 		{ console.log('Require Info: '+ error + ' stack: ' + error.stack); }

//Rollen
try { 	var roleFunction = 			require('functions.role');				} catch (error)		{ console.log('Require Role Functions: '+ error + ' stack: ' + error.stack); }
try {	var roleDead = 				require('role.dead');					} catch (error) 	{ console.log('Require Role Dead error: '+ error + ' stack: ' + error.stack); }
try {	var roleHarvester = 		require('role.harvester');  			} catch (error) 	{ console.log('Require Role Harvester error: '+ error + ' stack: ' + error.stack); }
try {	var roleUpgrader = 			require('role.upgrader');				} catch (error) 	{ console.log('Require Role Upgrader error: '+ error + ' stack: ' + error.stack); }
try {	var roleBuilder = 			require('role.builder');				} catch (error) 	{ console.log('Require Role Builder error: '+ error + ' stack: ' + error.stack); }
try {	var roleCarry = 			require('role.carry');					} catch (error) 	{ console.log('Require Role Carry error: '+ error + ' stack: ' + error.stack); }
try {	var roleDefend = 			require('role.defend');					} catch (error) 	{ console.log('Require Role Defend error: '+ error + ' stack: ' + error.stack); }	
try {	var roleDefendRange = 		require('role.defend_range');			} catch (error) 	{ console.log('Require Role DefendRange error: '+ error + ' stack: ' + error.stack); }
try {	var roleRepair = 			require('role.repair');					} catch (error) 	{ console.log('Require Role Repair error: '+ error + ' stack: ' + error.stack); }
try {	var roleClaim = 			require('role.claim');					} catch (error) 	{ console.log('Require Role Claim error: '+ error + ' stack: ' + error.stack); }
try {	var roleHarvesterRemote = 	require('role.harvester_remote');		} catch (error) 	{ console.log('Require Role HarvesterRemote error: '+ error + ' stack: ' + error.stack); }
try {	var roleBuilderRemote = 	require('role.builder_remote');			} catch (error) 	{ console.log('Require Role BuilderRemote error: '+ error + ' stack: ' + error.stack); }
try {	var roleCarryRemote = 		require('role.carry_remote');			} catch (error) 	{ console.log('Require Role CarryRemote error: '+ error + ' stack: ' + error.stack); }

module.exports.loop = function () { 
	console.log("-----------------------" + Game.time + "-----------------------")
	mainMemory.run();
	
	if (Game.shard.name != "screeps" && Game.cpu.bucket >= 10000) { 	//Auf Privaten Server gibs keine Pixel
		Game.cpu.generatePixel();
	}
		
	//Room Control
	for(var spawn in Game.spawns) {
		//Settings
		try { mainSettings.run(Game.spawns[spawn]);} 	catch (error) 	{ console.log('mainSettings error: '+ error + ' stack: ' + error.stack); }
		//Spawn 
		try { mainSpawn.run(Game.spawns[spawn]);} 		catch (error) 	{ console.log('mainSpawn error: '+ error + ' stack: ' + error.stack); }
		//Building
		try { mainBuild.run(Game.spawns[spawn]);} 		catch (error) 	{ console.log('mainBuild error: '+ error + ' stack: ' + error.stack); }
		//Tower
		try { mainTower.run(Game.spawns[spawn]);} 		catch (error) 	{ console.log('mainTower error: '+ error + ' stack: ' + error.stack); }
		//Info
		try { mainInfo.run(Game.spawns[spawn]);} 		catch (error) 	{ console.log('mainInfo error: '+ error + ' stack: ' + error.stack); }
	}
		
	//Creep Command & Control
	for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		
		if (creep.ticksToLive <= 30 && creep.store[RESOURCE_ENERGY] > 0) { creep.memory.role = 'dead' }
	
		if(creep.memory.role == 'dead') 				{ try { roleDead.run(creep);} 				catch (error) 	{ console.log('Dead error: '+ error + ' stack: ' + error.stack); } }
		if(creep.memory.role == 'harvester') 			{ try { roleHarvester.run(creep);} 			catch (error) 	{ console.log('Harvester error: '+ error + ' stack: ' + error.stack); } }
		if(creep.memory.role == 'upgrader') 			{ try { roleUpgrader.run(creep);} 			catch (error) 	{ console.log('Upgrader error: '+ error + ' stack: ' + error.stack); } }
		if(creep.memory.role == 'builder') 				{ try { roleBuilder.run(creep);} 			catch (error) 	{ console.log('Builder error: '+ error + ' stack: ' + error.stack); } }
		if(creep.memory.role == 'carry') 				{ try { roleCarry.run(creep);} 				catch (error) 	{ console.log('Carry error: '+ error + ' stack: ' + error.stack); } }
		if(creep.memory.role == 'defend') 				{ try { roleDefend.run(creep);} 			catch (error) 	{ console.log('Defend error: '+ error + ' stack: ' + error.stack); } }
		if(creep.memory.role == 'defend_range')			{ try { roleDefendRange.run(creep);}		catch (error) 	{ console.log('DefendRange error: '+ error + ' stack: ' + error.stack); } }
		if(creep.memory.role == 'repair') 				{ try { roleRepair.run(creep);} 			catch (error) 	{ console.log('Repair error: '+ error + ' stack: ' + error.stack); } }
		if(creep.memory.role == 'claim') 				{ try { roleClaim.run(creep);} 				catch (error) 	{ console.log('Claim error: '+ error + ' stack: ' + error.stack); } }
		
		if(creep.memory.role == 'harvester_remote') 	{ try { roleHarvesterRemote.run(creep);} 	catch (error) 	{ console.log('HarvesterRemote error: '+ error + ' stack: ' + error.stack); } }
		if(creep.memory.role == 'builder_remote') 		{ try { roleBuilderRemote.run(creep);} 		catch (error) 	{ console.log('BuilderRemote error: '+ error + ' stack: ' + error.stack); } }
		if(creep.memory.role == 'carry_remote') 		{ try { roleCarryRemote.run(creep);} 		catch (error) 	{ console.log('CarryRemote error: '+ error + ' stack: ' + error.stack); } }
	}
	
	console.log("</br>")
}


