var roleRepair = {
    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.repair && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repair = false;
            creep.say('🔄');
	    }
	    if(!creep.memory.repair && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repair = true;
	        creep.say('🔧');
	    }
	    if(creep.memory.repair) {
			var target = repair_find_target(creep)		
			if (target) {
				if (creep.repair(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {visualizePathStyle: {stroke: 'pink'}});
				}
			}
	    } else {
			var source = repair_find_source(creep)		
			if(source) {
				if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source, {visualizePathStyle: {stroke: 'pink'}});
				}
			}
        }
	}
};

module.exports = roleRepair;