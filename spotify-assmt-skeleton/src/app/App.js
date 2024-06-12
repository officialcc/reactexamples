import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchbar/SearchBar.jsx';
import SearchResults from '../components/searchresults/SearchResults.jsx';
import Playlist from '../components/playlist/Playlist.jsx';
import Spotify from '../utils/Spotify.js';

function App() {

  // Create state hook that manages the characteristics of the application

  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("Create New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // At the start of this app component, provide default values for searchResults (lifecycle hook)
  useEffect(() => {
    // When the application first starts, request that the user logs in first
    // eslint-disable-next-line no-unused-vars
    const token = Spotify.getAccessToken();
    setSearchResults([      
        {
          id: 1,
          name: "Track 1",
          artist: "Track 1 Artist",
          album: "Track 1 Album"
        },
        {
          id: 2,
          name: "Track 2",
          artist: "Track 2 Artist",
          album: "Track 2 Album"
        },
        {
          id: 3,
          name: "Track 3",
          artist: "Track 3 Artist",
          album: "Track 3 Album"
        },
    ]);
  }, []);

  // Function addTrack() will be passed to component SearchResults
  function addTrack(track) {
    // Check if track passed in is found in state playlistTracks
    const existTrack = playlistTracks.find((currentTrack) => track.id === currentTrack.id);
    // Store track only if track is NOT found in state playlistTracks
    if(!existTrack) {
      setPlaylistTracks([...playlistTracks, track]); // alternative -> setPlaylistTracks.concat(track);
      
      return;
    }
  }
  
  // Function removeTrack() will be passed to component Playlist
  function removeTrack(track) {
    // Filter the playlistTracks to return only those that are not one of the tracks passed in
    const filteredTrack = playlistTracks.filter((currentTrack) => track.id !== currentTrack.id);    
    // Store the remaining / filtered tracks
    setPlaylistTracks(filteredTrack);
  }
  
  // Function updatePlaylistName to store a new playlist name
  function updatePlaylistName(name) {
    // Store the name in playlistName
    setPlaylistName(name);
  }

  // function savePlaylist is to send the searched playlist to Spotify
  // Pass the function itself to component Playlist
  function savePlaylist(event) {
    event.preventDefault();
    event.stopPropagation();
    const trackURIs = playlistTracks.map((track) => track.uri);
    console.log(trackURIs);

    // Once Spotify has captured the new playlist, we reset playlistName and playlistTracks
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      updatePlaylistName("Create New Playlist");
      setPlaylistTracks([]);
    })
  }

  // Function search calls Spotify API search request in Spotify.js
  // which return the results and later stored in state searchResults
  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
  }

  // Function savePlaylist calls Spotify.js savePlaylist function
  // passing in the state playlistTracks so that the API can save the user's selections
  
  console.log(playlistName);
    
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          {/* <!-- Add a Playlist component --> */}
          <Playlist onSave={savePlaylist} playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName}/>
        </div>
      </div>
    </div>
  );
}

export default App;
