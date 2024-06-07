import React from 'react'
import './Track.css';

function Track({track, isRemoval, onAdd, onRemove}) {

  // Function addTrack in Track.jsx will use onAdd to pass the track to be added
  function addTrack() {
    onAdd(track);
    return;
  }

  // Function removeTrack in Track.jsx will use onRemove to pass the track to be removed
  function removeTrack(event) {
    onRemove(track);
    return;
  }

  // TODO: renderAction function (27)
  function renderAction(isRemoval=true) {

    // The returned display is wrapped around a React fragment <></>
    if(isRemoval){
      // Return a minus ( - ) sign
      return(
      <button className="Track-action" onClick={removeTrack}> - </button>
      );
    } else {
      // Return a plus ( + ) sign
      return(
      <button className="Track-action" onClick={addTrack}> + </button>
      );
    }
  }
  
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>
          {/* <!-- track name will go here --> */}
          {track.name}
        </h3>
        <p>
          {/* <!-- track artist will go here--> */} {/* <!-- track album will go here --> */}
          {track.artist} | {track.album}
        </p>
      </div>      
      {renderAction(isRemoval)}
    </div>
  )
}

export default Track