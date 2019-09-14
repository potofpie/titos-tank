//Not My Components
import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import LineChart from 'react-linechart';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';


//CSS
import '../App.css';
import '../../node_modules/react-linechart/dist/styles.css';




class GraphCard extends Component {
  constructor(props) {
  super(props);
  this.state = {
    curTab: 'temp',
    graphTemp: [{									
      color: "black", 
      points: [{x: 0, y: 72}, {x: 4, y: 72}, {x: 100, y: 72}] 
    }],
    graphLevel: [{									
      color: "black", 
      points: [{x: 0, y: 72}, {x: 4, y: 72}, {x: 100, y: 72}] 
    }],
    graphPH: [{									
      color: "black", 
      points: [{x: 0, y: 72}, {x: 4, y: 72}, {x: 100, y: 72}] 
    }],
    }
  }

  handleChange = (event, index) => {
    this.setState({curTab: index});
  }

  setHistoricalVals = () => {
    fetch('http://127.0.0.1:5000/all')
    .then(response => response.json())
    .then(data => console.log("setHistoricalVals") )
  
  }

  setHistoricalValsTemp = () => {
    var readings = []
    fetch('http://127.0.0.1:5000/all')
    .then(response => response.json())
    .then(data => data.map((read, index) => {
      // console.log("temp " + read.temp.val)
      // console.log("index" + index)
      readings.push({x: index, y: read.temp.val})
    } ))
    this.setState(
      {graphTemp: [{									
        color: "black", 
        //points: [{x: 0, y: 72},{x: this.state.graph[0].points[1].x+10, y: 72},{x: 100, y: 72}]
        points: readings
      }]}
    )
  }

  setHistoricalValsLevel = () => {
    var readings = []
    fetch('http://127.0.0.1:5000/all')
    .then(response => response.json())
    .then(data => data.map((read, index) => {
      // console.log("level " + read.level.val)
      // console.log("index" + index)
      readings.push({x: index, y: read.level.val})
    } ))
    this.setState(
      {graphLevel: [{									
        color: "black", 
        //points: [{x: 0, y: 72},{x: this.state.graph[0].points[1].x+10, y: 72},{x: 100, y: 72}]
        points: readings
      }]}
    )
  }

  setHistoricalValsPH = () => {
    var readings = []
    fetch('http://127.0.0.1:5000/all')
    .then(response => response.json())
    .then(data => data.map((read, index) => {
      // console.log("ph " + read.ph.val)
      // console.log("index" + index)
      readings.push({x: index, y: read.ph.val})
    } ))
    this.setState(
      {graphPH: [{									
        color: "black", 
        //points: [{x: 0, y: 72},{x: this.state.graph[0].points[1].x+10, y: 72},{x: 100, y: 72}]
        points: readings
      }]}
    )
  }

  componentDidMount() {
    switch(this.state.curTab) {
      case 'temp':
          this.interval1 = setInterval(this.setHistoricalValsTemp , 5000);
      case 'ph':
          this.interval1 = setInterval(this.setHistoricalValsPH , 5000);
      case 'level':
          this.interval1 = setInterval(this.setHistoricalValsLevel , 5000);
      default:
        return "Graph didn't render!"
    }
    
  }

  getCurrentGraph = () =>{
    switch(this.state.curTab) {
      case 'temp':
        return <LineChart yMin={0} yMax={100}  xLabel="Time" yLabel="Temperature" width={500} height={300} data={this.state.graphTemp} /> ;
      case 'ph':
        return <LineChart yMin={0} yMax={14}  xLabel="Time" yLabel="PH" width={500} height={300} data={this.state.graphPH} /> ;
      case 'level':
        return <LineChart yMin={0} yMax={375}  xLabel="Time" yLabel="Water Level" width={500} height={300} data={this.state.graphLevel} /> ;
      default:
        return "Graph didn't render!"
    }
  }

    render() {
      return (
        <Card className="App-graph-card">
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.curTab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          > 
            <Tab value={'temp'} label="Temperature" />
            <Tab value={'level'} label="Water Level" />
            <Tab value={'ph'} label="PH" />
          </Tabs>
        </AppBar>
        {this.getCurrentGraph()}
        {/*<LineChart yMin={0} yMax={100}  xLabel="Time" yLabel="Temperature" width={500} height={300} data={this.props.graph} /> */}
      </Card>
      );
    }
  }
  
  export default GraphCard;