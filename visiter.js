document.addEventListener("DOMContentLoaded", () => {
    
    function updateLiveDateTime() {
        const now = new Date();

        const optionsDate = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', optionsDate);

        const formattedTime = now.toLocaleTimeString('en-US', { hour12: true });

        document.getElementById("ticker-date").innerText = formattedDate;
        document.getElementById("ticker-time").innerText = formattedTime;
    }

    setInterval(updateLiveDateTime, 1000);
    updateLiveDateTime();

    function getUserLocation() {
        const locationElement = document.getElementById("ticker-location");

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(2);
                    const lon = position.coords.longitude.toFixed(2);
                    
                    locationElement.innerText = `Lat: ${lat}°, Lon: ${lon}° (Location Access Granted)`;
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            locationElement.innerText = "Karachi, Pakistan (Default)";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            locationElement.innerText = "Location Unavailable";
                            break;
                        case error.TIMEOUT:
                            locationElement.innerText = "Location Request Timed Out";
                            break;
                        default:
                            locationElement.innerText = "Location Error";
                    }
                }
            );
        } else {
            locationElement.innerText = "Geolocation Not Supported by Browser";
        }
    }

    getUserLocation();
});
document.addEventListener("DOMContentLoaded", () => {

    let visitorCount = localStorage.getItem("visitorCount");

    if (visitorCount === null) {
        visitorCount = 1;
    } else {
        visitorCount = Number(visitorCount) + 1;
    }

    localStorage.setItem("visitorCount", visitorCount);

    document.getElementById("visitor-count").innerText = visitorCount;

});