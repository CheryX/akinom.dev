function formatSpotifyTitle(artist, song) {
    const MAX_LENGTH = 20;

    song = song.replace(/\s*\(feat\..*?\)/i, '');

    let fullTitle = `${artist} • ${song}`.trim();
    
    if (fullTitle.length > MAX_LENGTH) {
        const allowedArtist = MAX_LENGTH - song.length - 3;
        if (allowedArtist > 3) {
            return `${artist.slice(0, allowedArtist)}... • ${song}`;
        }
        if (song.length > MAX_LENGTH) {
            return song.slice(0, MAX_LENGTH - 1) + "…";
        }
        return song;
    }

    return fullTitle;
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();

    const hourDeg = (360 / 12) * hours + (30 * (minutes / 60));
    const minuteDeg = (360 / 60) * minutes;

    document.getElementById("hour-hand").setAttribute("transform", `rotate(${hourDeg} 12 12)`);
    document.getElementById("minute-hand").setAttribute("transform", `rotate(${minuteDeg - 90} 12 12)`);
}

function classifyWeather(weatherData) {
    const rain = parseFloat(weatherData.suma_opadu);
    const humidity = parseFloat(weatherData.wilgotnosc_wzgledna);

    if (rain > 5) return "rain";
    if (humidity >= 80) return "cloudy";
    return "sunny";
}

async function init_menu_info() {
    const weather = document.getElementById('weather_value');
    const weatherData = await fetch("https://danepubliczne.imgw.pl/api/data/synop/station/warszawa")
        .then((res) => res.json());

    weather.innerText = weatherData.temperatura + "°C";
    
    const weatherIcon = document.getElementById('weather_icon');
    weatherIcon.src = "icons/weather_" + classifyWeather(weatherData) + ".svg";
    weatherIcon.alt = "Weather icon";

    const time = document.getElementById('time_value');
    time.innerText = new Date().toTimeString().slice(0, 8);
    setInterval(() => time.innerText = new Date().toTimeString().slice(0, 8), 1000);

    const spotify = document.getElementById('spotify_value');
    const spotifyCover = document.getElementById('spotify_cover');
    const spotifyLink = document.getElementById('spotify_link');
    const statusVal = document.getElementById('status');
    const splash = document.getElementById('splash');

    await fetch("https://api.lanyard.rest/v1/users/344491989691269151")
        .then((res) => res.json())
        .then((res) => {
            const spotifyData = res.data.spotify;

            if (spotifyData) {
                spotifyCover.src = spotifyData.album_art_url;
                spotifyCover.alt = "Cover of " + spotifyData.artist + " • " + spotifyData.song
                spotify.innerText = formatSpotifyTitle(spotifyData.artist, spotifyData.song);
                spotifyLink.href = "https://open.spotify.com/track/" + spotifyData.track_id;
                spotifyLink.title = "Listening to " + spotifyData.artist + " - " + spotifyData.song;
            } else {
                spotify.innerText = "• ----"
                spotifyLink.classList.remove("hover:underline");
            }

            const status = res.data.discord_status;
            const custom = res.data.activities.find(a => a.type === 4);

            if (statusVal) {
                if (status === 'dnd') {
                    statusVal.innerHTML = '<span class="status-dot"></span> Busy';
                }
            }

            if (splash) {
                if (custom && custom.state) {
                    splash.innerText = custom.state;
                } else {
                    shuffleSubtitle();
                }
            }
        });

    updateClock();
    setInterval(updateClock, 60 * 1000); // Update every minute
}

init_menu_info()