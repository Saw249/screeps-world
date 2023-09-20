var roleDead = {

    /** @param {Creep} creep **/
	
	
    run: function(creep) {
		var tickstodead = 30
		
		if (creep.ticksToLive <= tickstodead && creep.store[RESOURCE_ENERGY] > 0) {	
			creep.say("💀" + creep.ticksToLive + "💀")
			var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (structure) => {
					return ( 
						(structure.structureType === STRUCTURE_EXTENSION) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY])) ||
						(structure.structureType === STRUCTURE_SPAWN) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY])) ||
						(structure.structureType === STRUCTURE_CONTAINER) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY])) ||
						(structure.structureType === STRUCTURE_STORAGE) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY])) ||
						(structure.structureType === STRUCTURE_TOWER) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY])) 
					)
				}
			});
			if(target) {
				if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {visualizePathStyle: {stroke: 'black'}});
				}
			}	
			
		} else if (creep.ticksToLive <= tickstodead && creep.store[RESOURCE_ENERGY] == 0) {
			creep.say("💀")
		}
	}
};

module.exports = roleDead;