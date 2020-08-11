
var map = L.map('map', {
  center: [-1.170320, 23.241192],
  zoom: 4, 
})

var base = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY})

var link = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/africa.geojson";
var fdi = "/fdi"
var ci = "/corruption"
var psi = "/stability"
var ed = "/education"
var gdp = "/gdp"
var human = "/humandev"
var life = "/life"
var gdp_pc = '/gdp_pc'
var gni = '/gni'
var life_agg = '/life_agg'
var healthcare = '/healthcare'

var selected_country = ''
var indexSelector = 1;
// var indexSelector1 = 1;
// var indexSelector2 = 2;
// var indexSelector3 = 3;
// var indexSelector4 = 4;
// var indexSelector5 = 5;
// var indexSelector6 = 6;
// var indexSelector7 = 7;
// var indexSelector8 = 8;
// var indexSelector9 = 9;

var mapStyle = {
  color:'white',
  fillcolor: '#2B7A78',
  fillOpacoty: 0.5,
  weight: 1
};

d3.json(link).then(data => {

  //dropdown
  function builddropdown(){
    var not_ssa = ['Morocco', 'Egypt', 'Libya', 'Tunisia', 'Algeria', 'Somalia', 'Western Sahara', 'Djibouti', 'La Reunion']
    data.features.forEach(c => { if (not_ssa.indexOf(c.properties.name) === -1) {
      var country_name = c.properties.name
      var ddmenu = d3.select('#selDataset')
      ddmenu.append('option').text(country_name)
    }
    });
  };
  //snap shot
  function buildsnapshot(selected_country_json) {
    console.log(selected_country_json)
    var panel = d3.select('#sample-metadata');
    var ticker = '';
    panel.html("");
    selected_country_json.forEach(rec => {
      console.log(rec)
      // var FDI = `${rec[0][0]['series']}${rec[0][0]}`
      var series = rec[0]['series'];
      var year = rec[0]['2018'];
      ticker = ticker + series + ': ' + year + ' | ';
    });
    panel.append('marquee').text('$' + ticker);
  }
  // buttons

  // function fdi_click(){
  //   indexSelector = 0
  //   filter_endpointJson(selected_country)
  // };

  function gdp_click(){
    indexSelector = 1
    filter_endpointJson(selected_country)
  };

  function gdp_c_click(){
    indexSelector = 3
    filter_endpointJson(selected_country)
  };

  function gni_click(){
    indexSelector = 2
    filter_endpointJson(selected_country)
  };

  function he_click(){
    indexSelector = 4
    filter_endpointJson(selected_country)
  };
  
  function le_click(){
    indexSelector = 5
    filter_endpointJson(selected_country)
  };

  function hd_click(){
    indexSelector = 6
    filter_endpointJson(selected_country)
  };

  function edu_click(){
    indexSelector = 7
    filter_endpointJson(selected_country)
  };

  function ps_click(){
    indexSelector = 8
    filter_endpointJson(selected_country)
  };

  function corr_click(){
    indexSelector = 9
    filter_endpointJson(selected_country)
  };

  // d3.select('#fdi-btn').on('click', fdi_click)
  d3.select('#gdp-btn').on('click', gdp_click)
  d3.select('#gdp_c-btn').on('click', gdp_c_click)
  d3.select('#gni_c-btn').on('click', gni_click)
  d3.select('#he-btn').on('click', he_click)
  d3.select('#le-btn').on('click', le_click)
  d3.select('#hd-btn').on('click', hd_click)
  d3.select('#edu-btn').on('click', edu_click)
  d3.select('#ps-btn').on('click', ps_click)
  d3.select('#corr-btn').on('click', corr_click)

  //graphs
  function build_one(selected_country_json){
    d3.select('#one').transition().style
      var x_fdi = Object.keys(selected_country_json[0][0]).slice(0,19);
      var y_fdi = Object.values(selected_country_json[0][0]).slice(0,19);

      var x_play = Object.keys(selected_country_json[indexSelector][0]).slice(0,19);
      var y_play = Object.values(selected_country_json[indexSelector][0]).slice(0,19);

      var fdi_trace = {
        x: x_fdi,
        y: y_fdi,
        name: `${selected_country_json[0][0]['series']}`,
        type: 'bar',
        marker: {color: '#DAA520',
                  },
        connectgaps: true
      };

      var play_trace = {
        x: x_play,
        y: y_play,
        name: `${selected_country_json[indexSelector][0]['series']}`,
        yaxis: 'y2',
        type: 'line',
        line: {color: '#17252A',
        dash: 'dot'
        },
        connectgaps: true
      };

      var data = [fdi_trace, play_trace]
      var layout = {
        title: `${selected_country_json[0][0]['country_name']} ${selected_country_json[0][0]['series']} vs. ${selected_country_json[indexSelector][0]['series']}`,
        yaxis: {title: selected_country_json[0][0]['series'],
                rangemode: 'tozero',
                autorange: true 
        },
        yaxis2: {
          title: selected_country_json[indexSelector][0]['series'],
          overlaying: 'y',
          side: 'right'
        },
        showlegend: true,
	        legend: {"orientation": "h"},
        connectgaps: true
      };
      var config1 = {responsive : true}
      Plotly.newPlot('one', data, layout, config1);
  };


  function build_two(selected_country_json) {
    var x_fdi = Object.keys(selected_country_json[0][0]).slice(0,19);
    var y_fdi = Object.values(selected_country_json[0][0]).slice(0,19);

    var x_humandev = Object.keys(selected_country_json[6][0]).slice(0,19);
    var y_humandev = Object.values(selected_country_json[6][0]).slice(0,19);

    var x_edu = Object.keys(selected_country_json[7][0]).slice(0,19);
    var y_edu = Object.values(selected_country_json[7][0]).slice(0,19)

      var fdi_trace = {
        x: x_fdi,
        y: y_fdi,
        name: `${selected_country_json[0][0]['country_name']} FDI`,
        type: 'bar',
        marker: {color: 'indianred',
        },
        connectgaps: true
      }
      var humandev_trace = {
        x: x_humandev,
        y: y_humandev,
        name: `${selected_country_json[0][0]['country_name']} Human Development Index`,
        yaxis: 'y2',
        type: 'line',
        line: {color: '#17252A',
        dash: 'dot',
        connectgaps: true
        },
        connectgaps: true
      }
      var edu_trace = {
        x: x_edu,
        y: y_edu,
        name: `${selected_country_json[0][0]['country_name']} Education Index`,
        yaxis: 'y2',
        type: 'line',
        line: {color: '#2B7A78'
       },
       connectgaps: true
      }
      var data = [fdi_trace, humandev_trace, edu_trace]
      var layout = {
        title: `${selected_country_json[0][0]['country_name']} FDI vs. Education & Development Indicators`,
        yaxis: {title: 'FDI'},
        yaxis2: {
          title: 'Human Development/Education Index',
          overlaying: 'y',
          side: 'right'
        },
        showlegend: true,
	      legend: {"orientation": "h"},
        connectgaps: true
      };
      var config2 = {responsive : true}
      Plotly.newPlot("two", data, layout, config2)
  }

  function build_three(selected_country_json){
    var x_fdi = Object.keys(selected_country_json[0][0]).slice(0,19)
    var y_fdi = Object.values(selected_country_json[0][0]).slice(0,19)
    //
    var gdp_pc_x = Object.keys(selected_country_json[3][0]).slice(0,19)
    var gdp_pc_y = Object.values(selected_country_json[3][0]).slice(0,19)
    //
    var gni_x = Object.keys(selected_country_json[2][0]).slice(0,19)
    var gni_y = Object.values(selected_country_json[2][0]).slice(0,19)

    var trace_fdi = {
      x: x_fdi,
      y: y_fdi,
      name: `${selected_country_json[0][0]['country_name']} FDI`,
      type: 'bar',
      marker: {color: '#17252A',
      },
      connectgaps: true
    }
    var trace_gdp_pc = {
      x: gdp_pc_x,
      y: gdp_pc_y,
      name: `${selected_country_json[0][0]['country_name']} GDP Per Capita`,
      yaxis: 'y2',
      type: 'line',
      line: {color: '#2B7A78',
      dash: 'dot',
      },
      connectgaps: true
    }
    var trace_gni = {
      x: gni_x,
      y: gni_y,
      name: `${selected_country_json[0][0]['country_name']} GNI Per Capita`,
      yaxis: 'y2',
      type: 'line',
      line: {color: 'indianred',
        }
    }
    var data = [trace_fdi, trace_gdp_pc, trace_gni]
    var layout = {
      title: `${selected_country_json[0][0]['country_name']} FDI vs. GNI/GDP Per Capita`,
      yaxis: {title: 'FDI'},
      yaxis2: {
      title: 'GDP/GNI per Capita',
      overlaying: 'y',
      side: 'right'
      },
      showlegend: true,
	    legend: {"orientation": "h"},
      connectgaps: true
    }
    var config3 = {responsive : true}
    Plotly.newPlot("three", data, layout, config3)
  }

  function build_four(selected_country_json){
    var x_fdi = Object.keys(selected_country_json[0][0]).slice(0,19)
    var y_fdi = Object.values(selected_country_json[0][0]).slice(0,19)
    //
    var stability_x = Object.keys(selected_country_json[8][0]).slice(0,19)
    var stability_y = Object.values(selected_country_json[8][0]).slice(0,19)
    //
    var corruption_x = Object.keys(selected_country_json[9][0]).slice(0,19)
    var corruption_y = Object.values(selected_country_json[9][0]).slice(0,19)

    var trace_fdi = {
      x: x_fdi,
      y: y_fdi,
      name: `${selected_country_json[0][0]['country_name']} FDI`,
      type: 'bar',
      marker: {color: '#2B7A78',
      },
      connectgaps: true
    }
    var trace_stability = {
      x: stability_x,
      y: stability_y,
      name: `${selected_country_json[0][0]['country_name']} Political Stability`,
      yaxis: 'y2',
      type: 'line',
      line: {color: 'goldenrod',
        },
      connectgaps: true
    }
    var trace_corruption = {
      x: corruption_x,
      y: corruption_y,
      name: `${selected_country_json[0][0]['country_name']} Corruption Index`,
      yaxis: 'y2',
      type: 'line',
      line: {color: '#17252A',
      dash: 'dot',
      connectgaps: true
      }
    }
    var data = [trace_fdi, trace_stability, trace_corruption]
    var layout = {
      title: `${selected_country_json[0][0]['country_name']} FDI vs. Political Stabilty & Corruption`,
      yaxis: {title: 'FDI'},
      yaxis2: {
      title: 'Corruption/Stability Indices',
      overlaying: 'y',
      side: 'right'
      },
      showlegend: true,
	    legend: {"orientation": "h"},
      connectgaps: true
    }
    var config4 = {responsive: true}
    Plotly.newPlot("four", data, layout, config4)
  }

  //data filter
  function filter_endpointJson(selected_country){ 
    var selected_country_json_array = []
    var indexEndPoints =[fdi, ci, psi, ed, gdp, human, life, gdp_pc, gni, healthcare]
    
    indexEndPoints.forEach(iep => {
     
      d3.json(iep).then(data => {
        if (indexEndPoints.length > 0){
          var selected_country_json = data.filter(d => selected_country == d.country_name)
          selected_country_json_array[selected_country_json[0]['id']] = selected_country_json
        }
        //PLOT Construction
        build_one(selected_country_json_array)
        build_two(selected_country_json_array)
        build_three(selected_country_json_array)
        build_four(selected_country_json_array)
        buildsnapshot(selected_country_json_array)
      }); 
    });    
  };

  //Map Functionality
  function filter_endpointJsonDD(){
    indexSelector = 1;
    selected_country = d3.select('#selDataset').node().value
    filter_endpointJson(selected_country)
  }
  // this is listening on the drop down for a change and will call function filter_endpointJsonDD once a value is selected
  d3.select("#selDataset").on("change",filter_endpointJsonDD)
  
  // Creating a geoJSON layer with the retrieved data
  var mapData = L.geoJson(data, {
    // Style each feature (in this case a country)
    //Feature is the geoJson data for each polygon representing each country. each feture has properties and a name = country name

    style: function(feature) {
      return {
        color: "white",
        fillColor: '#2B7A78',
        fillOpacity: 0.5,
        weight: 1
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling

      var not_ssa = ['Morocco', 'Egypt', 'Libya', 'Tunisia', 'Algeria', 'Somalia', 'Western Sahara', 'Djibouti'];
      country_name = feature.properties.name;

      if(!not_ssa.includes(country_name)){
        layer.on({
          // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillColor: '#3AAFA9',
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillColor: '#2B7A78',
              fillOpacity: 0.5
            });
          },
          click: function (event) {
            indexSelector = 1
            selected_country = feature.properties.name         
            filter_endpointJson(selected_country)          
          }
        });
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup(`<h3>${feature.properties.name}</h3>`);
      }
      else{
        layer.bindPopup(`<img src='https://www.essence.com/wp-content/uploads/2020/04/GettyImages-945638698-1-1472x1472.png' width='99%' height='99%'><hr><h6> Non-SSA Country<h6>`);

        layer.setStyle({
          fillColor:'#cdcdcd'
        });
      }
    }
    
}).addTo(map); 

builddropdown()
});
base.addTo(map);


  