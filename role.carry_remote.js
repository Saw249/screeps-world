var roleCarryRemote = {

    /** @param {Creep} creep **/
	run: function(creep) {
		if(creep.memory.carry && creep.store[RESOURCE_ENERGY] == 0) {
				creep.memory.carry = false;
				creep.say('🔄');
			}
			
		if(!creep.memory.carry && creep.store.getFreeCapacity() == 0) {
			creep.memory.carry = true;
			creep.say('📦');
		} 

		var target = creep.memory.target
		var targetflag = creep.memory.flag	
		var home = creep.memory.home
		var spawn = creep.memory.spawn
		
		if(creep.memory.carry && creep.pos.roomName == target) { //alles gut 
			var target = carry_find_target(creep)
            if(target) {
				creep.say('📦');
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: 'green'}});
                }
            }  else { creep.say('📦💤'); }
			
		} else if (!creep.memory.carry && creep.pos.roomName == home) { // energie auffülen
			var source = carry_find_source(creep)
			if(source) {
				creep.say('🔄');
				if (!source.structureType || source.destroyTime < 0) {
					if(creep.pickup(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(source, {visualizePathStyle: {stroke: 'green'}});
					} 
				} else {
					if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(source, {visualizePathStyle: {stroke: 'green'}});
					} 
				}			
			}  else { creep.say('🔄💤'); }
			
		} else if (!creep.memory.carry && creep.pos.roomName == target) {//wir müssen heim wir brauchen energie
			var path = creep.room.findPath(creep.pos, spawn.pos);
			creep.moveByPath(path)	
			
		} else if (creep.memory.carry && creep.pos.roomName == home) {	// wir haben energie geholt und müssen dringend wieder los 		
			var path = creep.room.findPath(creep.pos, targetflag.pos);
			creep.moveByPath(path)	
			
		} else if ((creep.pos.roomName != home && creep.pos.roomName != home) && !creep.memory.carry) { // wir sind irgendwo auf dem weg heim
			var path = creep.room.findPath(creep.pos, spawn.pos);
			creep.moveByPath(path)	
			
		} else if ((creep.pos.roomName != home && creep.pos.roomName != home) && creep.memory.carry) { // wir sind irgendwo auf dem weg zum harvest
			var path = creep.room.findPath(creep.pos, targetflag.pos);
			creep.moveByPath(path)	
		
		} else {
			console.log("Carry Remote lost!")
		}
		 
	}
};

module.exports = roleCarryRemote;