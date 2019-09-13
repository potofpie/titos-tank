//Not My Components
import React, { Component } from 'react';
import { Container } from '@material-ui/core';

//CSS
import './App.css';
import '../node_modules/react-linechart/dist/styles.css';

//Custom Components
import GaugeCard from "./Components/GaugeCard.js"
import GraphCard from "./Components/GraphCard.js"

//Resources
import logo from './Resources/clown-fish.svg';
import PH from './Resources/ph-meter.svg';
import WaterLevel from './Resources/water-level.svg';
import Temperature from './Resources/thermometer.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        level : {
          val: 'null',
          time: 'null'
        },
        ph : {
          val: 'null',
          time: 'null'
        },
        temp : {
          val: 'null',
          time: 'null'
        }
      },
      tempColor: '#222',
      levelColor: '#222',
      phColor: '#222',
      apiUP: false,
      graph: [{									
        color: "black", 
        points: [{x: 0, y: 72}, {x: 4, y: 72}, {x: 100, y: 72}] 
      }]
    };
  }

  apiIsUP = () => {
    fetch('http://127.0.0.1:5000/')
    .then(response => {
      console.log(response.status)
      if(response.status ===200){
        this.setState({apiUP: true})
      }
      else{
        this.setState({apiUP: false})
      }
    })
  }

  setLastestVals = () => {
    fetch('http://127.0.0.1:5000/latest')
    .then(response => response.json())
    .then(data => this.setState({data: data}));

  }


  setHistoricalVals = () => {
    fetch('http://127.0.0.1:5000/all')
    .then(response => response.json())
    .then(data => console.log("setHistoricalVals") )
  
  }

  setHistoricalValsTest = () => {
    var readings = []
    fetch('http://127.0.0.1:5000/all')
    .then(response => response.json())
    .then(data => data.map((read, index) => {
      console.log(read.temp.val)
      console.log("index" + index)
      readings.push({x: index, y: read.temp.val})
    } ))

    this.setState(
      {graph: [{									
        color: "black", 
        //points: [{x: 0, y: 72},{x: this.state.graph[0].points[1].x+10, y: 72},{x: 100, y: 72}]
        points: readings
      }]}
    )
  }

  apiErrorMessage = () => {
    if(this.state.apiUP === false){
      return    ( 
                      <div className="App-message-text" >
                          Could not reach API
                      </div>
                )
    }
  }

  componentDidMount() {
    this.apiIsUP()
    this.interval = setInterval(this.setLastestVals , 5000)
    this.interval1 = setInterval(this.setHistoricalValsTest , 5000)
    
  }


  render() {
//    const data = [
//      {									
//          color: "black", 
//          points: [{x: 0, y: 72}, {x: 10, y: 74},  {x:20, y: 78}, {x: 30, y: 80}, {x: 40, y: 81}, {x: 50, y: 75}, {x: 60, y: 74}, {x: 70, y: 76}, {x: 80, y: 81}, {x: 90, y: 79}, {x: 100, y: 71}] 
//      }
//  ];
    return (
      <div className="App">
      
        
        <div className="App-header">
          {this.apiErrorMessage()}
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Tito's Tank </h2>
        </div>
        <Container className="App-page" maxWidth="md">
          <GaugeCard title="PH" icon={PH} color={this.state.phColor} val={this.state.data.ph.val} time={this.state.data.ph.time} min={0} max={14}/>
          <GaugeCard title="WaterLevel" icon={WaterLevel} color={this.state.levelColor} val={this.state.data.level.val} time={this.state.data.level.time} min={0} max={375}/>
          <GaugeCard title="Temperature" icon={Temperature} color={this.state.tempColor} val={this.state.data.temp.val} time={this.state.data.temp.time} min={60} max={80}/>
        </Container>
        <Container maxWidth="md">
          <GraphCard graph={this.state.graph}/>
        </Container>
  

      </div>
    );
  }
}

export default App;
