var mainMemory = {
    run: function() {
		//prüfen den memory der creeps
		for (var i in Memory.creeps) {
			//existiert der creep noch?
			if (!Game.creeps[i]) {
				console.log('dead creep: ' + i);
				delete Memory.creeps[i]
			}
		}
		
		//prüfen ob der raum noch uns gehört wenn nisch kann der auch weg 
		
		
	}
};

	
module.exports = mainMemory;