/*
 	Mapistao
	Mapistao is a library to make easy program with google maps, trying to use OO to make more readable for non-programmers 

	author: Gabriel Fumio Ozaki
	Original idea: Gabriel Fumio Ozaki and Fabio Aparecido Parigi
 */


//MAP CLASS
//Always associable with a div(Where the map will be visible)
//The construct will recive the div as param
var Map = function(div){
	//The defaults values(see more in the method of every param)
	this.type 		= google.maps.MapTypeId.ROADMAP;
	this.zoom 		= 15;
	this.center 	= new google.maps.LatLng(-22.12046,-51.40713);
	this.map_div 	= div;
}

//Methods
//setType, will used to set the type of map:
//Accept params:
// street = Simplest map, just to show the streets
// satellite = Satellite images
// combined = Street + satellite
// terrain = terrain map
Map.prototype.setType = function(map_type){
	str = map_type.toLowerCase();
	switch(str){
		case "street":
			this.type = google.maps.MapTypeId.ROADMAP;
			break;
		case "satellite":
			this.type = google.maps.MapTypeId.SATELLITE;
			break;
		case "combined":
			this.type = google.maps.MapTypeId.HYBRID;
			break;
		case "terrain":
			this.type = google.maps.MapTypeId.TERRAIN;
			break;
		default:
			this.type = google.maps.MapTypeId.ROADMAP;
	}
}

//Set zoom, needs to be a number between 0 and 21
Map.prototype.setZoom = function(zoom){
	this.zoom = zoom;
}

//Set the center of map
Map.prototype.setCenter = function(lat,lng){
	this.center = new google.maps.LatLng(lat,lng);
}

//Initialize the map
Map.prototype.init = function(){
	console.log(this.center);
	console.log(this.type);
	console.log(this.zoom);

	var mapProp = {
		center:this.center,
		mapTypeId:this.type,
		zoom:this.zoom
	}
 	
	console.log(mapProp);

	console.log(document.getElementById(this.map_div));
	var map=new google.maps.Map(document.getElementById(this.map_div),mapProp);
} 
