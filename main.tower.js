var mainTower = {
    run: function(spawn) {
        var towers = Game.rooms[spawn.room.name].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
		
		
		for (var tower in towers) {
			 // spawn.room.visual.circle(
				// new RoomPosition(towers[tower].pos.x, towers[tower].pos.y, towers[tower].pos.roomName),
				// {radius: 20, fill: 'transparent', stroke: 'red'});
		
			 // spawn.room.visual.circle(
				// new RoomPosition(towers[tower].pos.x, towers[tower].pos.y, towers[tower].pos.roomName),
				// {radius: 5, fill: 'transparent', stroke: 'green'});
				 
				 //Gegner in Range?
				var hostiles = spawn.room.find(FIND_HOSTILE_CREEPS);
				if (hostiles.length > 0) {
					var closest =  towers[tower].pos.findClosestByPath(hostiles);
					towers[tower].attack(closest)
					//console.log("attack: "+closest + towers[tower].attack(closest)) 
				} else {
				 
				 					
					var hpramp = Memory["room"][spawn.room.name]["tmp"]["repair"]["rampart"]["min"]
					var hpwall = Memory["room"][spawn.room.name]["tmp"]["repair"]["wall"]["min"]
			
					//Damaged Kram in Range?
					var DamagedStructure = Game.rooms[spawn.room.name].find(FIND_STRUCTURES, { 
						filter: 
							object => (
								  (object.hits < object.hitsMax && object.structureType !== STRUCTURE_WALL && object.structureType !== STRUCTURE_RAMPART) ||
								  (object.hits < hpramp && object.structureType === STRUCTURE_RAMPART) ||
								  (object.hits < hpwall && object.structureType === STRUCTURE_WALL)
								  
								  )
						}
					)

						
					if (DamagedStructure.length > 0) {
						var closest = towers[tower].pos.findClosestByPath(DamagedStructure);
						towers[tower].repair(closest)
						
					} else {
	
						var HealCreeps = Game.rooms[spawn.room.name].find(FIND_MY_CREEPS,  {filter: object => object.hits < object.hitsMax });
						if (HealCreeps.length > 0) {
							var closest =  towers[tower].pos.findClosestByPath(HealCreeps);
							towers[tower].heal(closest)
							//console.log("heaö: "+closest + towers[tower].heal(closest))
						}	
					}
				}
		}
		
		// // es gibt gegner
		// var hostiles = Game.rooms[spawn.room.name].find(FIND_HOSTILE_CREEPS);
		// if (hostiles.length > 0) {
			// var username = hostiles[0].owner.username;
			// //Game.notify(`User ${username} spotted in room ${spawn.room.name}`);
			// towers.forEach(tower => tower.attack(hostiles[0]));
			// //console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ");
		// }
		
		
		// //Keine Gegner, vll etwas repair ?
		// var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
			// filter: (structure) => structure.hits < structure.hitsMax
		// });
		// if(closestDamagedStructure) {
			// tower.repair(closestDamagedStructure);
		// }
		
		
		// towers.forEach(tower => 
			// spawn.room.visual.rect(
			// new RoomPosition(tower.pos.x - 5, tower.pos.y - 5, tower.pos.roomName),
			// 11, 11, {fill: 'transparent', stroke: '#ff0000'}
			// )
		// )
	
		
		
		// var tower = Game.getObjectById('d302b63f023388ddfbd90b44');
		// if(tower) {
			// var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
				// filter: (structure) => structure.hits < structure.hitsMax
			// });
			// if(closestDamagedStructure) {
				// tower.repair(closestDamagedStructure);
			// }

			// var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
			// if(closestHostile) {
				// tower.attack(closestHostile);
			// }
		// };
	}
};

 
	
module.exports = mainTower;