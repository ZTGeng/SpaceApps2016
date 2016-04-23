function main() {
    // Get the user's API key via prompt
    if (!localStorage.getItem('uc_api_key') || localStorage.getItem('uc_api_key') == "null") {
        localStorage.setItem(
            'uc_api_key', "357C908148B64CD19F08"
        );
    }

    // Get the user's API secret via prompt
    if (!localStorage.getItem('uc_api_secret') || localStorage.getItem('uc_api_secret') == "null") {
        localStorage.setItem(
            'uc_api_secret', "0E6932BAC9A84E068B9A66DA4C8F3D53"
        );
    }

    // Confirm we've got 'em by displaying them to the screen
    var apiKey = localStorage.getItem('uc_api_key'),
        apiSecret = localStorage.getItem('uc_api_secret');

    // Create a Leaflet map
    var map = L.map('map').setView([
        37.78684346730307,
        -122.40559101104735
    ], 9);

    // Create a simple UC tile layer - global map, no restrictions
    var url = `https://tile-{s}.urthecast.com/v1/rgb/{z}/{x}/{y}?api_key=${apiKey}&api_secret=${apiSecret}`;

    // Append it to the map
    var ucTiles = L.tileLayer(url).addTo(map);
    
    map.on('click', function(e) {
        console.log(e.latlng);
        console.log(e);
    });
}

$('document').ready(main);