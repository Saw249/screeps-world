var roleHarvester = {

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

		
	    if(creep.memory.harvest) {
			var source = harvester_find_source(creep)
			if(source) {
				creep.say('⛏️');
				if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: 'yellow'}});
                }
			} else { creep.say('⛏💤'); }
			
        } else {
			var target = harvester_find_target(creep)
			if(target) {
				creep.say('🔄');
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: 'yellow'}});
                 }
			}else { creep.say('🔄💤'); }
        }
	}
};

module.exports = roleHarvester;