
$(document).ready(() => {
    const displayData = (data, limit) => {
        // Clear previous results
        $("#itunes").html("");

        // Loop based on the specified limit
        for (let i = 0; i < limit; i++) {
            const movieTitle = data.feed.entry[i]["im:name"].label;
            const directorName = data.feed.entry[i]["im:artist"].label;
            const releaseDate = new Date(data.feed.entry[i]["im:releaseDate"].label);
            const formattedReleaseDate = releaseDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            const summary = data.feed.entry[i]["summary"].label;
            const imageLink = data.feed.entry[i]["im:image"][2].label;
			

            // Display movie information
            $("#itunes").append(
                `<div class="movie">
                    <img src="${imageLink}" alt="${movieTitle}"/>
                    <h3>${movieTitle}</h3>
                    <p><strong>Director:</strong> ${directorName}</p>
                    <p><strong>Release Date:</strong> ${formattedReleaseDate}</p>
                    <p><strong>Summary:</strong> ${summary}</p>
                </div>`
            );
        }
		
    };

    const displayError = error => {
        $("#itunes").html("<span class='error'>" + error.message + "</span>");
    };

    $("#btnSearch").click(() => {
        // Reset the div element in case a second search is made
        $("#itunes").html("");

        // Get user inputs
        const countryCode = $("#country").val();
        const limit = $("#numberOfMovies").slider("value");

        // Build URL
        const url = "https://itunes.apple.com/" + countryCode + "/rss/topmovies/limit=30/json";

        // Fetch data from the URL
        fetch(url)
            .then(response => response.json())
            .then(json => displayData(json, limit)) // Pass limit to displayData
            .catch(e => displayError(e));
    });

    $("#numberOfMovies").slider({
        orientation: "horizontal",
        range: "min",
        max: 30,
        value: 10,
        slide: function (event, ui) {
            $("#moviesCount").text(ui.value);
        },
    });
});