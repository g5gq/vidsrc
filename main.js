// Vidsrc.js - Clean Version for Sora Movie Module Integration

const apiKey = '68e094699525b18a70bab2f86b1fa706'; // Your TMDB API key
const baseUrl = 'https://vidsrc.vip'; // Vidsrc base URL

// Search movies/shows using TMDB
function searchResults(query) {
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`;

    return fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                return data.results.map(item => ({
                    id: item.id,
                    title: item.title || item.name,
                    year: item.release_date ? item.release_date.split('-')[0] : 'N/A',
                    type: item.media_type,
                    image: item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://via.placeholder.com/150',
                }));
            } else {
                throw new Error('No results found');
            }
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
            return [];
        });
}

// Extract details from TMDB
function extractDetails(id) {
    const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

    return fetch(detailsUrl)
        .then(response => response.json())
        .then(data => ({
            title: data.title || 'N/A',
            description: data.overview || 'No description available.',
            releaseDate: data.release_date || 'N/A',
            rating: data.vote_average || 'N/A',
            genres: data.genres ? data.genres.map(g => g.name).join(', ') : 'N/A',
            image: data.poster_path
                ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                : 'https://via.placeholder.com/150',
        }))
        .catch(error => {
            console.error('Error fetching movie details:', error);
            return null;
        });
}

// Extract streaming URL from Vidsrc
function extractStreamUrl(id) {
    const streamUrl = `${baseUrl}/api/v1/watch?imdb_id=${id}`;

    return fetch(streamUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.stream_url) {
                return {
                    url: data.stream_url,
                    quality: data.quality || 'HD',
                    type: 'video/mp4',
                };
            } else {
                throw new Error('Stream URL not available');
            }
        })
        .catch(error => {
            console.error('Error fetching stream URL:', error);
            return null;
        });
}

// Main function: search + extract details + stream
function search(query) {
    searchResults(query).then(results => {
        if (results.length > 0) {
            const movie = results[0];
            console.log('Found movie:', movie);

            extractDetails(movie.id).then(details => {
                console.log('Movie Details:', details);

                extractStreamUrl(movie.id).then(stream => {
                    if (stream) {
                        console.log('Stream URL:', stream.url);
                        // You can now use the stream URL in your video player
                    } else {
                        console.log('Stream not available');
                    }
                });
            });
        } else {
            console.log('No results found.');
        }
    });
}

// Example usage
search('The Godfather');
