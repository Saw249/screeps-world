var roleHarvesterRemote = {

    /** @param {Creep} creep **/
	run: function(creep) {
		
		if(!creep.memory.harvest && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.harvest = true;
		}
			
		if(creep.memory.harvest && creep.store.getFreeCapacity() == 0) {
			creep.memory.harvest = false;
		} 

		var target = creep.memory.target
		var targetflag = creep.memory.flag	
		var home = creep.memory.home
		var spawn = creep.memory.spawn
		
		if(creep.memory.harvest && creep.pos.roomName == target) { //energie sammeln
			var source = harvester_find_source(creep)
			if(source) {
				if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: 'yellow'}});
                }
			}
	
		} else if (!creep.memory.harvest && creep.pos.roomName == home) { // energie abwerfen
			var target = harvester_find_target(creep)
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: 'yellow'}});
                }
            }
			
			
		} else if (!creep.memory.harvest && creep.pos.roomName == target) {//wir müssen heim wir brauchen energie
			var path = creep.room.findPath(creep.pos, spawn.pos);
			creep.moveByPath(path,{visualizePathStyle: {stroke: 'yellow'}})	
			
		} else if (creep.memory.harvest && creep.pos.roomName == home) {	// wir haben energie geholt und müssen dringend wieder los 		
			var path = creep.room.findPath(creep.pos, targetflag.pos);
			creep.moveByPath(path,{visualizePathStyle: {stroke: 'yellow'}})	
			
		} else {
			console.log("Harvester Remote lost!")
		}
		 
	}
};

module.exports = roleHarvesterRemote;