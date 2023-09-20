var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
		
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄');
	    }
		
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧');
	    }
	
	
		//building
	    if(creep.memory.building) {
			var target = builder_find_target(creep)	
			if(target) {
				if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: 'yellow'}});
                }
			} else { creep.say('🚧💤'); }
	    } else {
			var source = builder_find_source(creep)
			if(source) {
				if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source, {visualizePathStyle: {stroke: 'yellow'}});
				}
			} else { creep.say('🔄💤'); }
        }
	}
};

module.exports = roleBuilder;