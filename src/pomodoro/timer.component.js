import React from 'react';

const Timer = (props) => {
  const minutes = Math.floor(props.timerSeconds / 60);
  const seconds = props.timerSeconds % 60;
  return (
    <div id="timer">
      <div id="timer-label">{props.label}</div>
      <div id="time-left">{pad(minutes)}<span className={(props.paused ? 'blink': '')}>:</span>{pad(seconds)}</div>
    </div>
  );

  function pad(num) {
    let numString = '' + num;
    if (numString.length === 1)
      numString = '0' + numString;
    return numString;
  }
};

export default Timer;
