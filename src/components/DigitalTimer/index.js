import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isStart: false, minutes: 25, seconds: 0}

  startbtn = () => {
    const {isStart} = this.state
    console.log('clicked')
    this.setState(prevState => ({isStart: !prevState.isStart}))
    console.log(isStart)
    this.timerwork()
  }

  timerwork = () => {
    const {isStart} = this.state
    console.log('fun called')
    if (isStart === true) {
      console.log('started')
      this.clearId = setInterval(this.tick, 1000)
      console.log(this.clearId)
    } else {
      console.log('stopped')
      this.stoptimer()
    }
  }

  resetbtn = () => {
    clearInterval(this.clearId)
    this.setState({isStart: false})
    this.setState({seconds: 0})
    this.setState({minutes: 25})
  }

  timerfinished = () => {
    clearInterval(this.clearId)
    this.setState({seconds: 0})
    this.setState({minutes: 0})
  }

  tick = () => {
    const {minutes, seconds} = this.state

    if (seconds === 0) {
      if (minutes === 0 && seconds === 0) {
        this.timerfinished()
        this.setState({minutes: 0})
        this.setState({seconds: 1})
      } else {
        this.setState(prevState => ({minutes: prevState.minutes - 1}))
        this.setState({seconds: 60})
      }
    }

    this.setState(prevState => ({
      seconds: prevState.seconds - 1,
    }))
  }

  stoptimer = () => {
    clearInterval(this.clearId)
    this.setState(prevState => ({seconds: prevState.seconds}))
    this.setState(prevState => ({minutes: prevState.minutes}))
  }

  timerdesc = () => {
    const {minutes} = this.state
    if (minutes <= 25) {
      this.setState({minutes: 25})
    } else {
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    }
  }

  timerIncre = () => {
    const {isStart} = this.state
    this.setState(prevState => ({minutes: prevState.minutes + 1}))
  }

  render() {
    const {isStart, minutes, seconds} = this.state
    const txtchange = isStart ? 'Pause' : 'Start'
    const descriptionchange = isStart ? 'Running' : 'Paused'
    const altchange = isStart ? 'pause icon' : 'play icon'
    const statusStartbtn = isStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    // console.log(isStart)
    const doubledigit = seconds < 10 ? `0${seconds}` : seconds
    const doubleminute = minutes < 10 ? `0${minutes}` : minutes

    // console.log(doubledigit)

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-display">
            <div className="timer">
              <h1 className="counter">
                {doubleminute}:{doubledigit}
              </h1>
              <p className="counter-text">{descriptionchange}</p>
            </div>
          </div>
          <div className="timer-buttons">
            <div className="start-reset-timer-button">
              <div className="start-timer">
                <button
                  className="play-button"
                  onClick={this.startbtn}
                  type="button"
                >
                  <p className="text-start-reset">{txtchange}</p>
                  <img src={statusStartbtn} alt={altchange} className="logo" />
                </button>
              </div>
              <div className="start-timer">
                <button
                  className="play-button"
                  type="button"
                  onClick={this.resetbtn}
                >
                  <p className="text-start-reset">Reset</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="logo"
                  />
                </button>
              </div>
            </div>
            <p className="set-desc">Set Timer limit</p>
            <div className="set-timer-container">
              <button
                className="minus-btn"
                type="button"
                onClick={this.timerdesc}
              >
                -
              </button>
              <p className="adjust-timer"> {minutes} </p>
              <button
                className="plus-btn"
                type="button"
                onClick={this.timerIncre}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
