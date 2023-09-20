var mainInfo = {	
    run: function(spawn) {
		
		//Controler Information
		spawn.room.visual.text(
		spawn.room.controller.progress +' / '+ spawn.room.controller.progressTotal + ' (' +(spawn.room.controller.progress/spawn.room.controller.progressTotal*100).toFixed(2)+')',
		8, 0, {align: 'center', opacity: 0.8});
		

	}
};

module.exports = mainInfo;


