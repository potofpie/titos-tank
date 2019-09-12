//Not My Components
import React, { Component } from 'react';
import { Card, Container } from '@material-ui/core';
import LineChart from 'react-linechart';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

//CSS
import './App.css';
import '../node_modules/react-linechart/dist/styles.css';

//Custom Components
import GaugeCard from "./Components/GaugeCard.js"

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
          val: 'null'
        },
        ph : {
          val: 'null'
        },
        temp : {
          val: 'null'
        }
      },
      tempColor: '#222',
      levelColor: '#222',
      phColor: '#222',
    };
    this.setLastestVals()
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

  componentDidMount() {
    this.interval = setInterval(this.setLastestVals , 1000)
      
  }


  render() {
    const data = [
      {									
          color: "black", 
          points: [{x: 0, y: 72}, {x: 10, y: 74},  {x:20, y: 78}, {x: 30, y: 80}, {x: 40, y: 81}, {x: 50, y: 75}, {x: 60, y: 74}, {x: 70, y: 76}, {x: 80, y: 81}, {x: 90, y: 79}, {x: 100, y: 71}] 
      }
  ];
    return (
      <div className="App">
      
        
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Tito's Tank </h2>
        </div>
        
        <Container className="App-page" maxWidth="md">
          <GaugeCard title="PH" icon={PH} color={this.state.phColor} val={this.state.data.ph.val} time={this.state.data.ph.time} min={0} max={14}/>
          <GaugeCard title="WaterLevel" icon={WaterLevel} color={this.state.levelColor} val={this.state.data.level.val} time={this.state.data.level.time} min={0} max={375}/>
          <GaugeCard title="Temperature" icon={Temperature} color={this.state.tempColor} val={this.state.data.temp.val} time={this.state.data.temp.time} min={60} max={80}/>
        </Container>
        <Container maxWidth="md">
          <Card className="App-graph-card">
            <AppBar position="static" color="default">
              <Tabs
                value={0}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Temperature" />
                <Tab label="Water Level" />
                <Tab label="PH" />
              </Tabs>
            </AppBar>
            <LineChart yMin={0} yMax={90}  xLabel="Time" yLabel="Temperature" width={500} height={300} data={data} />
          </Card>
        </Container>
  

      </div>
    );
  }
}

export default App;
