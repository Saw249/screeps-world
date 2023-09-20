
var mainSettings = {
    run: function(spawn) {
		//Initial
		if (Memory["room"] === undefined) {
			Memory["room"] = {}
		}
		
		//Initial
		
		
		//Initial Room Settings
		if (Memory["room"][spawn.room.name] === undefined || Memory["room"][spawn.room.name]["reset"] == true) { 
			Memory["room"][spawn.room.name] = {} 
			Memory["room"][spawn.room.name]["creeps"] = {}
			
			Memory["room"][spawn.room.name]["settings"] = {}
			Memory["room"][spawn.room.name]["settings"]["spawn"] = {}
			Memory["room"][spawn.room.name]["settings"]["repair"] = {}
			
			Memory["room"][spawn.room.name]["tmp"] = {}
			Memory["room"][spawn.room.name]["tmp"]["repair"] = {}
			Memory["room"][spawn.room.name]["tmp"]["repair"]["wall"] = {}
			Memory["room"][spawn.room.name]["tmp"]["repair"]["rampart"] = {}
		}
		
		if (!Memory["room"][spawn.room.name]["creeps"]["harvester"]) { 			Memory["room"][spawn.room.name]["creeps"]["harvester"]			= 			{ "max": 2, "priority": 1, 		"icon": "⛏️" 	} 		}
		if (!Memory["room"][spawn.room.name]["creeps"]["harvester_remote"]) {	Memory["room"][spawn.room.name]["creeps"]["harvester_remote"]	=			{ "max": 0, "priority": -0.1, 	"icon": "⛏️🚀" 	} 		}
		if (!Memory["room"][spawn.room.name]["creeps"]["builder"]) {			Memory["room"][spawn.room.name]["creeps"]["builder"]			=			{ "max": 1, "priority": 0.8, 	"icon": "🚧" 	} 		}
		if (!Memory["room"][spawn.room.name]["creeps"]["builder_remote"]) {		Memory["room"][spawn.room.name]["creeps"]["builder_remote"]		=			{ "max": 0, "priority": -0.1, 	"icon": "🚧🚀"	} 		}	
		if (!Memory["room"][spawn.room.name]["creeps"]["upgrader"]) {			Memory["room"][spawn.room.name]["creeps"]["upgrader"]			=			{ "max": 1, "priority": 0.5, 	"icon": "⚡"	} 		}
		if (!Memory["room"][spawn.room.name]["creeps"]["carry"]) {				Memory["room"][spawn.room.name]["creeps"]["carry"]				=			{ "max": 2, "priority": -0.5, 	"icon": "🚚" 	} 		}
		if (!Memory["room"][spawn.room.name]["creeps"]["carry_remote"]) {		Memory["room"][spawn.room.name]["creeps"]["carry_remote"]		=			{ "max": 0, "priority": -0.5, 	"icon": "🚀🚚" 	} 		}
		if (!Memory["room"][spawn.room.name]["creeps"]["defend"]) {				Memory["room"][spawn.room.name]["creeps"]["defend"]				=			{ "max": 0, "priority": 0.2, 	"icon": "🔰" 	} 		}
		if (!Memory["room"][spawn.room.name]["creeps"]["defend_range"]) {		Memory["room"][spawn.room.name]["creeps"]["defend_range"]		=			{ "max": 0, "priority": 0.2, 	"icon": "🔰🏹" 	} 		}
		if (!Memory["room"][spawn.room.name]["creeps"]["repair"]) {				Memory["room"][spawn.room.name]["creeps"]["repair"]				=			{ "max": 1, "priority": 0.2, 	"icon": "🔧" 	} 		}
		if (!Memory["room"][spawn.room.name]["creeps"]["claim"]) {				Memory["room"][spawn.room.name]["creeps"]["claim"]				=			{ "max": 0, "priority": -2, 	"icon": "🚀" 	} 		}
		
		if (!Memory["room"][spawn.room.name]["template"] || Memory["room"][spawn.room.name]["template"].length != 11) {
			Memory["room"][spawn.room.name]["template"] = {
				harvester: [{type: WORK, percent: 0.5},{type: CARRY, percent: 0.25},{type: MOVE, percent: 0.25}],
				builder: [{type: WORK, percent: 0.5},{type: CARRY, percent: 0.25},{type: MOVE, percent: 0.25}],
				upgrader: [{type: WORK, percent: 0.5},{type: CARRY, percent: 0.25},{type: MOVE, percent: 0.25}],
				carry: [{type: CARRY, percent: 0.5},{type: MOVE, percent: 0.5}],
				repair: [{type: WORK, percent: 0.5},{type: CARRY, percent: 0.25},{type: MOVE, percent: 0.25}],
				defend: [{type: ATTACK, percent: 0.5},{type: MOVE, percent: 0.5}],
				defend_range: [{type: RANGED_ATTACK, percent: 0.5},{type: MOVE, percent: 0.5}],
				claim: [{type: CLAIM, percent: 0.5},{type: MOVE, percent: 0.5}],
				builder_remote: [{type: WORK, percent: 0.5},{type: CARRY, percent: 0.25},{type: MOVE, percent: 0.25}],
				harvester_remote: [{type: WORK, percent: 0.5},{type: CARRY, percent: 0.25},{type: MOVE, percent: 0.25}],
				carry_remote: [{type: CARRY, percent: 0.5},{type: MOVE, percent: 0.5}],
			} 
		}
		
		if (!Memory["room"][spawn.room.name]["settings"]["sign"] 
		   || Memory["room"][spawn.room.name]["settings"]["sign"] == "reset" ) { 				Memory["room"][spawn.room.name]["settings"]["sign"] = "🪄 Master gave Dobby a sock. Dobby is free elf! 🧦"	}
		
		if (!Memory["room"][spawn.room.name]["settings"]["spawn"]["energypercent"]) { 			Memory["room"][spawn.room.name]["settings"]["spawn"]["energypercent"] 		=		1 		} // % der total energy wird zum spawnen verwendet
		if (!Memory["room"][spawn.room.name]["settings"]["spawn"]["minimum"]) { 				Memory["room"][spawn.room.name]["settings"]["spawn"]["minimum"]				= 		0.25 	} //25% können fehlen solange benutzen wir emergency
		if (!Memory["room"][spawn.room.name]["settings"]["repair"]["wall"]) {					Memory["room"][spawn.room.name]["settings"]["repair"]["wall"]				= 		0.25 	} //wir reparieren walls nur bis zu 25% des maximal möglichen
		if (!Memory["room"][spawn.room.name]["settings"]["repair"]["ramp"]) { 					Memory["room"][spawn.room.name]["settings"]["repair"]["ramp"]				=		0.25	} //wir reparieren walls nur bis zu 25% des maximal möglichen
		if (!Memory["room"][spawn.room.name]["settings"]["repair"]["percent"]) { 				Memory["room"][spawn.room.name]["settings"]["repair"]["percent"]			=		0.02	}
																															//der tower fängt erst bei 2% des oben genannten wertes an walls/ramps zu reparieren
																															// //zudem wird unter diesem wert kein repair gespawnt
																															// //dh. ab 12,5% greift der tower ein und ein repair creep wird gespawnt welche den dann bis 25% repariert 		

		//berechnung der wandhp und ramphp
		Memory["room"][spawn.room.name]["tmp"]["repair"]["wall"]["max"] 	=  RAMPART_HITS_MAX[spawn.room.controller.level] * Memory["room"][spawn.room.name]["settings"]["repair"]["wall"]
		Memory["room"][spawn.room.name]["tmp"]["repair"]["wall"]["min"] 	=  Memory["room"][spawn.room.name]["tmp"]["repair"]["wall"]["max"] * Memory["room"][spawn.room.name]["settings"]["repair"]["percent"]
		
		Memory["room"][spawn.room.name]["tmp"]["repair"]["rampart"]["max"] 	= RAMPART_HITS_MAX[spawn.room.controller.level] * Memory["room"][spawn.room.name]["settings"]["repair"]["ramp"]
		Memory["room"][spawn.room.name]["tmp"]["repair"]["rampart"]["min"] 	= Memory["room"][spawn.room.name]["tmp"]["repair"]["rampart"]["max"] * Memory["room"][spawn.room.name]["settings"]["repair"]["percent"]

	}
};


module.exports = mainSettings;