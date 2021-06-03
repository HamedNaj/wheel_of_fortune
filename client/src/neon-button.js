import React, {Component} from "react"
import './neon-button.css'

class NeonButton extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <a href="#" className="neon-button" onClick={this.props.onClick} style={{cursor:this.props.cursor}}> {this.props.text}</a>
    )
  }
}

export default (NeonButton)
