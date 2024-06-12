import React from 'react'
import './Playlist.css';
import Tracklist from '../tracklist/Tracklist.jsx'

function Playlist({playlistTracks, onRemove, playlistName, onNameChange, onSave}) {

  // Function handleNameChange tracks the changes from the input
  function handleNameChange(event) {
    onNameChange(event.target.value);
  }

  return (
    <div className="Playlist">
      <input value={playlistName} onChange={handleNameChange} />
      {/* <!-- Add a TrackList component --> */}
      <Tracklist 
      searchResults={playlistTracks}
      onRemove={onRemove}
      />
      <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
  )
}

export default Playlist



// function Playlist(props) {
//   function handleNameChange({ target }) {
//     props.onNameChange(target.value);
//   }
//   return (
//     <div className={styles.Playlist}>
//       <input defaultValue={"New Playlist"} onChange={handleNameChange} />
//       {/* <!-- Add a TrackList component --> */}
//       <Tracklist
//         userSearchResults={props.playlistTracks}
//         onRemove={props.onRemove}
//         isRemoval={true}
//       />
//       <button className={styles["Playlist-save"]} onClick={props.onSave} >
//         SAVE TO SPOTIFY
//       </button>
//     </div>
//   );
// }
