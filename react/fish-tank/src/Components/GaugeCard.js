import React, { Component } from 'react';
import Gauge from 'react-svg-gauge';
import { Card} from '@material-ui/core';
import '../App.css';

class GaugeCard extends Component {
  render() {
    return (
          <Card className="App-guage-card">
            <img alt={this.props.title} src={this.props.icon} className="App-icon"/>
            <Gauge value={this.props.val} min={this.props.min} max={this.props.max} width={150} height={150} label="" color={this.props.color}/>
            <div className="App-card-time"><b>Last Read Time: </b>{this.props.time}</div>
          </Card>
    );
  }
}

export default GaugeCard;
