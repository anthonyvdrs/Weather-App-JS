window.addEventListener('load', () => {
    let long;
    let lat;
    let tDescription = document.querySelector('.t-description');
    let tDegree = document.querySelector('.t-degree');
    let loacationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/28026de316976eca4348c733c4acf533/${lat},${long}?units=si`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;
                    //Dom From the API
                    tDegree.textContent = temperature;
                    tDescription.textContent = summary;
                    loacationTimezone.textContent = data.timezone;
                    //Icon
                    setIcons(icon, document.querySelector(".icon"));


                });
        });

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});