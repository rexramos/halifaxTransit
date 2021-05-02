This web application will fetch realtime transit data from Halifax transit <https://hrmbusapi.herokuapp.com>
and using leaflet js library that will do the following task:

- Display a map in the browser
- Fetch real-time transit data information data 
- Filter the raw data to a subset with specific criteria. (Will only display bus route 1~10 only so it wont clutter the map)
- Convert the filtered API data into GeoJSON format.
- Plot markers on the map to display the current position of vehicles.
- Add functionality that will cause the map to auto refresh after a certain interval of time (every 7seconds).

Note: If there's no scheduled bus trip, bus markers will not show up.

![jsUsingLeaflet](https://github.com/rexramos/halifaxTransit/blob/main/jsUsingLeaflet.JPG)


