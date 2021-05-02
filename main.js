(function(){

    //create map in leaflet and tie it to the div called 'theMap'
    const ApiURL = "https://hrmbusapi.herokuapp.com/";
    const map = L.map('theMap').setView([44.650627, -63.597140], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
    let marker; /// initialize marker

    busTransitTracker = async()=>{
        await fetch(ApiURL)
        .then(function(response){
            return response.json();
        })
        .then(function(json){

    //DEMONSTRATE RETRIEVAL OF THE REQUIRED RAW TRANSIT DATA 
    console.log(json);
    //CONVERT RAW DATA INTO GEOJSON 
    console.log(busFromOnetoTen(json));
    console.log("-----------------------------")
    let busOneToTen = busFromOnetoTen(json);
    
    //marker options
    let busIcon = L.icon({
        iconUrl: 'bus.png',
        iconSize: [25, 26],
        iconAnchor: [12, 26],
        popupAnchor: [2, -10]
    });

    //PLOT MARKERS ON MAP TO SHOW EACH VEHICLE
    //WILL REMOVE EXISTING LAYER EVERY REFRESH
    if(marker !== undefined){
        map.removeLayer(marker);
    }
    marker = L.geoJSON(busOneToTen,{
        pointToLayer: feature => {
            marker = L.marker(feature.geometry.coordinates, {icon:busIcon, rotationAngle: feature.properties.bearing})
            .bindPopup("Route: " + feature.properties.bus +'<br/>' +"Bus Label: "+ feature.properties.busLabel);
            return marker
            }
    });
    marker.addTo(map);
   
    })}; // end fetch block code
    
    //ADD AUTO REFRESH FUNCTIONALITY TO THE PAGE
    setInterval(busTransitTracker,7000);

    /// function JSON to geoJSON format
    busFromOnetoTen = parameter => {
        return {"type":"FeatureCollection",
                "features" : parameter.entity
                .filter(i=> {
                    if(i.vehicle.trip.routeId === '9A' || i.vehicle.trip.routeId === '9B'){
                        return i.vehicle.trip.routeId
                    } else
                    return Number(i.vehicle.trip.routeId) < 11
                })
                .map(i=> {
                    obj = {
                        "type":"Feature",
                        "properties":{
                            "bus": i.vehicle.trip.routeId,
                            "busLabel": i.vehicle.vehicle.label,
                            "bearing" : i.vehicle.position.bearing === undefined ? 0 : i.vehicle.position.bearing // use tenary operator if else statement
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [i.vehicle.position.latitude, i.vehicle.position.longitude]
                        }
                    } 
                    return obj
                })
            
        }
    }

})()