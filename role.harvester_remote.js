var roleHarvesterRemote = {

    /** @param {Creep} creep **/
	run: function(creep) {
		
		if(!creep.memory.harvest && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.harvest = true;
			creep.say('⛏️');
		}
			
		if(creep.memory.harvest && creep.store.getFreeCapacity() == 0) {
			creep.memory.harvest = false;
			creep.say('🔄');
		} 

		var target = creep.memory.target
		var targetflag = creep.memory.flag	
		var home = creep.memory.home
		var spawn = creep.memory.spawn
		
		if(creep.memory.harvest && creep.pos.roomName == target) { //energie sammeln
			var source = harvester_find_source(creep)
			if(source) {
				creep.say('⛏️');
				if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: 'yellow'}});
                }
			} else { creep.say('⛏💤'); }
	
		} else if (!creep.memory.harvest && creep.pos.roomName == home) { // energie abwerfen
			var target = harvester_find_target(creep)
            if(target) {
				creep.say('🔄');
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: 'yellow'}});
                }
            } else { creep.say('🔄💤'); }
			
		} else if (!creep.memory.harvest && creep.pos.roomName == target) {	//wir müssen heim wir brauchen energie
			var path = creep.room.findPath(creep.pos, spawn.pos);
			creep.moveByPath(path)	
			
		} else if (creep.memory.harvest && creep.pos.roomName == home) {	// wir haben energie geholt und müssen dringend wieder los 		
			var path = creep.room.findPath(creep.pos, targetflag.pos);
			creep.moveByPath(path)	
		
		} else if ((creep.pos.roomName != home && creep.pos.roomName != home) && !creep.memory.harvest) { // wir sind irgendwo auf dem weg heim
			var path = creep.room.findPath(creep.pos, spawn.pos);
			creep.moveByPath(path)	
			
		} else if ((creep.pos.roomName != home && creep.pos.roomName != home) && creep.memory.harvest) { // wir sind irgendwo auf dem weg zum harvest
			var path = creep.room.findPath(creep.pos, targetflag.pos);
			creep.moveByPath(path)	
			
		} else {
			console.log("Harvester Remote lost!")
			//creep.suicide()
		}
		 
	}
};

module.exports = roleHarvesterRemote;