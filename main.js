async function searchResults(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=68e094699525b18a70bab2f86b1fa706&query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    return JSON.stringify(data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        description: movie.overview,
        releaseDate: movie.release_date
    })));
}

async function extractDetails(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=68e094699525b18a70bab2f86b1fa706`;
    const res = await fetch(url);
    const movie = await res.json();

    return JSON.stringify({
        title: movie.title,
        description: movie.overview,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        releaseDate: movie.release_date
    });
}

async function extractStreamUrl(id) {
    // Dummy stream for now
    return JSON.stringify({
        streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        quality: "1080p",
        type: "HLS"
    });
}
