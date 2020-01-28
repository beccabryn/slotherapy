import React from 'react'
import {connect} from 'react-redux'
import {allAlerts} from '../store/alert'
import styled from 'styled-components'

class CompletedPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alerts: []
    }
  }

  componentDidMount() {
    this.props.getAll(this.props.user.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.alerts !== this.props.alerts) {
      this.setState({
        alerts: this.props.alerts
      })
    }
  }

  render() {
    const alerts = this.props.alerts
    if (!alerts) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }
    const completed = alerts.filter(item => item.completed)
    if (completed.length === 0) {
      return (
        <Wrapper>
          <Header>Completed Exercises</Header>
          <Subtitle>You have none</Subtitle>
        </Wrapper>
      )
    }
    return (
      <Wrapper>
        <Header>Completed Exercises</Header>
        <List>
          {completed.map(alert => {
            console.log(alert)
            return (
              <div key={alert.id}>
                <Subtitle>{alert.message.title}</Subtitle>
                <Text>
                  {alert.message.steps.map(step => (
                    <div>
                      <a key={step.id}>{step}</a>
                      <br />
                    </div>
                  ))}
                </Text>
              </div>
            )
          })}
        </List>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    alerts: state.alert.alerts
  }
}

const mapDispatchToProps = dispatch => ({
  getAll: id => dispatch(allAlerts(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CompletedPage)

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
