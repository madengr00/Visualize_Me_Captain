// Creating map object
var map = L.map("map", {
  center: [38.925228, -97.211838],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ"
}).addTo(map);
// //calling in csv_data
// d3.csv("county_census_data.csv", function(data) {
//   data.forEach(function(d){
//     d.geoid = +d.geoid;
//     d.Poverty_Rate = +d.Poverty_Rate;
//     d.Unemployment_Rate = +d.Unemployment_Rate;
//   });
//   console.log(data[0]);
// });

var link = "out.geojson";


// Grabbing our GeoJSON data..
var poverty_rate = d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.choropleth(data, {
    valueProperty: "Poverty_Rate",
    scale: ['white', 'red'],
    steps: 5,
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 0.5,
      fillOpacity: 0.8
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.Name + "<br>Poverty Rate:</br>"
        +feature.properties.Poverty_Rate+ "%");

    }
  }).addTo(map);
});





