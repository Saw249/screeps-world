global.checkremotecreep = function(spawn,flags,spawntarget) {
	
	for (var flag in flags) {
		
		//console.log("start: " + flags[flag]["name"])
		var target_flag = flags[flag]
		var flag_creep = Game["flags"][flags[flag]["name"]]["memory"]["flag_creep"]
				
		if (flag_creep != null) {// ist in der flag schon überhaupt claimcreep angelegt ?
			//console.log(flag_creep+" != null")
		
			if (!Game.creeps[flag_creep]) { //gibt es den creep nicht mehr ? 
				//console.log("!Game.creeps[flag_creep]" + !Game.creeps[flag_creep])
				Game["flags"][flags[flag]["name"]]["memory"]["flag_creep"] = spawntarget + Game.time
				return  { memory: { role: spawntarget, home: spawn.room.name, target: flags[flag].pos.roomName, flag: target_flag, spawn: spawn } }
				break;
			} else {
				//console.log(flag_creep+" gibt es noch")
			}
			
		} else { // else // ist in der flag schon überhaupt claimcreep angelegt ?
			//console.log("else")
			Game["flags"][flags[flag]["name"]]["memory"]["flag_creep"] = spawntarget + Game.time
			return  { memory: { role: spawntarget, home: spawn.room.name, target: flags[flag].pos.roomName, flag: target_flag, spawn: spawn } }
			break;
		}
	}	
}	


global.calccreep = function(creep,spawn,count,max,count_alive,count_max) {
	var energymax = Memory["room"][spawn.room.name]["settings"]["spawn"]["energypercent"] 
	var minimum = Memory["room"][spawn.room.name]["settings"]["spawn"]["minimum"]
	var template = Memory["room"][spawn.room.name]["template"]
	
	percent = (1-(count/max))
	percent_total = (1-(count_alive/count_max))
	
	spawn.room.visual.text('role: ' +creep+  '   count:' + count + '   max: ' + max + '   percent: ' + percent + '   percent_total: ' + percent_total,10, 0, {align: 'left', opacity: 0.8});
	
	if (percent_total >= minimum) { // wir nehmen das was da ist
		var energytotal = spawn.room.energyAvailable
		var energymax = 1
	} else {
		var energytotal = spawn.room.energyCapacityAvailable
	}
		
	var body = []
	//gehen die parts des templates duch
	for (var part = 0; part < template[creep].length; part++) {
		//magic berechnung wieviele parts 
		var calc = Math.floor(template[creep][part].percent * (energytotal*energymax) / BODYPART_COST[template[creep][part].type])
		//füge das bodypart *x ein in den body
		for (var insert = 0; insert < calc; insert++) {
			body.push(template[creep][part].type)
		}	
	}
	return body		
};

var mainSpawn = {
    run: function(spawn) {
		//starten wir den spawn vorgang
		//durchgehen des memorys und der templates
		var template = Memory["room"][spawn.room.name]["template"]
		var creep = {}
		var priority = []
		var count_alive = 0
		var count_max = 0
		
		
		
		
		
		
		
		
		
		var flags_claim = []
		var flags_harvest = []
		var flags_build = []
		var flags_carry= []
		///Wir Prüfen nun auf flags 
		for (var flag in Game.flags) {
			if (Game.flags[flag].name.includes("CLAIM")) { flags_claim.push(Game.flags[flag]) } 
			else if (Game.flags[flag].name.includes("HARVEST")) { flags_harvest.push(Game.flags[flag]) }
			else if (Game.flags[flag].name.includes("BUILD")) { flags_build.push(Game.flags[flag]) }
			else if (Game.flags[flag].name.includes("CARRY")) { flags_carry.push(Game.flags[flag]) }
		}
				
		//hier brauchen wir wohl nun ein claimer
		if (flags_claim.length >0) {
			//Memory["room"][spawn.room.name]["creeps"]["claim"]["max"] = flags_claim.length
			if(Memory["room"][spawn.room.name]["creeps"]["claim"]["priority"] <= 0) {
				Memory["room"][spawn.room.name]["creeps"]["claim"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["claim"]["priority"] * -1 
			}		
		} else {
			//Memory["room"][spawn.room.name]["creeps"]["claim"]["max"] = 0
			if(Memory["room"][spawn.room.name]["creeps"]["claim"]["priority"] >= 0) {
				Memory["room"][spawn.room.name]["creeps"]["claim"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["claim"]["priority"] - (Memory["room"][spawn.room.name]["creeps"]["claim"]["priority"]*2)
			}
		}
		
		//hier brauchen wir wohl nun ein harvestremote
		if (flags_harvest.length >0) {
			//Memory["room"][spawn.room.name]["creeps"]["harvester_remote"]["max"] = flags_harvest.length
			if(Memory["room"][spawn.room.name]["creeps"]["harvester_remote"]["priority"] <= 0) {
				Memory["room"][spawn.room.name]["creeps"]["harvester_remote"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["harvester_remote"]["priority"] * -1 
			}		
		} else {
			//Memory["room"][spawn.room.name]["creeps"]["harvester_remote"]["max"] = 0
			if(Memory["room"][spawn.room.name]["creeps"]["harvester_remote"]["priority"] >= 0) {
				Memory["room"][spawn.room.name]["creeps"]["harvester_remote"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["harvester_remote"]["priority"] - (Memory["room"][spawn.room.name]["creeps"]["harvester_remote"]["priority"]*2)
			}
		}
		
		//hier brauchen wir wohl nun ein builder_remote
		if (flags_build.length >0) {
			//Memory["room"][spawn.room.name]["creeps"]["builder_remote"]["max"] = flags_build.length
			if(Memory["room"][spawn.room.name]["creeps"]["builder_remote"]["priority"] <= 0) {
				Memory["room"][spawn.room.name]["creeps"]["builder_remote"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["builder_remote"]["priority"] * -1 
			}		
		} else {
			//Memory["room"][spawn.room.name]["creeps"]["builder_remote"]["max"] = 0
			if(Memory["room"][spawn.room.name]["creeps"]["builder_remote"]["priority"] >= 0) {
				Memory["room"][spawn.room.name]["creeps"]["builder_remote"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["builder_remote"]["priority"] - (Memory["room"][spawn.room.name]["creeps"]["builder_remote"]["priority"]*2)
			}
		}
		
		//hier brauchen wir wohl nun ein carrremote
		if (flags_carry.length >0) {
			//Memory["room"][spawn.room.name]["creeps"]["carry_remote"]["max"] = flags_carry.length
			if(Memory["room"][spawn.room.name]["creeps"]["carry_remote"]["priority"] <= 0) {
				Memory["room"][spawn.room.name]["creeps"]["carry_remote"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["carry_remote"]["priority"] * -1 
			}		
		} else {
			//Memory["room"][spawn.room.name]["creeps"]["carry_remote"]["max"] = 0
			if(Memory["room"][spawn.room.name]["creeps"]["carry_remote"]["priority"] >= 0) {
				Memory["room"][spawn.room.name]["creeps"]["carry_remote"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["carry_remote"]["priority"] - (Memory["room"][spawn.room.name]["creeps"]["carry_remote"]["priority"]*2)
			}
		}	
			
			
			
		
		













		//gibt es denn strukturen die eine reperatur benötigen ? wenn nein brauchen wir auch keine repairer
		var hprampto = Memory["room"][spawn.room.name]["tmp"]["repair"]["rampart"]["max"]
		var hpwallto = Memory["room"][spawn.room.name]["tmp"]["repair"]["wall"]["max"]
			
		var target = spawn.room.find(FIND_STRUCTURES, { 
			filter: 
				object => (
					(object.hits < (object.hitsMax*0.95) && ((object.structureType !== STRUCTURE_WALL) && (object.structureType !== STRUCTURE_RAMPART))) ||
					(object.hits < hprampto && object.structureType === STRUCTURE_RAMPART) ||
					(object.hits < hpwallto && object.structureType === STRUCTURE_WALL)
					  )
			}
		)
		//Repairer 
		if (target.length > 0) {
			//die Priorität ist noch im negativen bereich
			if(Memory["room"][spawn.room.name]["creeps"]["repair"]["priority"] <= 0) {
				Memory["room"][spawn.room.name]["creeps"]["repair"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["repair"]["priority"] * -1 
			}
		//es gibt keine Container
		} else {
			//die Priorität ist noch positiv
			if(Memory["room"][spawn.room.name]["creeps"]["repair"]["priority"] >= 0) {
				Memory["room"][spawn.room.name]["creeps"]["repair"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["repair"]["priority"] - (Memory["room"][spawn.room.name]["creeps"]["repair"]["priority"]*2)
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		//wenn es kein container & storage gibt brauchen wir auch kein storage
		var target = spawn.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return ( 
					(structure.structureType === STRUCTURE_CONTAINER) || 
					(structure.structureType === STRUCTURE_STORAGE)
				)
			}
		});
		//Container / storages
		if (target.length > 0) {
			//die Priorität ist noch im negativen bereich
			if(Memory["room"][spawn.room.name]["creeps"]["carry"]["priority"] <= 0) {
				Memory["room"][spawn.room.name]["creeps"]["carry"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["carry"]["priority"] * -1 
			}
		//es gibt keine Container
		} else {
			//die Priorität ist noch positiv
			if(Memory["room"][spawn.room.name]["creeps"]["carry"]["priority"] >= 0) {
				Memory["room"][spawn.room.name]["creeps"]["carry"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["carry"]["priority"] - (Memory["room"][spawn.room.name]["creeps"]["carry"]["priority"]*2)
			}
		}
		
		
		
		
		
		
		//wenn wir keine baustellen haben brauchen wir auch kein builder
		var target = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);
		if (target.length > 0) {
			//die Priorität ist noch im negativen bereich
			if(Memory["room"][spawn.room.name]["creeps"]["builder"]["priority"] <= 0) {
				Memory["room"][spawn.room.name]["creeps"]["builder"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["builder"]["priority"] * -1 
			}
		} else {
			//die Priorität ist noch positiv
			if(Memory["room"][spawn.room.name]["creeps"]["builder"]["priority"] >= 0) {
				Memory["room"][spawn.room.name]["creeps"]["builder"]["priority"] = Memory["room"][spawn.room.name]["creeps"]["builder"]["priority"] - (Memory["room"][spawn.room.name]["creeps"]["builder"]["priority"]*2)
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		
		// nu wissen wir wieviel wir von jeden haben und was wir haben sollten
		for (var role in template) {
			creep[role] = []
			creep[role]["max"] = Memory["room"][spawn.room.name]["creeps"][role]["max"]
			creep[role]["priority"] = Memory["room"][spawn.room.name]["creeps"][role]["priority"]
			creep[role]["count"] = (_.filter(Game.creeps,
				(creep) => creep.memory.role == role && creep.memory.home == spawn.room.name).length)
				
				
			
			
			count_alive = count_alive  + creep[role]["count"]
			count_max = count_max  + creep[role]["max"]
			var magic_priority_calc = (
				(1-(creep[role]["count"]/creep[role]["max"])) * creep[role]["priority"]

			)
			
			if (creep[role]["priority"] > 0) {  //wir spawnen nichts was eine Priorität von 0 hat. z.b. Claimer -> erst wenn wir ihn brauchen wird die Prio hoch gesetzt
			
				if (creep[role]["count"] <= creep[role]["max"] && creep[role]["max"] >= 1 && magic_priority_calc != 0) {
					priority.push({  "priority": magic_priority_calc, "role": role })
				}
			}

			
		}
		
		
		

		
		
		
		
		if (spawn.spawning == null) { //wir haben nun 1 array mit den infos der creeps und eins für priorität (basierend auf % fehlend )
			if (priority.length >= 1) { 
				//sortiermagie
				priority = (_.sortBy(priority, 'priority')).reverse();
				
				//console.log(priority.length)
				for (var z = 0; z < priority.length; z++) {
						
					var spawntarget = priority[z]["role"]
					//wir können hier direkt das spawntarget auswählen und ggf. das nächste nehmen (z.b. mehr remotes als targets)
					
					if (spawntarget == "claim") { 
						var memory = checkremotecreep(spawn,flags_claim,spawntarget)
			
					} else if (spawntarget == "builder_remote") {
						var memory = checkremotecreep(spawn,flags_builder,spawntarget)

					} else if (spawntarget == "carry_remote") {
						var memory = checkremotecreep(spawn,flags_carry,spawntarget)
						
					}  else if (spawntarget == "harvester_remote") { 
						var memory = checkremotecreep(spawn,flags_harvest,spawntarget)
						
					} else {
						var memory = {	memory: {role: spawntarget, home: spawn.room.name, spawn: spawn} 	} 
					}

					//wir gehen die Prioritäsliste durch, bis wir ein gültiges memory haben und den nehmen wir dann!
					if (memory) { break }
					
				}
							
				if (spawntarget != undefined && memory != undefined) { //wir spawnen nun
					// //spawnbefehl
					spawn.spawnCreep(
						calccreep(
							 spawntarget,                    //rolle
							 spawn,							 //spawn
							 creep[spawntarget]["count"],	 //count
							 creep[spawntarget]["max"],		 //max
							 count_alive,					//anzahl der lebenden creeps
							 count_max,					 //anzahl der "geplanten" creeps
						),
						spawntarget + Game.time, 			//creep name
						memory								//creep memory
					);
				} else {
					console.log(spawntarget + " hat es nicht geschafft.")
				}
			}
		}
		
		
		
		
		
		//Meldung was wir spawnen
		if (spawn.spawning) {
			var spawningCreep = Game.creeps[spawn.spawning.name];
			spawn.room.visual.text('🛠️' + spawningCreep.memory.role, spawn.pos.x + 1, spawn.pos.y, {align: 'left', opacity: 0.8});
		} else { //wir heilen alles was unter 1000 ticks ist
			
			// var renewCreep = spawn.pos.findInRange(FIND_MY_CREEPS, 3,  {filter: object => object.ticksToLive < 1000 });
			// renewCreep.sort(function(a,b) {return a.ticksToLive > b.ticksToLive });
			
			// console.log(JSON.stringify(renewCreep))
			
			// if (renewCreep.length > 0) {
				
				// spawn.renewCreep(renewCreep[0])
				// spawn.room.visual.text('❤️‍🩹' + renewCreep[0].memory.role, spawn.pos.x + 1, spawn.pos.y, {align: 'left', opacity: 0.8});
				
			// }
			
		}
		
		
		
		
		
		//room übersicht
		
		var line = 1
		spawn.room.visual.text("Creeps: ", 1 ,2,  {align: 'left', opacity: 0.8});
		for (var role in Memory["room"][spawn.room.name]["template"]) {
			spawn.room.visual.text(
				Memory["room"][spawn.room.name]["creeps"][role]["icon"] + '     ' + creep[role]["count"] + '/' + creep[role]["max"] + '    ' + Memory["room"][spawn.room.name]["creeps"][role]["priority"],
			1, 2+line,  {align: 'left', opacity: 0.9});
			line++
		}
	}
};

module.exports = mainSpawn;

