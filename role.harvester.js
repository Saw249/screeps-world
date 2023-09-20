var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
			var source = harvester_find_source(creep)
			if(source) {
				if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: 'yellow'}});
                }
			}
			
        } else {
			var target = harvester_find_target(creep)
			if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: 'yellow'}});
                 }
			}
        }
	}
};

module.exports = roleHarvester;