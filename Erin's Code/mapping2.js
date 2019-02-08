//Data source
var link = "out.geojson";

var poverty_layer = new L.LayerGroup();

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: "white",
      dashArray: "",
      fillOpacity: 0.8
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

   
  }

  var poverty;

  function resetHighlight(e) {
    poverty.resetStyle(e.target);
    
  }

  // Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  poverty = L.choropleth(data, {
    valueProperty: "poverty_rate",
    legend_name : "Poverty Distribution",
    scale: ['white', 'red'],
    steps: 6,
    mode: "q",
    style: {
      // Border color
      color: "black",
      weight: 0.5,
      fillOpacity: 0.8
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.Name + "<br>Poverty Rate:</br>"
        +feature.properties.poverty_rate+ "%"),
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            // click: zoomToFeature
          });
        

    }
  }).addTo(poverty_layer);

createMap(poverty_layer);
});

var unemployment_layer = new L.LayerGroup();

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: "white",
      dashArray: "",
      fillOpacity: 0.8
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

  }

  var unemployment;

  function resetHighlight(e) {
    unemployment.resetStyle(e.target);
    
  }

  // function zoomToFeature(e) {
  //   map.fitBounds(e.target.getBounds());
  // }

d3.json(link, function(data) {
    // Creating a geoJSON layer with the retrieved data
    unemployment = L.choropleth(data, {
      valueProperty: "unemployment_rate",
      scale: ['white', 'blue'],
      steps: 8,
      mode: "q",
      style: {
        // Border color
        color: "black",
        weight: 0.5,
        fillOpacity: 0.8
      },
      onEachFeature: function (feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            // click: zoomToFeature
          });
          if (feature.properties) {
            layer.bindPopup(feature.properties.Name + "<br>Unemployment Rate:</br>"
          +feature.properties.unemployment_rate + "%");
          }
  
      }
    }).addTo(unemployment_layer);
   });

  function createMap() {
      var basemap =L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: "pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ"
      });

      var baseLayers = {
          "Continental United States" : basemap
      };


      var overlays = {
          "Poverty Distribution" : poverty_layer,
          "Unemployment Distribution" : unemployment_layer
      };

      var mymap = L.map("map", {
          center: [38.925228, -97.211838],
          zoom: 5,
          layers: [basemap, poverty_layer]

      });
      
      L.control.layers(baseLayers, overlays).addTo(mymap);
//Adding legend
      var povertyLegend = L.control({position:"bottomright"});
      var unemploymentLegend = L.control({position: "bottomright"});

      povertyLegend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "info legend")
        var colors = poverty.options.colors
        labels = []
        div.innerHTML = '<div><h3 style="font-weight:bolder;font-size:larger;">Poverty Distribution</h3><br></div><div class="labels"><div class="min">Low</div> \
    <div class="max">High</div></div>'
    
    for (i = 1; i < colors.length; i++) {
      labels.push('<li style="background-color: ' + colors[i] + '"></li>')
    }

    div.innerHTML += '<ul style="list-style-type:none;display:flex">' + labels.join('') + '</ul>'
    return div
    };

    unemploymentLegend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "info legend");
    var colors = unemployment.options.colors
    labels = []
        div.innerHTML = '<div><h3 style="font-weight:bolder;font-size:larger;">Unemployment Distribution</h3><br></div><div class="labels"><div class="min">Low</div> \
    <div class="max">High</div></div>'
    
    for (i = 1; i < colors.length; i++) {
      labels.push('<li style="background-color: ' + colors[i] + '"></li>')
    }

    div.innerHTML += '<ul style="list-style-type:none;display:flex">' + labels.join('') + '</ul>'
    return div
    };

    povertyLegend.addTo(mymap);

    mymap.on("overlayadd", function (eventLayer) {
      if(eventLayer.name === "Poverty Distribution") {
        this.removeControl(unemploymentLegend);
        povertyLegend.addTo(this);
      } else {
        this.removeControl(povertyLegend);
        unemploymentLegend.addTo(this);
      }
    });
  }