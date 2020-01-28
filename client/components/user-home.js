import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {postMetric} from '../store/metric'
import {createNew} from '../store/alert'
import styled from 'styled-components'
import {fetchCurrSloth} from '../store/slotherapist'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mood: null,
      productivity: null,
      stress: null,
      slotherapist: {}
    }
    if (props.user) {
      setInterval(() => props.createAlert(), props.user.frequency * 1000 * 60)
    }
  }

  componentDidMount() {
    this.props.currSloth(this.props.userId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slotherapist !== this.props.slotherapist) {
      this.setState({
        slotherapist: this.props.slotherapist
      })
    }
  }

  handleSubmit() {
    this.props.addMetric(
      this.props.userId,
      this.state.mood,
      this.state.productivity,
      this.state.stress
    )
  }

  render() {
    const sloth = this.props.slotherapist
    const user = this.props.user
    let freq = ''

    if (user.frequency === 1) {
      freq = '1 MIN'
    } else if (user.frequency === 10) {
      freq = '10 MIN'
    } else if (user.frequency === 30) {
      freq = '30 MIN'
    } else if (user.frequency === 60) {
      freq = '1 HR'
    } else if (user.frequency === 120) {
      freq = '2 HRS'
    } else if (user.frequency === 180) {
      freq = '3 HRS'
    }
    return (
      <Wrapper>
        <Summary>
          <Header>Your Slotherapist</Header>
          <Metric>{sloth.name}</Metric>
          <Crop>
            <Pic src={sloth.imageUrl} />
          </Crop>
          <Header>Time Preferences</Header>
          <Metric>Every: {freq}</Metric>
          <Submit>
            <Link to="/setup">Edit</Link>
          </Submit>
        </Summary>
        <Tracker>
          <Header>Daily Tracker</Header>
          <Metric>Mood</Metric>
          <Range>
            <Button onClick={() => this.setState({mood: 1})}>1</Button>
            <Button onClick={() => this.setState({mood: 2})}>2</Button>
            <Button onClick={() => this.setState({mood: 3})}>3</Button>
            <Button onClick={() => this.setState({mood: 4})}>4</Button>
            <Button onClick={() => this.setState({mood: 5})}>5</Button>
          </Range>
          <Metric>Productivity</Metric>
          <Range>
            <Button onClick={() => this.setState({productivity: 1})}>1</Button>
            <Button onClick={() => this.setState({productivity: 2})}>2</Button>
            <Button onClick={() => this.setState({productivity: 3})}>3</Button>
            <Button onClick={() => this.setState({productivity: 4})}>4</Button>
            <Button onClick={() => this.setState({productivity: 5})}>5</Button>
          </Range>
          <Metric>Stress</Metric>
          <Range>
            <Button onClick={() => this.setState({stress: 1})}>1</Button>
            <Button onClick={() => this.setState({stress: 2})}>2</Button>
            <Button onClick={() => this.setState({stress: 3})}>3</Button>
            <Button onClick={() => this.setState({stress: 4})}>4</Button>
            <Button onClick={() => this.setState({stress: 5})}>5</Button>
          </Range>
          <div>
            <Submit onClick={() => this.handleSubmit()}>Submit</Submit>
          </div>
        </Tracker>
      </Wrapper>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('STATE', state)
  return {
    firstName: state.user.firstName,
    userId: state.user.id,
    user: state.user,
    slotherapist: state.slotherapist.slotherapist
    // mood: state.metric.mood,
    // productivity: state.metric.productivity,
    // stress: state.metric.stress
  }
}

const mapDispatch = dispatch => ({
  addMetric: (userId, mood, productivity, stress) =>
    dispatch(postMetric(userId, mood, productivity, stress)),
  createAlert: () => dispatch(createNew()),
  currSloth: id => dispatch(fetchCurrSloth(id))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row;
  align-items: flex-start;
  align-content: stretch;
`

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  margin-inline-end: 100px;
`

const Tracker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-inline-start: 100px;
`

const Crop = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
`

const Pic = styled.img`
  display: inline;
  margin: 0 auto;
  margin-left: -25%; //centers the image
  height: 100%;
  width: auto;
  opacity: 0.7;
`

const Header = styled.h3`
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  color: #636363;
  margin-block-start: 20px;
  margin-block-end: 0em;
  font-weight: 200;
  font-size: 30px;
  text-align: center;
`
const Metric = styled.h5`
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  color: #636363;
  font-weight: 100;
  font-size: 20px;
  text-align: center;
  margin-block-start: 0.9em;
  margin-block-end: 0.9em;
`
const Range = styled.ul`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-around;
  margin-block-start: 0em;
  margin-inline-start: 0em;
  margin-block-end: 0em;
  padding-inline-start: 0px;
`

const Button = styled.button`
  border-radius: 50%;
  font-size: 14px;
  margin-block-end: 2em;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 100;
  font-size: 20px;
  height: 50px;
  width: 50px;
  color: #636363;
  border-color: #636363;
  background-color: #e6e3e3;
`

const Submit = styled.button`
  font-size: 15px;
  background-color: #e6e3e3;
  border: none;
  color: #636363;
  padding: 15px 32px;
  text-transform: uppercase;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 100;
  margin-block-end: 2em;
  border-color: #636363;
`
