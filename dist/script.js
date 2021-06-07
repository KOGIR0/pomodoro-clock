class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      pause: true,
      timeLeft: 25 * 60,
      value: "25:00",
      timerLabel: "Session",
      startTime: Date.now() };


    setInterval(() => {
      if (!this.state.pause)
      {
        this.reduceTimer();
      }
      this.setState({ startTime: Date.now() });
      //console.log(this.state.startTime + "  " + this.state.timeLeft);
    }, 1000);

    this.reset = this.reset.bind(this);
    this.startStop = this.startStop.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.reduceTimer = this.reduceTimer.bind(this);
  }

  reduceTimer() {
    let deltaTime = Date.now() - this.state.startTime;
    //console.log("deltaTime: " + deltaTime);
    let timeLeft = this.state.timeLeft - deltaTime / 1000;
    let tl = this.state.timerLabel;
    let mm = Math.floor(timeLeft / 60);
    let ss = Math.floor(timeLeft % 60);
    let value = (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    if (ss === 0 && mm === 0)
    {
      document.getElementById('beep').play();
    }
    if (ss < 0 && mm < 0)
    {
      tl = tl === 'Session' ? 'Break' : 'Session';
      if (tl === 'Session')
      {
        timeLeft = this.state.sessionLength * 60;
      } else {
        timeLeft = this.state.breakLength * 60;
      }
      mm = Math.floor(timeLeft / 60);
      ss = Math.floor(timeLeft % 60);
      value = (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    }

    let newState = {
      timeLeft: timeLeft,
      timerLabel: tl,
      value: value };

    this.setState(newState);
  }

  reset() {
    let newState = {
      pause: true,
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      value: "25:00",
      timerLabel: "Session" };


    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;

    this.setState(newState);
  }

  startStop() {
    this.setState({ pause: !this.state.pause });
  }

  breakDecrement()
  {
    if (this.state.breakLength !== 1)
    this.setState({ breakLength: this.state.breakLength - 1 });
  }

  breakIncrement()
  {
    if (this.state.breakLength !== 60)
    this.setState({ breakLength: this.state.breakLength + 1 });
  }

  sessionDecrement()
  {
    if (this.state.sessionLength !== 1)
    {
      if (this.state.pause)
      {
        this.setState({ sessionLength: this.state.sessionLength - 1,
          timeLeft: (this.state.sessionLength - 1) * 60,
          value: this.state.sessionLength - 1 + ':00' });
      } else {
        this.setState({ sessionLength: this.state.sessionLength - 1 });
      }
    }
  }

  sessionIncrement()
  {
    if (this.state.sessionLength !== 60)
    {
      if (this.state.pause)
      {
        this.setState({ sessionLength: this.state.sessionLength + 1,
          timeLeft: (this.state.sessionLength + 1) * 60,
          value: this.state.sessionLength + 1 + ":00" });
      } else {
        this.setState({ sessionLength: this.state.sessionLength + 1 });
      }
    }
  }

  render()
  {
    return /*#__PURE__*/(
      React.createElement("div", { className: "App" }, /*#__PURE__*/
      React.createElement("div", { class: "clock-settings" }, /*#__PURE__*/
      React.createElement("div", { class: "settings-block" }, /*#__PURE__*/
      React.createElement("div", { id: "break-label" }, "Break Length"), /*#__PURE__*/
      React.createElement("div", { id: "break-length" }, this.state.breakLength), /*#__PURE__*/
      React.createElement("div", { class: "inc-btns" }, /*#__PURE__*/
      React.createElement("button", { id: "break-decrement", onClick: this.breakDecrement }, "-"), /*#__PURE__*/
      React.createElement("button", { id: "break-increment", onClick: this.breakIncrement }, "+"))), /*#__PURE__*/


      React.createElement("div", { class: "settings-block" }, /*#__PURE__*/
      React.createElement("div", { id: "session-label" }, "Session Length"), /*#__PURE__*/
      React.createElement("div", { id: "session-length" }, this.state.sessionLength), /*#__PURE__*/
      React.createElement("div", { class: "inc-btns" }, /*#__PURE__*/
      React.createElement("button", { id: "session-decrement", onClick: this.sessionDecrement }, "-"), /*#__PURE__*/
      React.createElement("button", { id: "session-increment", onClick: this.sessionIncrement }, "+")))), /*#__PURE__*/



      React.createElement("div", { id: "timer-label" }, this.state.timerLabel), /*#__PURE__*/
      React.createElement("div", { id: "time-left" }, this.state.value), /*#__PURE__*/
      React.createElement("div", { id: "start_stop", onClick: this.startStop }, "|| |>"), /*#__PURE__*/
      React.createElement("div", { id: "reset", onClick: this.reset }, "reset"), /*#__PURE__*/
      React.createElement("audio", { id: "beep", src: "https://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock/rain.mp3" })));


  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(App, null), document.getElementById('root'));