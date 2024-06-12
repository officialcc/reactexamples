const clientId = 'cf41ca100d4e4042b9a84e70d5f0fcb6'; // Insert client ID here.
const redirectUri = 'http://officialcc.surge.sh'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken = "";

const Spotify = {
    getAccessToken() {
    // First, check whether the user of application has an access token
    // If an accessToken exists, just return it
    if (accessToken) {
      return accessToken;
    }
    
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    // Second, check the accessToken and its expiry are valid
    // and return the accessToken 
    // otherwise, send an authorization request to access the application
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  // When a search is performed in App.js
  // function search will be invoked with the accessToken to make a request to perform
  // the search on Spotify
  search(term) {
    // First obtain the Spotify accessToken
    const accessToken = Spotify.getAccessToken();
    // Make a fetch request to Spotify's search API
    // Pass in the accessToken to the user for this application (Bearer Token)
    // The 1st .then Statement is a promise that is returned after the api request returns the code
    // The 2nd .then Statement is also a promise that returns the tracks from the previous promise
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;
