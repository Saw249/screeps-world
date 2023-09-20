var roleClaim = {
    /** @param {Creep} creep **/
    run: function(creep) {
		var target = creep.memory.target
		var targetflag = creep.memory.flag	
		var home = creep.memory.home
		var spawn = creep.memory.spawn


	
		
		
		if(creep.memory.claim && creep.pos.roomName == target) { //wir haben geclaimt.
			creep.say("✔️")
			console.log("Claim abgeschlossen?")
			if (Game["flags"][targetflag.name]) {
				Game["flags"][targetflag.name].remove()		
			}	
	
		} else if (!creep.memory.claim && creep.pos.roomName == target) {	//wir haben noch nicht geclaimt sind aber angekommen !
			if(creep.room.controller && !creep.room.controller.my) {// //rann an den speck
		 
				if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: 'red'}});
				} else { // wir vermuten wir sind mal fertig.
					creep.memory.claim = true
				}
			}
		 
		} else if (((creep.pos.roomName != home && creep.pos.roomName != home) && !creep.memory.claim) || (!creep.memory.claim && creep.pos.roomName == home)) { // wir sind irgendwo auf dem weg zum claim
			var path = creep.room.findPath(creep.pos, targetflag.pos);
			creep.moveByPath(path)	
			
		} else {
			console.log("Claim Remote lost!")
		}

	}
}


module.exports = roleClaim;