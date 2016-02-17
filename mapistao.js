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
	//Reference to the map, we will use to add elements
	this.map        = "";
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
	var mapProp = {
		center:this.center,
		mapTypeId:this.type,
		zoom:this.zoom
	}

	this.map = new google.maps.Map(document.getElementById(this.map_div),mapProp);
} 

//Creates a new marker
Map.prototype.addMarker = function(marker){
	var mark 	= new google.maps.Marker({
		position:marker.position,
		title:marker.title,
		animation:marker.animation,
		draggable:marker.draggable,
		label:marker.label,
		icon:marker.icon
		});
	mark.setMap(this.map);

	if(marker.info != ""){
		var content	= new google.maps.InfoWindow({ 
			content:marker.info
			});
		google.maps.event.addListener(mark,'click',function(){ 
				content.open(this.map,mark);
				});
	}

	
}

//Add a line in map
//The param is a object of Line
Map.prototype.addStroke = function(stroke){
	var stro = new google.maps.Polyline({
		path:stroke.points,
		strokeColor:stroke.color,
		strokeOpacity:stroke.opacity,
		strokeWeight:stroke.weight
			});

	stro.setMap(this.map)
}

//Add a polygon in map
//The param is a object of Polygon
Map.prototype.addPolygon = function(polygon){
	//Dont need convert, already on google format
	//the first and the last points need to be the same
	polygon.points.push(polygon.points[0]);

	var poly = new google.maps.Polygon({
		path:polygon.points,
		strokeColor:polygon.color,
		strokeOpacity:polygon.opacity,
		strokeWeight:polygon.weight,
		fillColor:polygon.fill_color,
		fillOpacity:polygon.fill_opacity
			});

	poly.setMap(this.map)
}


//Add a cicle in map
Map.prototype.addCircle = function(circle){
	var circ = new google.maps.Circle({
				center:circle.center,
				radius:circle.radius,
				strokeColor:circle.color,
				strokeOpacity:circle.opacity,
				strokeWeight:circle.weight,
				fillColor:circle.fill_color,
				fillOpacity:circle.fill_opacity
			})

	circ.setMap(this.map);
}

//MARKER CLASS
//Marker is a single point, pop up information are optional
//Is required to set latitude and 
var Marker = function(lat,lng,info = ""){
	this.position 	= new google.maps.LatLng(lat,lng);
	this.title 		= "";
	this.info  		= info;
	this.animation 	= null;
	this.draggable  = false;
	this.label 		= "";
	this.icon 		= "";
}

//Set animation
//There is 3 types, Bounce(jumping marker), Drop and none
Marker.prototype.setAnimation = function(type){
	str = type.toLowerCase();
	switch(str){
		case "bounce":
			this.animation = google.maps.Animation.BOUNCE;
			break;
		case "drop":
			this.animation = google.maps.Animation.DROP;
			break;
		default:
			this.animation;	
	}
}

Marker.prototype.setIcon = function(url,width,height){
	this.icon = {
		url:url,
		size:new google.maps.Size(width,height),
		origin:new google.maps.Point(0, 0),
		scaledSize:new google.maps.Size(width,height)
	}
}


//STROKE CLASS
//Stroke is a set of points with some propertys
//this we can define on construct
//The default is a blue line, with 2 of weight and opacity 80%
var Stroke = function(color = '#0000FF',weight = 2, opacity=0.8){
	this.color 		= color;
	this.weight 	= weight;
	this.opacity 	= opacity;
	this.points 	= [];
}

//Just add points to the array
Stroke.prototype.addPoint = function(lat,lng){
	this.points.push(new google.maps.LatLng(lat,lng));
}




//POLYGON CLASS
//Polygon is like Strokes, 
//but the last point is linked with the first point and the space inside of polygon is filled
//The Default is a blue line, with 2 of weight and opacity 80%
//And filled with blue color and opacity 40%
//The color and fill_color are the first parameters because the user can call:
//new polygon('#123456','#7890AB')
var Polygon = function(color = '#0000FF',fill_color = '#0000FF',weight = 2, opacity=0.8,fill_opacity=0.4){
	this.color 			= color;
	this.fill_color 	= fill_color;
	this.weight 	 	= weight;
	this.opacity 		= opacity;
	this.fill_opacity 	= fill_opacity;
	this.points 		= [];
}

//Just add points to the array
Polygon.prototype.addPoint = function(lat,lng){
	this.points.push(new google.maps.LatLng(lat,lng));
}


//CIRCLE CLASS
//Only latitude, longitude and radius are required
var Circle = function(lat,lng,radius,color = '#0000FF',fill_color = '#0000FF',weight = 2, opacity=0.8,fill_opacity=0.4){
	this.center = new google.maps.LatLng(lat,lng);
	this.radius = radius;
	this.color 			= color;
	this.fill_color 	= fill_color;
	this.weight 	 	= weight;
	this.opacity 		= opacity;
	this.fill_opacity 	= fill_opacity;
}

