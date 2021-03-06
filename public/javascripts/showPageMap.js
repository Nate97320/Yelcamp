
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
     container: 'map', // container ID
     style: 'mapbox://styles/mapbox/streets-v10', // style URL
     center: campground.geometry.coordinates, // starting position [lng, lat]
     zoom: 7 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());
new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:3})
           .setHTML(
              `<p>${campground.title}</p><p>${campground.location}</p>`
            )
    )
    .addTo(map);
