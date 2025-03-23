
       
const map1 = L.map('map1').setView([52.527193, 5.434349], 15);

const backgroundMap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
    attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 19,
    
    }
  );
  
  backgroundMap.addTo(map1);

  const hash = new L.Hash(map1);


  var map = new maplibregl.Map({
    container: 'maplibre', // container id
    style: 'https://api.maptiler.com/maps/72f90690-1049-460a-8880-8967d62c3738/style.json?key=XdvXK2DRJHPZ6oW8ndUI', // style URL
    center: [5.434349, 52.527193], // starting position [lng, lat]
    zoom: 15, // starting zoom
    hash: true,
});

map.on('load' , function(){
  console.log(map.getStyle())

  map.setPaintProperty('Water','fill-color','#000000');

})

var selectedbutton = document.querySelector("#KleurButton");

selectedbutton.addEventListener("click", KleurVerander);

function KleurVerander()
{
    map.setPaintProperty('Water','fill-color','#7fe3e1')
}


map.addControl(new maplibregl.FullscreenControl({container: document.querySelector('body')}));


var url = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?id=gem-f1fb925080efcfb275a372b8a43d6502&fl=*'
fetch(url)
.then(response => response.json())
.then(data =>{
  console.log(data.response.docs[0].geometrie_ll)
  var mijnWKT = data.response.docs[0].geometrie_ll
  var mijnGEOJSON = Terraformer.wktToGeoJSON(mijnWKT);

 
  map.on('load', function() {
    map.addSource('Lelystad',{
      'type': 'geojson',
      'data': mijnGEOJSON
    });
  
    map.addLayer({
      'id': 'geojson-polygon',
      'type': 'line',
      'source': 'Lelystad',
      'layout': {},
      'paint': {
          'line-color': '#000000',
      }
    });
  })
})

var mijnGEOJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            [
              5.441378517749655,
              52.52302646182872
            ],
            [
              5.441378517749655,
              52.49036489532182
            ],
            [
              5.502788498567725,
              52.49036489532182
            ],
            [
              5.502788498567725,
              52.52302646182872
            ],
            [
              5.441378517749655,
              52.52302646182872
            ]
          ]
        ],
        "type": "Polygon"
      }
    }
  ]
}








