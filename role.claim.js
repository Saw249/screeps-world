var roleClaim = {
    /** @param {Creep} creep **/
    run: function(creep) {
		var target = creep.memory.target
		var targetflag = creep.memory.flag				
		if (creep.pos.roomName == target) {
			 //da isn controller der nicht mir gehört ?
			 if(creep.room.controller && !creep.room.controller.my) {
				 // //rann an den speck
				if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: 'red'}});
				}
			 } else {
				 creep.say("done!")
				 if (Game["flags"][targetflag.name]) {
					 Game["flags"][targetflag.name].remove()
					 console.log("Claim Done")		
				 }					 
			 }
		} else {
			var path = creep.room.findPath(creep.pos, targetflag.pos);
			creep.moveByPath(path,{visualizePathStyle: {stroke: 'red'}})				 
		}	
	}
}


module.exports = roleClaim;