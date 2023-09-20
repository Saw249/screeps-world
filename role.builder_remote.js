var roleBuilderRemote = {

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
		
		var target = creep.memory.target
		var targetflag = creep.memory.flag	
		var home = creep.memory.home
		var spawn = creep.memory.spawn
		
		if(creep.memory.building && creep.pos.roomName == target) { //alles gut - wir müssen bauen
			var target = builder_find_target(creep)	
			if(target) {
				if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: 'yellow'}});
                }
			} 
		
			if(target) {
				if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: 'yellow'}});
                }
			}
			
		} else if (!creep.memory.building && creep.pos.roomName == home) { // wir sind daheim und holen energie
			var source = builder_find_source(creep)
			if(source) {
				if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source, {visualizePathStyle: {stroke: 'yellow'}});
				}
			}
		
		
		} else if (!creep.memory.building && creep.pos.roomName == target) {//wir müssen heim wir brauchen energie
			var path = creep.room.findPath(creep.pos, spawn.pos);
			creep.moveByPath(path,{visualizePathStyle: {stroke: 'yellow'}})	
			
		} else if (creep.memory.building && creep.pos.roomName == home) {	// wir haben energie geholt und müssen dringend wieder los 		
			var path = creep.room.findPath(creep.pos, targetflag.pos);
			creep.moveByPath(path,{visualizePathStyle: {stroke: 'yellow'}})	
			
		} else {
			console.log("BuildRemote lost!")
		}
	}
};

module.exports = roleBuilderRemote;