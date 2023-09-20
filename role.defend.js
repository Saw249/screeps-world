var roleDefend = {

    /** @param {Creep} creep **/
	
    run: function(creep,spawn) {
			//wir müssen heiiiiiiim!
			 var hostiles = Game.rooms[creep.memory.home].find(FIND_HOSTILE_CREEPS);
			 
			if (creep.pos.roomName != creep.memory.home) {
				//console.log (
				//alternativ eine Flagsammelstelle
					creep.moveTo(Game.rooms[creep.memory.home].controller)
				//)
				
				
			//wir sind heim - gibs feinde ?
			} else  if (hostiles.length > 0) {
				 
				 var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
				 var atk = creep.attack(target)
				 
				 if(atk == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {visualizePathStyle: {stroke: 'blue'}});
				 } else if (atk == ERR_NO_BODYPART) { // wir haben noch keine Heilung weil kein Tower -> also weg damit 
						creep.suicide()
				 } else {
					 creep.say('🛡️');
				 }
				
				//nichts zutun idleposition
			 } else {
				 idle(creep,"defend")
				 
			 }
				
			
		
	
	}
};

module.exports = roleDefend;