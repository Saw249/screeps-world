global.builder_find_target = function(creep) {
	//erst soawn
	if (!target) {
		var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
				filter: (structure) => {
					return ( 
						(structure.structureType === STRUCTURE_SPAWN)
					)
				}
			});
	}
	
	//dann container
	if (!target) {
		var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
			filter: (structure) => {
				return ( 
					(structure.structureType === STRUCTURE_CONTAINER)
				)
			}
		});
	}
	
	//dann storagen
	if (!target) {
		var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
			filter: (structure) => {
				return ( 
					(structure.structureType === STRUCTURE_STORAGE)
				)
			}
		});
	}
	
	//dann extension
	if (!target) {
		var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
			filter: (structure) => {
				return ( 
					(structure.structureType === STRUCTURE_EXTENSION)
				)
			}
		});
	}
	
	//dann tower
	if (!target) {
		var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
			filter: (structure) => {
				return ( 
					(structure.structureType === STRUCTURE_TOWER)
				)
			}
		});
	}
	
	//dann links
	if (!target) {
		var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
			filter: (structure) => {
				return ( 
					(structure.structureType === STRUCTURE_LINK)
				)
			}
		});
	}
	
	// dann rest
	if (!target) {
		var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
			filter: (structure) => {
				return ( 
					(structure.structureType === STRUCTURE_ROAD) ||
					(structure.structureType === STRUCTURE_RAMPART) ||
					(structure.structureType === STRUCTURE_WALL) 
				)
			}
		});
	}
	
	return target
}
	
global.builder_find_source = function(creep) {
	var container =  creep.room.find(FIND_STRUCTURES, {
		filter: (structure) => {
			return ( 
				(structure.structureType === STRUCTURE_CONTAINER) || 
				(structure.structureType === STRUCTURE_STORAGE)
			)
		}
	});
	
	// es gibt container also nutzen wir diese
	if (container.length > 0) {
		var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (structure) => {
					return ( 
						(structure.structureType === STRUCTURE_CONTAINER) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 500) ||
						(structure.structureType === STRUCTURE_STORAGE) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 500) 
					)
				}
			});
			
	//dann bedienen wir uns doch am spawn ab 220 energie
	} else {
		var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (structure) => {
					return ( 
						(structure.structureType === STRUCTURE_SPAWN) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 220)
					)
				}
			});
	}
	return source
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//carry


global.carry_find_target = function(creep) {
	//spawn
	if (!target) {
		var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: (structure) => {
			return ( 
				(structure.structureType === STRUCTURE_SPAWN) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY]))
				)
			}
		});
	}
	
	
	//extension
	if (!target) {
		var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: (structure) => {
			return ( 
				(structure.structureType === STRUCTURE_EXTENSION) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY]))
				)
			}
		});
	}
	
	
	//tower
	if (!target) {
		var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: (structure) => {
			return ( 
				(structure.structureType === STRUCTURE_TOWER) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY]))
				)
			}
		});
	}
	
	//Wir bringen es in das Storage sofern wir es nicht vom storage haben
	if (!target && creep.memory.source.structureType != "storage") {
		var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: (structure) => {
			return ( 
				(structure.structureType === STRUCTURE_STORAGE) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY]))
				)
			}
		});
	} 

	return target
	
}


global.carry_find_source = function(creep) {
	//erstmal dropped kram
	//überarbeiten -> benötigt pickup und kein withdraw
	//if (!source) {
	//	var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
    //     filter: (r) => r.resourceType == RESOURCE_ENERGY
    //});
	//}
	//console.log(JSON.stringify(source))
	
	//erstmal grabsteine
	if (!source) {
		var source = creep.pos.findClosestByPath(FIND_TOMBSTONES, { 
			filter: (structure) => {
				return (
					(structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 0)
				)
			}	 
		})
	}
	
	//dann ruinen
	if (!source) {
		var source = creep.pos.findClosestByPath(FIND_RUINS, { 
			filter: (structure) => {
				return (
					(structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 0)
				)
			}	 
		})
	}
	
	//container
	if (!source) {
		var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (structure) => {
				return ( 
					(structure.structureType === STRUCTURE_CONTAINER) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 0) 
				)
			}
		});
	}
	
	//storages
	if (!source) {
		var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (structure) => {
				return ( 
					(structure.structureType === STRUCTURE_STORAGE) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 0) 
				)
			}
		});
	}
	
	return source
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//harvester



global.harvester_find_target = function(creep) {
	if (!target) {
		var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (structure) => {
				return ( 
					(structure.structureType === STRUCTURE_CONTAINER && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY]))) ||
					(structure.structureType === STRUCTURE_STORAGE && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY]))) ||
					(structure.structureType === STRUCTURE_SPAWN && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY])))
				)
			}
		});
	}
	
	return target
	
}

global.harvester_find_source = function(creep) {
   if (!source) {
	   var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {});
   }
	return source
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//upgrader



global.upgrader_find_source = function(creep) {
	var container =  creep.room.find(FIND_STRUCTURES, {
		filter: (structure) => {
			return ( 
				(structure.structureType === STRUCTURE_CONTAINER) || 
				(structure.structureType === STRUCTURE_STORAGE)
			)
		}
	});
	
	// es gibt container also nutzen wir diese
	if (container.length > 0) {
		var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (structure) => {
					return ( 
						(structure.structureType === STRUCTURE_CONTAINER) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 500) ||
						(structure.structureType === STRUCTURE_STORAGE) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 500) 
					)
				}
			});
			
	//dann bedienen wir uns doch am spawn ab 220 energie
	} else {
		var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (structure) => {
					return ( 
						(structure.structureType === STRUCTURE_SPAWN) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 250)
					)
				}
			});
	}
	return source
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//repair



global.repair_find_target = function(creep) {
	var hprampto = Memory["room"][creep.room.name]["tmp"]["repair"]["rampart"]["max"]
	var hpwallto = Memory["room"][creep.room.name]["tmp"]["repair"]["wall"]["max"]
	//erst alles außer wände und ramparts
	if (!target) {
		var target = creep.room.find(FIND_STRUCTURES, { 
			filter: 
				object => (
					  (object.hits < object.hitsMax && object.structureType !== STRUCTURE_WALL && object.structureType !== STRUCTURE_RAMPART)
				  )
			}
		)
	}
	
	//dann wände und ramparts
	if (!target) {
		var target = creep.room.find(FIND_STRUCTURES, { 
			filter: 
				object => (
					  (object.hits < hprampto && object.structureType === STRUCTURE_RAMPART)
					  (object.hits < hpwallto && object.structureType === STRUCTURE_WALL)
				  )
			}
		)
	}
	
	return target 
	
}

global.repair_find_source = function(creep) {
	if (!source) {
		var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (structure) => {
						return ( 
							(structure.structureType === STRUCTURE_CONTAINER) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 500) ||
							(structure.structureType === STRUCTURE_STORAGE) && (structure.store.getUsedCapacity([RESOURCE_ENERGY]) > 500) 
						)
					}
				});
	}
	return source
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
















