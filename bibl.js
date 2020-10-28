var isRotate = false;
// Streets

// googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    // maxZoom: 20,
    // subdomains:['mt0','mt1','mt2','mt3']
// });
// Hybrid:

// googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    // maxZoom: 20,
    // subdomains:['mt0','mt1','mt2','mt3']
// });
// Satellite:

// googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    // maxZoom: 20,
    // subdomains:['mt0','mt1','mt2','mt3']
// });
// Terrain

// googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    // maxZoom: 20,
    // subdomains:['mt0','mt1','mt2','mt3']
// });


var osm_attr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ';
	
var wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
	{ maxZoom: 19, minZoom: 4, attribution: osm_attr, id: 'wm'}
);
wikimedia.setOpacity(1)

var citiesLayer = new L.LayerGroup();
var BordersLayer = new L.LayerGroup();

var myIcon = L.icon({
	iconUrl: 'Phoenician_res.svg',
	// iconSize: [75, 75],
	// iconAnchor: [37.5, 75]
	iconSize: [46, 46],
	iconAnchor: [37, 20]
});

// var marker = new L.marker([34.433333, 35.833333], {icon: myIcon}).addTo(cities);



var map = L.map('map', { center: [34.433333, 35.833333], zoom: 8, layers: [wikimedia, citiesLayer, BordersLayer]});

function onEachFeature2(feature, layer) {
	var popupContent = "What do you want to see in this popup?</br>This city was called <b>"+ feature.properties.name + "</b>, that's all I know."
	// (feature.properties.name?'<b>' + feature.properties.name + '</b></br>':'')+
	// (feature.properties.description?feature.properties.description:'');
	// if (feature.properties && feature.properties.popupContent) {
		// popupContent += feature.properties.popupContent;
	// }
	layer.bindPopup(popupContent);
}

L.geoJSON(borders, {
    style: function(feature) {
        return {color: "red"};
    }
}).addTo(BordersLayer);

L.geoJSON([cities], {
	style: function (feature) {
		// console.log(feature.properties);
		return feature.properties && feature.properties.style;
	},
	onEachFeature: onEachFeature2,
	pointToLayer: function (feature, latlng) {		
		return new L.marker(latlng, {icon: myIcon}).bindTooltip("<b style='color:red;'>"+feature.properties.name+"</b>", {permanent: true, direction: 'right'});		
	}
}).addTo(citiesLayer);



var baseLayers = {
	"Wikimedia": wikimedia,
	"Satellite Google" : L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
		maxZoom: 20,
		subdomains:['mt0','mt1','mt2','mt3'],
		attribution: "Google Maps"
	}),
	// "<span class='emf'>Wikimedia</span>":wikimedia,
};
var overlays = {
	"Cities": citiesLayer,	
	"Borders": BordersLayer
};
// http://overpass-turbo.eu/s/qCd
L.control.layers(baseLayers, overlays).addTo(map);
var layerControlElement = document.getElementsByClassName('leaflet-control-layers')[0];
function caroussel(cl){
	setTimeout(function(){ 
		layerControlElement.getElementsByTagName('input')[cl].click();
		// bool ^= true;
		if (isRotate === true){
			caroussel(cl>13 ? 0: ++cl);
		}
	},
5000);	
}

var helloPopup = L.popup().setContent('Ancient Phoenicia was named after the palm tree.</br><small>Or maybe not...</small></br>Ancient Phoenicians invented alphabeth.</br><small>Or maybe not...</small><br>But... It was cool time, they were cool guys!');

L.easyButton('fa-globe', function(btn, map){
    helloPopup.setLatLng(map.getCenter()).openOn(map);
	// if (isRotate === false) {
		// isRotate = true;
		// caroussel(0);
	// } else {
		// isRotate = false;
	// }
	
}).addTo(map);


