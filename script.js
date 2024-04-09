document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("section");
    const input = document.querySelector("input");
    

    input.addEventListener("keydown", (e) => {
        if(e.key === "Enter") {
            const splitMovie = input.value.split(" ");
            const nameMovie = splitMovie.join("+");
            
            section.innerHTML = "";

            getData(nameMovie);

            input.value = "";
        }
    });

    const getData = async (movie = "Avatar: The") => {
        const apiKey = "63d38bf1";
        const apiLink = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;

        try {
            const response = await fetch(apiLink);

            if(!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();

            if(data.Response === "False") {
                const errInfo = document.createElement("p");
                errInfo.classList.add("movie-not-found");
                errInfo.textContent = "Movie not found!";
                section.appendChild(errInfo);
            } else {
                template(data);
            }
        } catch(err) {
            console.log(err);
        }

    }

    const template = async (data) => {
        const genres = data.Genre?.split(",").map(genre => {
            return `<p class='movie-tag'>${genre.trim()}</p>`;
        }).join("");

        let html = `
        <div class="movie d-flex">
        <div class="movie-left">
            <img src="${data.Poster}" alt="movie poster">
        </div>
        <div class="movie-right">
            <h1 class="movie-title mb-12">${data.Title}</h1>
            <div class="movie-tags d-flex mb-12">
                ${genres}
            </div>
            <div class="movie-description">
                <p>${data.Plot}</p>
            </div>
            <div class="movie-details">
                <p class="movie-director mb-8">Director: <span>${data.Director}</span></p>
                <p class="movie-director mb-8">Writers: <span>${data.Writer}</span></p>
                <p class="movie-director mb-8">Stars: <span>${data.Actors}</span></p>
                <p class="movie-director">IMDb Rating: <span>${data.imdbRating}/10</span> (${data.imdbVotes})</p>
            </div>
        </div>
    </div>`;
    section.insertAdjacentHTML("beforeend", html);
    }

    getData();

});