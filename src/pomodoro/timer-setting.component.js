import React from 'react';

const TimerSetting = (props) => {
  const name = props.name;

  return (
    <div className="setting">
      <div>
        <button id={name + '-increment'} onClick={props.handler.increment}><i className="fa fa-arrow-up"></i></button>
        <button id={name + '-decrement'} onClick={props.handler.decrement}><i className="fa fa-arrow-down"></i></button>
      </div>
      <div id={name + '-label'}>{name} Length</div>
      <div id={name + '-length'}>{props.length}</div>
    </div>
  );
};

export default TimerSetting;
