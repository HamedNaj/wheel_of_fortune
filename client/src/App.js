import React from 'react'
import './App.css';
import arrow from './marker.png'
import {AddCircle, RemoveCircle} from '@material-ui/icons';
import NeonButton from './neon-button'

class App extends React.Component {
  state = {
    deg: 0,
    decider: '',
    count: 4,
    colors: ['green', 'yellow', 'blue', 'orange', 'brown', 'purple', 'red', 'violet', 'indigo', 'silver', 'chocolate', 'lime'],
    inputs: []
  }

  startRotation = () => {
    let deg = this.state.deg
    let wheel = document.querySelector('.circle')
    wheel.style.transition = 'all 3s ease-out'
    deg += Math.ceil(Math.random() * 2000 + 720)
    wheel.style.transform = `rotate(-${deg}deg)`
    this.setState({deg})
    this.setState({decider: ''})
  }
  endTransition = () => {
    let wheel = document.querySelector('.circle')
    wheel.style.transition = 'none'
    const deg = this.state.deg
    const currentDeg = deg % 360
    const inputs = this.state.inputs
    const count = this.state.count
    this.setState({decider: inputs[parseInt(currentDeg / (360 / count))]})
  }
  addZonesToWheel = () => {
    const count = this.state.count
    let children = []
    const zones = 360 / count
    const wheelSizes = {rotateLi: zones, rotateDiv: zones / 2, skewYLi: zones - 90, skewYDiv: 90 - zones}
    for (let i = 0; i < count; i++) {
      children.push(<li key={`li${i}`}
                        style={{transform: `rotate(${wheelSizes.rotateLi * i}deg) skewY(${wheelSizes.skewYLi}deg)`}}>
        <div className='text'
             style={{
               backgroundColor: this.state.colors[i % 12],
               transform: `skewY(${wheelSizes.skewYDiv}deg) rotate(${wheelSizes.rotateDiv}deg)`
             }}
             spellCheck='false'> {this.state.inputs[i]}
        </div>
      </li>)
    }
    return children
  }

  componentDidMount() {
    this.setState({inputs: ['Number 1', 'Number 2', 'Number 3', 'Number 4']})
  }

  removeInput = (e) => {
    let inputs = this.state.inputs
    if (inputs.length <= 4) return
    inputs.splice(e, 1)
    this.setState({inputs})
    this.setState({count: inputs.length})
  }
  addInput = () => {
    let inputs = this.state.inputs
    inputs.push(`Number ${inputs.length + 1}`)
    this.setState({inputs})
    this.setState({count: inputs.length})
  }
  handleChangeInput = (e) => {
    const inputs = this.state.inputs
    inputs[parseInt(e.target.id)] = e.target.value
    this.setState({inputs})
  }

  render() {
    return (
      <div className='body'>
        <div className='wheel'>
          <img className='arrow' src={arrow} alt=""/>
          <ul className='circle' onTransitionEnd={this.endTransition}>
            {this.addZonesToWheel()}
          </ul>
          <NeonButton onClick={this.startRotation} text='SPIN'/>
          {this.state.decider?.length && <NeonButton text={this.state.decider} cursor='default'/>}
        </div>
        <div className='inputs'>
          {this.state.inputs.map((inp, index) => {
            return <div className='input-row' key={`inputs${index}`}>
              <input placeholder={inp} id={index} onChange={this.handleChangeInput}/>
              <RemoveCircle id={index} style={{color: '#ff7620', width: '25px', height: '25px', cursor: 'pointer'}}
                            onClick={this.removeInput.bind(this, index)}/>
            </div>
          })}
          <AddCircle style={{color: 'lime', width: '50px', height: '50px', cursor: 'pointer'}} onClick={this.addInput}/>
        </div>
      </div>
    )
  }
  ;
}

export default App;
