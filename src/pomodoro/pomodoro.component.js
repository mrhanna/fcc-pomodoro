import React from 'react';

import Timer from './timer.component';
import TimerController from './timer-controller.component';
import TimerSetting from './timer-setting.component';


function _makeIncrementer(varName, increment) {
  return () => {
    const newVal = Math.round(this.state[varName] + increment);
    if (!this.state.running && newVal > 0 && newVal <= 60) {
      let newState = {};
      newState[varName] = newVal;
      newState.timerSeconds = (newState.sessionTime || this.state.sessionTime) * 60;
      this.setState(newState);
    }
  };
}

export default class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      timerSeconds: 25 * 60,
      breakTime: 5,
      sessionTime: 25,
      running: false,
      paused: true,
      onBreak: false
    };

    this.state = Object.assign({}, this.defaultState);

    _makeIncrementer = _makeIncrementer.bind(this);
    this.changeBreakTime = {
      increment: _makeIncrementer('breakTime', 1),
      decrement: _makeIncrementer('breakTime', -1)
    };
    this.changeSessionTime = {
      increment: _makeIncrementer('sessionTime', 1),
      decrement: _makeIncrementer('sessionTime', -1)
    };

    this.setDefaultState = this.setDefaultState.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.handleReset = this.handleReset.bind(this);

  }

  setDefaultState() {
    this.setState(Object.assign({}, this.defaultState));
  }

  handlePlayPause() {
    if (this.state.paused)
      this.start();
    else
      this.pause();
  }

  start() {
    this.setState( {running: true, paused: false} );
    const intervalID = setInterval( () => {
      //stop working if paused
      if (this.state.paused)
        clearInterval(intervalID);
      else {
        this.setState((prevState) => {
          let newState = {};

          // if timer reaches zero
          if (prevState.timerSeconds === 0) {
            this.beep.play();
            // toggle breaks
            newState['onBreak'] = !prevState.onBreak;
            // set timer to appropriate time
            newState['timerSeconds'] = (newState.onBreak ?
               prevState.breakTime : prevState.sessionTime) * 60;
          } else {
            newState['timerSeconds'] = prevState.timerSeconds - 1;
          }

          return newState;
        });
      }
    }, 1000);
  }

  pause() {
    this.setState({ paused: true });
  }

  handleReset() {
    this.beep.pause();
    this.beep.currentTime = 0;
    this.setDefaultState();
  }

  render() {
    return (
      <div id="pomodoro">
        <div id="settings">
          <TimerSetting
            name="session"
            length={this.state.sessionTime}
            handler={this.changeSessionTime} />
          <TimerSetting
            name="break"
            length={this.state.breakTime}
            handler={this.changeBreakTime} />
        </div>
        <Timer
          paused={this.state.paused}
          label={this.state.running ? (this.state.onBreak ? 'Take a break' : 'Practice!') : ''}
          timerSeconds={this.state.timerSeconds} />
        <TimerController
          onPlay={this.handlePlayPause}
          onReset={this.handleReset}/>
        <audio id="beep" preload="auto"
          src="https://goo.gl/65cBl1"
          ref={(audio) => { this.beep = audio; }}/>
      </div>
    );
  }
}
