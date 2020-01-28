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
    console.log('STATE', this.state)
    return (
      <Wrapper>
        <div>
          <Title>Choose Your Fighter</Title>
          <Pics>
            {slotherapists.map(sloth => {
              return (
                <a onClick={() => this.setState({chosenSloth: sloth.id})}>
                  <Crop>
                    <Pic key={sloth.id} src={sloth.imageUrl} />
                  </Crop>
                </a>
              )
            })}
          </Pics>
        </div>
        <div>
          <Title>Notification Timer</Title>
          <Subtitle>Every:</Subtitle>
          <Range>
            <Button onClick={() => this.setState({chosenFreq: 1})}>
              1 MIN
            </Button>
            <Button onClick={() => this.setState({chosenFreq: 10})}>
              10 MIN
            </Button>
            <Button onClick={() => this.setState({chosenFreq: 30})}>
              30 MIN
            </Button>
            <Button onClick={() => this.setState({chosenFreq: 60})}>
              1 HR
            </Button>
            <Button onClick={() => this.setState({chosenFreq: 120})}>
              2 HRS
            </Button>
            <Button onClick={() => this.setState({chosenFreq: 180})}>
              3 HRS
            </Button>
          </Range>
        </div>
        <Container>
          <Continue onClick={() => this.handleSubmit()}>Continue</Continue>
        </Container>
      </Wrapper>
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

const Wrapper = styled.div``

const Crop = styled.div`
  width: 200px;
  height: 200px;
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

const Pics = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-inline-start: 0px;
`

const Title = styled.ul`
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  color: #636363;
  margin-block-start: 50px;
  font-weight: 100;
  font-size: 30px;
  text-align: center;
  padding-inline-start: 0px;
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

const Range = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const Button = styled.button`
  border-radius: 50%;
  height: 100px;
  width: 100px;
  font-size: 14px;
  margin-block-end: 2em;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 100;
  font-size: 17px;
  color: #636363;
  border-color: #636363;
  background-color: #f2f2f2;
`

const Continue = styled.button`
  font-size: 15px;
  background-color: #f2f2f2;
  border: none;
  color: #636363;
  padding: 15px 32px;
  text-transform: uppercase;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 100;
  margin-block-end: 2em;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
