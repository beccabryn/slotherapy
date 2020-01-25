import React from 'react'
import {connect} from 'react-redux'
import {fetchSlotherapists} from '../store/slotherapist'
import {update} from '../store/user'
import styled from 'styled-components'

class DailySetup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slotherapists: [],
      chosenSloth: null,
      chosenFreq: null
    }
  }

  componentDidMount() {
    this.props.getAllSlotherapists()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slotherapists !== this.props.slotherapists) {
      this.setState({
        slotherapists: this.props.slotherapists
      })
    }
  }

  handleSubmit() {
    this.props.update(
      this.props.user.id,
      this.state.chosenSloth,
      this.state.chosenFreq
    )
  }

  render() {
    const slotherapists = this.props.slotherapists
    console.log('PROPS', this.props)
    return (
      <div>
        <div>
          <h1>Choose Your Fighter</h1>
          <ul>
            {slotherapists.map(sloth => {
              return (
                <li onClick={() => this.setState({chosenSloth: sloth.id})}>
                  <img key={sloth.id} src={sloth.imageUrl} />
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <h1>Notification Timer</h1>
          <h4>Every:</h4>
          <ul>
            <button onClick={() => this.setState({chosenFreq: 1})}>
              1 MIN
            </button>
            <button onClick={() => this.setState({chosenFreq: 10})}>
              10 MIN
            </button>
            <button onClick={() => this.setState({chosenFreq: 30})}>
              30 MIN
            </button>
            <button onClick={() => this.setState({chosenFreq: 60})}>
              1 HR
            </button>
            <button onClick={() => this.setState({chosenFreq: 120})}>
              2 HRS
            </button>
            <button onClick={() => this.setState({chosenFreq: 180})}>
              3 HRS
            </button>
          </ul>
        </div>
        <div>
          <button onClick={() => this.handleSubmit()}>Continue</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    slotherapists: state.slotherapist.slotherapists,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  getAllSlotherapists: () => dispatch(fetchSlotherapists()),
  update: (userId, slotherapistId, frequency) =>
    dispatch(update(userId, slotherapistId, frequency))
})

export default connect(mapStateToProps, mapDispatchToProps)(DailySetup)
