var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
		
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄');
	    }
		
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡');
	    }

	    if(creep.memory.upgrading) {
			
			
			if (!creep.room.controller.sign || creep.room.controller.sign != Memory["room"][creep.room.name]["settings"]["sign"]) {
				if(creep.signController(creep.room.controller, Memory["room"][creep.room.name]["settings"]["sign"]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
			
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            } else { creep.say('⚡'); } 
			
		 } else { 
		 
			var source = upgrader_find_source(creep)
			if(source) {
				creep.say('🔄');
				if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
				}
			} else { creep.say('🔄💤'); }
        }
	}
};

module.exports = roleUpgrader;