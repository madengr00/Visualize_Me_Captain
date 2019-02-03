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
//calling in csv_data
d3.csv("county_census_data.csv", function(data) {
  data.forEach(function(d){
    d.geoid = +d.geoid;
    d.Poverty_Rate = +d.Poverty_Rate;
    d.Unemployment_Rate = +d.Unemployment_Rate;
  });
  console.log(data[0]);
});

var link = "county.geojson";

// Our style object
var mapStyle = {
  color: "black",
  weight: 0.5
};

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Passing in our style object
    style: mapStyle
  }).addTo(map);
});


