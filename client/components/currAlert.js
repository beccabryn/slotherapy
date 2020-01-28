import React from 'react'
import {connect} from 'react-redux'
import {getCurr, update} from '../store/alert'
import styled from 'styled-components'

/**
 * COMPONENT
 */
class CurrAlert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currAlert: {},
      liked: false,
      completed: false
    }
  }

  componentDidMount() {
    let string = this.props.location.search
    let id
    for (let i = 0; i < string.length; i++) {
      if (string[i] == '=') {
        id = string.substring(i + 1, string.length)
      }
    }
    this.props.getCurrent(id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currAlert !== this.props.currAlert) {
      this.setState({
        currAlert: this.props.currAlert
      })
    }
  }

  handleSubmit() {
    this.props.update(
      this.props.currAlert.id,
      this.state.liked,
      this.state.completed
    )
  }

  render() {
    const curr = this.state.currAlert.message
    if (!curr) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
    const caution = this.state.currAlert.message.warnings

    return (
      <Wrapper>
        <Header>{curr.title}</Header>
        <List>
          {curr.steps.map(step => {
            return (
              <div>
                <Text>{step}</Text>
                <br />
              </div>
            )
          })}
        </List>
        <Subtitle>Caution:</Subtitle>
        {caution ? (
          caution.map(item => {
            return (
              <div>
                <Text>{item}</Text>
                <br />
              </div>
            )
          })
        ) : (
          <Text>'None'</Text>
        )}
        <hr />
        <Clicks>
          <Button onClick={() => this.setState({liked: true})}>Like</Button>
          <Button onClick={() => this.setState({completed: true})}>
            Complete
          </Button>
          <Button onClick={() => this.handleSubmit()}>Close</Button>
        </Clicks>
      </Wrapper>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  // console.log('STATE', state)
  return {
    currAlert: state.alert.currAlert
  }
}

const mapDispatch = dispatch => ({
  getCurrent: id => dispatch(getCurr(id)),
  update: (id, liked, completed) => dispatch(update(id, liked, completed))
})

export default connect(mapState, mapDispatch)(CurrAlert)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Subtitle = styled.h4`
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  color: #636363;
  font-weight: 100;
  font-size: 20px;
  text-align: center;
  padding-inline-start: 0px;
`

const Text = styled.div`
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  color: #636363;
  font-weight: 100;
  font-size: 10px;
  text-align: center;
  padding-inline-start: 0px;
  margin-block-end: 0.2em;
  margin-block-start: 0.2em;
`

const List = styled.ul`
  padding-inline-start: 0px;
`

const Button = styled.button`
  font-size: 15px;
  background-color: #e6e3e3;
  border-color: #636363;
  border: none;
  color: #636363;
  padding: 15px 32px;
  text-transform: uppercase;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 100;
  margin-block-end: 2em;
`

const Clicks = styled.div`
  display: flex;
  flex-direction: row;
`
