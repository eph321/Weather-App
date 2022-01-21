var mymap = L.map('worldmap',
    {
        center: [48.866667, 2.333333],
        zoom: 4
    }
);


var customIcon = L.icon({
    
    iconUrl: '../images/leaf-green.png',
    shadowUrl: '../images/leaf-shadow.png',
   
    iconSize:   [19, 48],
    shadowSize:  [25, 32],
   
    iconAnchor:  [11, 47],
    shadowAnchor: [2, 31],
   
    popupAnchor: [-3, -38],

   });

var cityMap = document.getElementsByClassName("list-group-item");


for (let i = 0; i < cityMap.length; i++) {

    var lon = cityMap[i].dataset.lon;
    var lat = cityMap[i].dataset.lat;
    var name = cityMap[i].dataset.name;

    L.marker([lat, lon], {icon: customIcon}).addTo(mymap).bindPopup(name);
}



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);