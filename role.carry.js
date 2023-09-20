var roleCarry = {
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

		//carry dort bringen wir es hin
	    if(creep.memory.carry) {			
			var target = carry_find_target(creep)
			creep.memory.target = target
            if(target) {
				creep.say('🔄');
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: 'green'}});
                }
            }  else { creep.say('🔄💤'); }
	    } else {			
			var source = carry_find_source(creep)
			creep.memory.source = source
			if(source) {
				creep.say('📦');
				if (!source.structureType || source.destroyTime < 0) {
					if(creep.pickup(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(source, {visualizePathStyle: {stroke: 'green'}});
					} 
				} else {
					if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(source, {visualizePathStyle: {stroke: 'green'}});
					} 
				}			
			}  else { creep.say('📦💤'); }
		}		
	}
}


module.exports = roleCarry;