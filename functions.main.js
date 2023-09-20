//hackyclear
global.clear = function() {
  console.log(
    "<script>angular.element(document.getElementsByClassName('fa fa-trash ng-scope')[0].parentNode).scope().Console.clear()</script>"
  );
};
global.idle = function(creep,reason) {
	
	if (reason == "defend" || reason == "repair") {
		creep.moveTo(35,10)
	}
}