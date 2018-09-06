import React from 'react';

const TimerController = (props) => {
   return (
     <div id="controller">
       <button id="start_stop" onClick={props.onPlay}><i className="fa fa-play"></i><i className="fa fa-pause"></i></button>
       <button id="reset" onClick={props.onReset}><i className="fa fa-sync"></i></button>
     </div>
   );
};

export default TimerController;
